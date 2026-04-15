package feja.localzero.Entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;


@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "uploaded_post")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String description;

//    Hur ska vi spara bilder? Som URL eller som File i databasen?
//    public String image_url;
//    public file image;

    private int amountOfLikes;

    //Updatable så att man inte kan ändra när en post är uppladdad
    @Column(nullable = false, updatable = false)
    @Setter(AccessLevel.NONE)
    private LocalDateTime createdAt;

    //Körs när man skapar en ny row och sätter timestamp automatiskt till nuvarande tid
    //när man skapar ett inlägg
    @PrePersist
    protected void setTimestamp() {
        this.createdAt = LocalDateTime.now();
    }

}
