package feja.localzero.entity;

import lombok.Getter;

@Getter
public enum UserRole {
    ADMIN("Admin"),
    COMMUNITY_MANAGER("Community manager"),
    RESIDENT("Resident"),
    USER("User");

    private final String label;

    UserRole(String label) {
        this.label = label;
    }

}
