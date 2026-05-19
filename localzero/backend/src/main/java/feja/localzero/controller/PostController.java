package feja.localzero.controller;

import feja.localzero.entity.Post;
import feja.localzero.service.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
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
}
