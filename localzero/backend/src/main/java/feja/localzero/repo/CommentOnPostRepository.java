package feja.localzero.repo;

import feja.localzero.entity.CommentOnPost;
import feja.localzero.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentOnPostRepository extends JpaRepository<CommentOnPost, Long> {

    List<CommentOnPost> findByPost(Post post);

}