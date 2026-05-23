package feja.localzero.service;

import feja.localzero.builder.PostBuilder;
import feja.localzero.entity.Post;
import feja.localzero.entity.User;
import feja.localzero.repo.PostRepository;
import feja.localzero.repo.UserRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

import org.springframework.transaction.annotation.Transactional;
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

    @Transactional
    public Post createPost(Long userId, String description, MultipartFile image) throws IOException {

        // 2. Hämta den faktiska användaren från databasen via ID
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Användaren med ID " + userId + " hittades inte!"));

        // 3. Skapa det nya inlägget och sätt värdena
        Post post = new Post();
        post.setUser(user); // Måste sättas eftersom nullable = false
        post.setDescription(description);
        post.setAmountOfLikes(0);

        // Här hanterar du bilden (just nu sätter vi bara ett exempel-namn)
        if (image != null && !image.isEmpty()) {
            // Här sparar du vanligtvis filen och får en URL tillbaka
            String imageUrl = "/uploads/" + image.getOriginalFilename();
            post.setImageurl(imageUrl);
        }

        // 4. VIKTIGT: Spara inlägget i databasen via ditt Repository
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

    public List<Post> search(Long userId, String sortOrder, Integer limit) {
        Specification<Post> specification = new PostBuilder()
                .perUser(userId)
                .build();

        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        if ("oldest".equalsIgnoreCase(sortOrder)) {
            sort = Sort.by(Sort.Direction.ASC, "createdAt");
        }

        int maxResults;
        if (limit != null) {
            maxResults = limit;
        } else {
            maxResults = 20;
        }

        Pageable pageable = PageRequest.of(0, maxResults, sort);

        return repo.findAll(specification, pageable).getContent();
    }

}