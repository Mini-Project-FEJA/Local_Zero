package feja.localzero.Entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class SustainabilityInitiative {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "initiative_id")
    private Long id;

    //ForeignKey
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    private String location;
    private float durationHours;

    @Enumerated(EnumType.STRING)
    private InitiativeCategory category;

    @Enumerated(EnumType.STRING)
    private Visibility visibility;
}
