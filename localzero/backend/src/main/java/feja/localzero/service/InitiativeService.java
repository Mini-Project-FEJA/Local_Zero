package feja.localzero.service;

import feja.localzero.entity.InitiativeCategory;
import feja.localzero.entity.SustainabilityInitiative;
import feja.localzero.entity.User;
import feja.localzero.entity.Visibility;
import feja.localzero.repo.SustainabilityInitiativeRepository;
import feja.localzero.repo.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InitiativeService {

    private final SustainabilityInitiativeRepository repo;
    private final UserRepository userRepository;

    public InitiativeService(SustainabilityInitiativeRepository repo, UserRepository userRepository) {
        this.repo = repo;
        this.userRepository = userRepository;
    }

    public SustainabilityInitiative create(Long userId, SustainabilityInitiative initiative) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        initiative.setUser(user);
        return repo.save(initiative);
    }

    public List<SustainabilityInitiative> getAll() {
        return repo.findAll();
    }

    public List<SustainabilityInitiative> getFromUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return repo.findByUser(user);
    }

    public List<SustainabilityInitiative> getJoinedByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return repo.findByParticipants_Id(userId);
    }

    public List<SustainabilityInitiative> getByVisibility(Visibility visibility) {
        return repo.findByVisibility(visibility);
    }

    public List<SustainabilityInitiative> getByCategory(InitiativeCategory category) {
        return repo.findByCategory(category);
    }

    public List<SustainabilityInitiative> getByCategoryAndVisibility(InitiativeCategory category, Visibility visibility) {
        return repo.findByCategoryAndVisibility(category, visibility);
    }

    @Transactional
    public void join(Long initiativeID, Long userID) {
        SustainabilityInitiative initiative = repo.findById(initiativeID)
            .orElseThrow(() -> new RuntimeException("Couldn't find initiative"));

        User user = userRepository.findById(userID)
            .orElseThrow(() -> new RuntimeException("Couldn't find user"));

        if (initiative.getParticipants().contains(user)) {
            throw new RuntimeException("Already joined this initiative");
        }

        initiative.getParticipants().add(user);

        repo.save(initiative);
    }






}