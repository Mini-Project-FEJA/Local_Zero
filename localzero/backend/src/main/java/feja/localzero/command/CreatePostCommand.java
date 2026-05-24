package feja.localzero.command;

import feja.localzero.dto.CreatePostRequest;
import feja.localzero.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;

@org.springframework.stereotype.Service
public class CreatePostCommand implements Command<CreatePostRequest> {
    @Autowired private PostService postService;

    @Override
    public void execute(CreatePostRequest request) {
        postService.createPost(
                request.getUserId(),
                request.getPost()
        );
    }
}
