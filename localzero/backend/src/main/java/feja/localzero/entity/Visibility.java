package feja.localzero.entity;

public enum Visibility {
    PUBLIC("Public"),
    NEIGHBOURHOOD_ONLY("Neighbourhood only"),
    PRIVATE("Private");

    private final String label;

    Visibility(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
