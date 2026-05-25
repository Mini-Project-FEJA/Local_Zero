package feja.localzero.dto;

import feja.localzero.entity.User;

public class UserDTO {

    private Long id;
    private String username;
    private String email;
    private String location;
    private Long communityId;

    public UserDTO(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.location = user.getLocation();
        this.communityId = user.getCommunity() != null ? user.getCommunity().getId() : null;
    }

}
