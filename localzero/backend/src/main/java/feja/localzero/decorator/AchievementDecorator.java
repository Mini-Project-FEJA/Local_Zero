package feja.localzero.decorator;

import java.util.ArrayList;
import java.util.List;

public class AchievementDecorator extends EcoActionDecorator {

    private final String achievement;

    public AchievementDecorator(EcoAction ecoAction, String achievement) {
        super(ecoAction);
        this.achievement = achievement;
    }

    @Override
    public List<String> getAchievements() {

        List<String> achievements = new ArrayList<>(ecoAction.getAchievements());

        achievements.add(achievement);

        return achievements;
    }
}
