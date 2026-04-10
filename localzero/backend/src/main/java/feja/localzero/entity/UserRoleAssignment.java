package feja.localzero.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Entity
@Getter
@NoArgsConstructor
@Table(name = "user_role",
        uniqueConstraints = @UniqueConstraint(
        name = "uc_role_user",
        columnNames = {"role","user"}))
public class UserRoleAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "role_type", nullable = false)
    private UserRole role;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
