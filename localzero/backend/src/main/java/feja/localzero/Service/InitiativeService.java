package feja.localzero.Service;

import feja.localzero.Entity.InitiativeCategory;
import feja.localzero.Entity.SustainabilityInitiative;
import feja.localzero.Entity.User;
import feja.localzero.Entity.Visibility;
import feja.localzero.Repo.SustainabilityInitiativeRepository;
import feja.localzero.Repo.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public List<SustainabilityInitiative> getByVisibility(Visibility visibility) {
        return repo.findByVisibility(visibility);
    }

    public List<SustainabilityInitiative> getByCategory(InitiativeCategory category) {
        return repo.findByCategory(category);
    }

    public List<SustainabilityInitiative> getByCategoryAndVisibility(InitiativeCategory category, Visibility visibility) {
        return repo.findByCategoryAndVisibility(category, visibility);
    }
}