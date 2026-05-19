package feja.localzero.entity;

public enum InitiativeCategory {
    NO_CATEGORY("No category"),
    PARTY("Party"),
    FOOD_AND_DRINK ("Food & Drink"),
    SPORT ("Sport"),
    MUSIC ("Music"),
    RECYCLING("Recycling"),
    MAINTENANCE ("Maintenance");

    private final String label;

    InitiativeCategory(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

}
