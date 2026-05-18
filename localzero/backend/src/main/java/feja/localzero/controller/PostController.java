package feja.localzero.controller;

import feja.localzero.entity.Post;
import feja.localzero.service.PostService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/posts")
public class PostController {




    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Post createPost(
            @RequestParam Long userId,

            @RequestParam(required = false)
            String description,

            @RequestParam(required = false)
            MultipartFile image
    ) throws IOException {

        return postService.createPost(
                userId,
                description,
                image
        );
    }
}
