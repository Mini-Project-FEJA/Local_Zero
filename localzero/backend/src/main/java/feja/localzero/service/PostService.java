package feja.localzero.service;

import feja.localzero.entity.Post;
import feja.localzero.entity.User;
import feja.localzero.repo.PostRepository;
import feja.localzero.repo.UserRepository;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


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

    public Post createPost(Long userId,
                           String description,
                           MultipartFile image) throws IOException {

        User user = getUser(userId);

        boolean hasDescription =
                description != null && !description.trim().isEmpty();

        boolean hasImage =
                image != null && !image.isEmpty();

        if (!hasDescription && !hasImage) {
            throw new RuntimeException(
                    "Post must contain text or image");
        }

        String imageUrl = null;

        if (hasImage) {

            String fileName =
                    UUID.randomUUID() + "_" +
                            image.getOriginalFilename();

            Path uploadPath = Paths.get("uploads");

            Files.createDirectories(uploadPath);

            Path filePath = uploadPath.resolve(fileName);

            Files.copy(image.getInputStream(), filePath);

            imageUrl = "/uploads/" + fileName;
        }

        Post post = new Post();

        post.setUser(user);

        post.setDescription(hasDescription
                ? description
                : null);

        post.setImageUrl(imageUrl);

        post.setAmountOfLikes(0);

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