package feja.localzero.entity;

public enum InitiativeCategory {
    NONE("None"),
    PARTY("Party"),
    FOOD_AND_DRINK ("Food & Drink"),
    SPORT ("Sport"),
    MUSIC ("Music"),
    MAINTENANCE ("Maintenance");

    private final String label;

    InitiativeCategory(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

}
