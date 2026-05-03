package feja.localzero.command;

import feja.localzero.entity.PrivateMessage;
import feja.localzero.repo.PrivateMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SendMessageCommand implements Command {
    @Autowired
    private PrivateMessageRepository repo;

    @Override
    public PrivateMessage execute(PrivateMessage message) {
        repo.save(message);
        return message;
    }
}
