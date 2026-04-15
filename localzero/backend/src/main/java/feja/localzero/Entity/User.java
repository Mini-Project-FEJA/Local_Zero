package feja.localzero.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
//name är namn på table i databasen. UC = unique constraints, kolumner som är unika
@Table(name = "account", uniqueConstraints = {
        @UniqueConstraint(name = "uc_account_username", columnNames = "username"),
        @UniqueConstraint(name = "uc_account_email", columnNames = "email")
})
public class User {

    //Id betyder primary KEY
    @Id
    //Databasen håller reda på och genererar ett nummer, 1, 2, 3, 4....
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    //Fält kan inte vara null
    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String passwordHash;

    private String location;

    @Column(nullable = false)
    private String email;

}
