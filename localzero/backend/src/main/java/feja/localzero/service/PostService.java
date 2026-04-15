package feja.localzero.service;

import feja.localzero.entity.Post;
import feja.localzero.entity.User;
import feja.localzero.repo.PostRepository;
import feja.localzero.repo.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    private final PostRepository repo;
    private final UserRepository userRepository;

    public PostService(PostRepository repo, UserRepository userRepository) {
        this.repo = repo;
        this.userRepository = userRepository;
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Post createPost(Long userId, Post post) {
        User user = getUser(userId);
        post.setUser(user);
        return repo.save(post);
    }

    public List<Post> getPostsByUser(Long userId) {
        User user = getUser(userId);
        return repo.findByUserOrderByCreatedAtDesc(user);
    }

    public List<Post> getPostsByUserSorted(Long userId) {
        User user = getUser(userId);
        return repo.findByUserOrderByCreatedAtDesc(user);
    }

    public Post likePost(Long postId) {
        Post post = repo.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        post.setAmountOfLikes(post.getAmountOfLikes() + 1);
        return repo.save(post);
    }
}