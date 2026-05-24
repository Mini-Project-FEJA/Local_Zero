package feja.localzero.dto;

import feja.localzero.entity.Post;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatePostRequest {
    private Long userId;
    private Post post;
}
