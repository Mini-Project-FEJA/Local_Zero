package feja.localzero.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class EcoActionResponse {

    private String description;
    private double carbonSaved;
    private List<String> achievements;

    public EcoActionResponse(
            String description,
            double carbonSaved,
            List<String> achievements) {

        this.description = description;
        this.carbonSaved = carbonSaved;
        this.achievements = achievements;
    }
}