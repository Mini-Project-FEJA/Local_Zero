package feja.localzero.Repo;

import feja.localzero.Entity.CommentOnPost;
import feja.localzero.Entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentOnPostRepository extends JpaRepository<CommentOnPost, Long> {

    List<CommentOnPost> findByPost(Post post);

}