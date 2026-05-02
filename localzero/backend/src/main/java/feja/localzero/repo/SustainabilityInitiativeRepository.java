package feja.localzero.repo;

import feja.localzero.entity.InitiativeCategory;
import feja.localzero.entity.SustainabilityInitiative;
import feja.localzero.entity.User;
import feja.localzero.entity.Visibility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

//filtrera initiativ med hjälp av attributer som user, category etc
@Repository
public interface SustainabilityInitiativeRepository extends JpaRepository<SustainabilityInitiative, Long> {

    List<SustainabilityInitiative> findByUser(User user);

    List<SustainabilityInitiative> findByVisibility(Visibility visibility);

    List<SustainabilityInitiative> findByCategory(InitiativeCategory category);

    List<SustainabilityInitiative> findByCategoryAndVisibility(
            InitiativeCategory category,
            Visibility visibility
    );

    List<SustainabilityInitiative> findByParticipants_Id(Long userId);
}