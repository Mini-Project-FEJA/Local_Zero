package feja.localzero.repo;

import feja.localzero.entity.User;
import feja.localzero.entity.UserRoleAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRoleAssignmentRepository extends JpaRepository<UserRoleAssignment, Long> {

     //hämtar alla roller för en user
     List<UserRoleAssignment> findByUser(User user);

}
