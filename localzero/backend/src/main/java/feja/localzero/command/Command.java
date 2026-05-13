package feja.localzero.command;

import feja.localzero.entity.PrivateMessage;

public interface Command {
    void execute(String message, Long senderId, Long receiverId);
}
