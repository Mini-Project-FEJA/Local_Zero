package feja.localzero.service;

import feja.localzero.decorator.AchievementDecorator;
import feja.localzero.decorator.BasicEcoAction;
import feja.localzero.decorator.EcoAction;
import feja.localzero.dto.EcoActionRequest;
import feja.localzero.dto.EcoActionResponse;
import feja.localzero.dto.EcoDashboardResponse;
import feja.localzero.dto.EcoTrackerProgressResponse;
import feja.localzero.entity.EcoActionLog;
import feja.localzero.entity.EcoActionType;
import feja.localzero.entity.User;
import feja.localzero.repo.EcoActionRepository;
import feja.localzero.repo.UserRepository;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class EcoActionService {

    private final EcoActionRepository ecoActionRepository;
    private final UserRepository userRepository;

    public EcoActionService(EcoActionRepository ecoActionRepository, UserRepository userRepository) {
        this.ecoActionRepository = ecoActionRepository;
        this.userRepository = userRepository;
    }

    public EcoActionResponse logAction(EcoActionRequest request) {

        User user = userRepository.findById(request.getUserId()).orElseThrow();
        EcoAction action;

        switch (request.getActionType()) {

            case BIKED_TO_WORK:

                action = new BasicEcoAction("Biked to work", 5);

                action = applyWeeklyAchievement(
                        action,
                        user,
                        EcoActionType.BIKED_TO_WORK,
                        7,
                        "🏆 Weekly Bike Challenge Completed"
                );
                break;

            case RECYCLING:

                action = new BasicEcoAction("Recycled waste", 2);

                action = applyWeeklyAchievement(
                        action,
                        user,
                        EcoActionType.RECYCLING,
                        5,
                        "♻️ Weekly Recycling Champion"
                );
                break;

            case USED_REUSABLE_BOTTLE:

                action = new BasicEcoAction("Used reusable bottle", 1);

                action = applyWeeklyAchievement(
                        action,
                        user,
                        EcoActionType.USED_REUSABLE_BOTTLE,
                        10,
                        "🍼 Reusable Bottle Hero"
                );
                break;

            default:
                throw new IllegalArgumentException("Invalid eco action");
        }

        // SAVE RESULT

        EcoActionLog log = new EcoActionLog();

        log.setActionType(request.getActionType());
        log.setDescription(action.getDescription());
        log.setCarbonSaved(action.getCarbonSaving());
        log.setCreatedAt(LocalDateTime.now());
        log.setUser(user);

        ecoActionRepository.save(log);

        List<LocalDate> dates = ecoActionRepository.findActionDates(user.getId());

        int streak = calculateStreak(dates);

        switch (streak) {

            case 1 -> action = new AchievementDecorator(action, "🔥 1 Day Eco Beginner");

            case 3 -> action = new AchievementDecorator(action, "🔥 3 Day Eco Streak");

            case 7 -> action = new AchievementDecorator(action, "🌱 7 Day Green Warrior");
        }

        return new EcoActionResponse(
                action.getDescription(),
                action.getCarbonSaving(),
                action.getAchievements()
        );

    }

    private EcoAction applyWeeklyAchievement(
            EcoAction action,
            User user,
            EcoActionType type,
            int goal,
            String achievementText
    )
    {
        LocalDateTime startOfWeek = LocalDate.now().with(DayOfWeek.MONDAY).atStartOfDay();

        long progress = ecoActionRepository.countWeeklyActions(user.getId(), type, startOfWeek);

        if (progress + 1 >= goal) {
            action = new AchievementDecorator(action, achievementText);
        }

        return action;
    }

    private int calculateStreak(List<LocalDate> dates) {

        int streak = 0;
        LocalDate today = LocalDate.now();

        for (LocalDate date : dates) {

            if (date.equals(today.minusDays(streak))) {
                streak++;
            } else {
                break;
            }
        }

        return streak;
    }

    public EcoDashboardResponse getDashboard(Long userId) {

        double totalCarbon = ecoActionRepository.getTotalCarbonSaved(userId);

        EcoTrackerProgressResponse bikeProgress = getProgress(userId, EcoActionType.BIKED_TO_WORK, 7);
        EcoTrackerProgressResponse recyclingProgress = getProgress(userId, EcoActionType.RECYCLING, 5);
        EcoTrackerProgressResponse bottleProgress = getProgress(userId, EcoActionType.USED_REUSABLE_BOTTLE, 10);

        List<String> achievements = new ArrayList<>();

        if (bikeProgress.isCompleted()) {
            achievements.add("🏆 Weekly Bike Challenge Completed");
        }
        if (recyclingProgress.isCompleted()) {
            achievements.add("♻️ Weekly Recycling Champion");
        }
        if (bottleProgress.isCompleted()) {
            achievements.add("🍼 Reusable Bottle Hero");
        }

        List<LocalDate> dates = ecoActionRepository.findActionDates(userId);

        int streak = calculateStreak(dates);

        if (streak >= 1) {
            achievements.add("🔥 1 Day Eco Beginner");
        }
        if (streak >= 3) {
            achievements.add("🔥 3 Day Eco Streak");
        }
        if (streak >= 7) {
            achievements.add("🌱 7 Day Green Warrior");
        }

        return new EcoDashboardResponse(
                totalCarbon,
                bikeProgress,
                recyclingProgress,
                bottleProgress,
                achievements
        );
    }

    public EcoTrackerProgressResponse getProgress(Long userId, EcoActionType actionType, int goal) {

        LocalDateTime startOfWeek = LocalDate.now().with(DayOfWeek.MONDAY).atStartOfDay();

        long progress = ecoActionRepository.countWeeklyActions(userId, actionType, startOfWeek);

        return new EcoTrackerProgressResponse(progress, goal, progress >= goal);
    }
}
