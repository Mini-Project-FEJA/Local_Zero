package feja.localzero.command;

import feja.localzero.entity.PrivateMessage;
import feja.localzero.repo.PrivateMessageRepository;
import feja.localzero.service.PrivateMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SendMessageCommand implements Command {
    @Autowired
    private PrivateMessageService privateMessageService;

    @Override
    public void execute(String message, Long senderId, Long receiverId) {
        privateMessageService.sendMessage(senderId, receiverId, message);
    }
}
