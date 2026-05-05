package feja.localzero.controller;

import feja.localzero.command.SendMessageCommand;
import feja.localzero.entity.PrivateMessage;
import feja.localzero.service.PrivateMessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class PrivateMessageController {
    private final SendMessageCommand sendMessageCommand;
    private final PrivateMessageService privateMessageService;

    public PrivateMessageController(SendMessageCommand sendMessageCommand, PrivateMessageService privateMessageService) {
        this.sendMessageCommand = sendMessageCommand;
        this.privateMessageService = privateMessageService;
    }

    @MessageMapping("/send")
    @SendTo("/topic/messages")
    public PrivateMessage send(PrivateMessage message) {
        System.out.println(message);
        return sendMessageCommand.execute(message);
    }

    @PostMapping("/send/{receiverId}/{senderId}")
    public void save(@RequestBody String message, @PathVariable Long receiverId,
                     @PathVariable Long senderId) {
        privateMessageService.sendMessage(senderId, receiverId, message);
    }

    @GetMapping("/my-inbox/{user_id}")
    public List<PrivateMessage> getInbox(@PathVariable Long user_id) {
        return privateMessageService.getInbox(user_id);
    }

    @GetMapping("/private-messages/{receiverId}/{senderId}")
    public List<PrivateMessage> getPrivateMessages(
            @PathVariable Long receiverId,
            @PathVariable Long senderId) {
        System.out.println("Receiver ID: " + receiverId);
        System.out.println("Sender ID: " + senderId);

        return privateMessageService.getConversation(receiverId, senderId);
    }
}
