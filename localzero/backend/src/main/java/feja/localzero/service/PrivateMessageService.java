package feja.localzero.service;

import feja.localzero.entity.PrivateMessage;
import feja.localzero.entity.User;
import feja.localzero.repo.PrivateMessageRepository;
import feja.localzero.repo.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrivateMessageService {

    private final PrivateMessageRepository repo;
    private final UserRepository userRepository;

    public PrivateMessageService(PrivateMessageRepository repo, UserRepository userRepository) {
        this.repo = repo;
        this.userRepository = userRepository;
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public PrivateMessage sendMessage(Long senderId, Long receiverId, String content) {

        User sender = getUser(senderId);
        User receiver = getUser(receiverId);

        PrivateMessage message = new PrivateMessage();
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setContent(content);

        return repo.save(message);
    }

    public List<PrivateMessage> getInbox(Long userId) {
        User user = getUser(userId);
        return repo.findByReceiverOrderBySentAtDesc(user);
    }

    public List<PrivateMessage> getSentMessages(Long userId) {
        User user = getUser(userId);
        return repo.findBySender(user);
    }

    public List<PrivateMessage> getConversation(Long user1Id, Long user2Id) {

        User user1 = getUser(user1Id);
        User user2 = getUser(user2Id);

        return repo.findBySenderAndReceiverOrReceiverAndSenderOrderBySentAtAsc(
                user1, user2,
                user1, user2
        );
    }
}