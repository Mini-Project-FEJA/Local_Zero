package feja.localzero.service;

import feja.localzero.entity.User;
import feja.localzero.entity.UserRole;
import feja.localzero.entity.UserRoleAssignment;
import feja.localzero.repo.UserRoleAssignmentRepository;
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