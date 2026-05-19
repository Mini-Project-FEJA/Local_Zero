package feja.localzero.decorator;

import java.util.ArrayList;
import java.util.List;

public class BasicEcoAction implements EcoAction {

    private final String description;
    private final double carbonSaving;

    public BasicEcoAction(String description, double carbonSaving) {
        this.description = description;
        this.carbonSaving = carbonSaving;
    }

    @Override
    public String getDescription() {
        return description;
    }

    @Override
    public double getCarbonSaving() {
        return carbonSaving;
    }

    @Override
    public List<String> getAchievements() {
        return new ArrayList<>();
    }
}
