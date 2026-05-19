package feja.localzero.repo;

import feja.localzero.entity.EcoActionLog;
import feja.localzero.entity.EcoActionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EcoActionRepository extends JpaRepository<EcoActionLog, Long> {

    @Query("""
    SELECT COUNT(e)
    FROM EcoActionLog e
    WHERE e.user.id = :userId
    AND e.actionType = :actionType
    AND e.createdAt >= :startOfWeek
    """)
    long countWeeklyActions(Long userId, EcoActionType actionType, LocalDateTime startOfWeek);

    @Query("""
    SELECT COALESCE(SUM(e.carbonSaved), 0)
    FROM EcoActionLog e
    WHERE e.user.id = :userId
    """)
    double getTotalCarbonSaved(Long userId);

    @Query("""
    SELECT DISTINCT DATE(e.createdAt)
    FROM EcoActionLog e
    WHERE e.user.id = :userId
    ORDER BY DATE(e.createdAt) DESC
    """)
    List<LocalDate> findActionDates(Long userId);
}