package feja.localzero.Service;

import feja.localzero.Entity.CommentOnPost;
import feja.localzero.Entity.Post;
import feja.localzero.Entity.User;
import feja.localzero.Repo.CommentOnPostRepository;
import feja.localzero.Repo.PostRepository;
import feja.localzero.Repo.UserRepository;
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