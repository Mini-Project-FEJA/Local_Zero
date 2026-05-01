package feja.localzero.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

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

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    @Enumerated(EnumType.STRING)
    private InitiativeCategory category;

    @Enumerated(EnumType.STRING)
    private Visibility visibility;
}
