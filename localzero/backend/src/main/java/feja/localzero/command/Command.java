package feja.localzero.command;

import feja.localzero.dto.CreatePostRequest;

public interface Command<T> {
    void execute(T request);
}
