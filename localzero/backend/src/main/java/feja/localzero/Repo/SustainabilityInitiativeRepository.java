package feja.localzero.Repo;

import feja.localzero.Entity.InitiativeCategory;
import feja.localzero.Entity.SustainabilityInitiative;
import feja.localzero.Entity.User;
import feja.localzero.Entity.Visibility;
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
}