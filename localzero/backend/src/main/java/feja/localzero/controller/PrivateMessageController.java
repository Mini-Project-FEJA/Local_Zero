package feja.localzero.controller;

import feja.localzero.command.SendMessageCommand;
import feja.localzero.entity.PrivateMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class PrivateMessageController {
    private final SendMessageCommand sendMessageCommand;

    public PrivateMessageController(SendMessageCommand sendMessageCommand) {
        this.sendMessageCommand = sendMessageCommand;
    }

    @MessageMapping("/send")
    @SendTo("/topic/messages")
    public PrivateMessage send(PrivateMessage message) {
        System.out.println(message);
        return sendMessageCommand.execute(message);
    }
}
