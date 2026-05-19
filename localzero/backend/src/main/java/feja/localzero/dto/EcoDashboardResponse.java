package feja.localzero.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class EcoDashboardResponse {

    private double totalCarbonSaved;

    private EcoTrackerProgressResponse bikeProgress;
    private EcoTrackerProgressResponse recyclingProgress;
    private EcoTrackerProgressResponse bottleProgress;

    private List<String> achievements;

    public EcoDashboardResponse(double totalCarbonSaved,
            EcoTrackerProgressResponse bikeProgress,
            EcoTrackerProgressResponse recyclingProgress,
            EcoTrackerProgressResponse bottleProgress,
            List<String> achievements) {

        this.totalCarbonSaved = totalCarbonSaved;
        this.bikeProgress = bikeProgress;
        this.recyclingProgress = recyclingProgress;
        this.bottleProgress = bottleProgress;
        this.achievements = achievements;
    }
}
