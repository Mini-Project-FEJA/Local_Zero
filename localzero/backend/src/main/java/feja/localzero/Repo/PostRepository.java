package feja.localzero.Repo;

import feja.localzero.Entity.Post;
import feja.localzero.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByUser(User user);

    //sorterad lista av posts
    List<Post> findByUserOrderByCreatedAtDesc(User user);

}