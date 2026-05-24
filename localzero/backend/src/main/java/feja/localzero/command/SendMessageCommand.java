package feja.localzero.command;

import feja.localzero.command.Command;
import feja.localzero.dto.MessageRequest;
import feja.localzero.service.PrivateMessageService;
import org.springframework.beans.factory.annotation.Autowired;

@org.springframework.stereotype.Service
public class SendMessageCommand implements Command<MessageRequest> {

    @Autowired
    private PrivateMessageService privateMessageService;

    @Override
    public void execute(MessageRequest request) {
        privateMessageService.sendMessage(
                request.getSenderId(),
                request.getReceiverId(),
                request.getContent()
        );
    }
}