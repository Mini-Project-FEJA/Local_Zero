package feja.localzero.controller;

import feja.localzero.command.SendMessageCommand;
import feja.localzero.dto.MessageRequest;
import feja.localzero.entity.PrivateMessage;
import feja.localzero.service.PrivateMessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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

    @PostMapping("/private-messages/send")
    public ResponseEntity<Void> send(@RequestBody MessageRequest request) {
        sendMessageCommand.execute(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/my-inbox/{user_id}")
    public List<PrivateMessage> getInbox(@PathVariable Long user_id) {
        List<PrivateMessage> messages = new ArrayList<>();

        messages.addAll(privateMessageService.getInbox(user_id));
        messages.addAll(privateMessageService.getSentMessages(user_id));

        return messages;
    }

    @GetMapping("/sent-messages/{user_id}")
    public List<PrivateMessage> getSentMessages(@PathVariable Long user_id) {
        return privateMessageService.getSentMessages(user_id);
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
