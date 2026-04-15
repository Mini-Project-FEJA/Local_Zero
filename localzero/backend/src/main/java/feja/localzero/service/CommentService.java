package feja.localzero.service;

import feja.localzero.entity.CommentOnPost;
import feja.localzero.entity.Post;
import feja.localzero.entity.User;
import feja.localzero.repo.CommentOnPostRepository;
import feja.localzero.repo.PostRepository;
import feja.localzero.repo.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    private final CommentOnPostRepository repo;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public CommentService(CommentOnPostRepository repo, PostRepository postRepository, UserRepository userRepository) {
        this.repo = repo;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public CommentOnPost addComment(Long postId, Long userId, String content) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        CommentOnPost comment = new CommentOnPost();
        comment.setPost(post);
        comment.setCommenter(user);
        comment.setContent(content);

        return repo.save(comment);
    }

    public List<CommentOnPost> getComments(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        return repo.findByPost(post);
    }
}