package feja.localzero.controller;

import feja.localzero.command.CreatePostCommand;
import feja.localzero.dto.CreatePostRequest;
import feja.localzero.entity.Post;
import feja.localzero.service.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;
    private final CreatePostCommand createPostCommand;

    public PostController(PostService postService, CreatePostCommand createPostCommand) {
        this.postService = postService;
        this.createPostCommand = createPostCommand;
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchPosts(
            @RequestParam(required = false) Long userId,
            @RequestParam(defaultValue = "newest") String sort,
            @RequestParam(required = false) Integer limit) {

        try {
            List<Post> posts = postService.search(userId, sort, limit);
            return ResponseEntity.ok(posts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to search posts in PostController");
        }
    }

    @GetMapping("/myPosts/{userId}")
    public ResponseEntity<?> getMyPosts(
            @PathVariable(required = false) Long userId) {
        try {
            List<Post> posts = postService.getPostsByUser(userId);
            return ResponseEntity.ok(posts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to get posts in PostController");
        }
    }

    @PostMapping("/createPost")
    public ResponseEntity<Void> createPost(
            @RequestBody CreatePostRequest request) {
        System.out.println(request);
        createPostCommand.execute(request);
        return ResponseEntity.ok().build();
    }
}
