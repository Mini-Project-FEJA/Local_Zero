package feja.localzero.decorator;

import java.util.List;

public abstract class EcoActionDecorator implements EcoAction {

    protected EcoAction ecoAction;

    public EcoActionDecorator(EcoAction ecoAction) {
        this.ecoAction = ecoAction;
    }

    @Override
    public String getDescription() {
        return ecoAction.getDescription();
    }

    @Override
    public double getCarbonSaving() {
        return ecoAction.getCarbonSaving();
    }

    @Override
    public List<String> getAchievements() {
        return ecoAction.getAchievements();
    }
}
