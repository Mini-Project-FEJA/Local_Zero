package feja.localzero.command;

import feja.localzero.entity.PrivateMessage;

public interface Command {
    PrivateMessage execute(PrivateMessage message);
}
