package feja.localzero.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class MessageRequest {
    private String content;

    private Long senderId;

    private Long receiverId;
}
