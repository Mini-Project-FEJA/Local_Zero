package feja.localzero.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "account", uniqueConstraints = {
        @UniqueConstraint(name = "uc_account_username", columnNames = "username"),
        @UniqueConstraint(name = "uc_account_email", columnNames = "email")
})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String passwordHash;

    private String location;

    @Column(nullable = false)
    private String email;

}
