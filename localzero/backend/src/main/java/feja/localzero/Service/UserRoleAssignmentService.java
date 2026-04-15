package feja.localzero.Service;

import feja.localzero.Entity.User;
import feja.localzero.Entity.UserRole;
import feja.localzero.Entity.UserRoleAssignment;
import feja.localzero.Repo.UserRoleAssignmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserRoleAssignmentService {

    private final UserRoleAssignmentRepository repo;

    public UserRoleAssignmentService(UserRoleAssignmentRepository repo) {
        this.repo = repo;
    }

    public UserRoleAssignment assignRole(User user, UserRole role) {
        UserRoleAssignment assignment = new UserRoleAssignment();
        assignment.setUser(user);
        assignment.setRole(role);
        return repo.save(assignment);
    }

    public List<UserRoleAssignment> getRoles(User user) {
        return repo.findByUser(user);
    }
}