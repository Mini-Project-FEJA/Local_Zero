package feja.localzero.repo;

import feja.localzero.entity.PrivateMessage;
import feja.localzero.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrivateMessageRepository extends JpaRepository<PrivateMessage, Long> {

    List<PrivateMessage> findBySender(User sender);

    //sorterad lista av dms
    List<PrivateMessage> findByReceiverOrderBySentAtDesc(User receiver);

    //hämta konversation
    List<PrivateMessage> findBySenderAndReceiverOrReceiverAndSenderOrderBySentAtAsc(
            User sender, User receiver,
            User receiver2, User sender2
    );
}