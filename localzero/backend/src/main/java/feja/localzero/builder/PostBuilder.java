package feja.localzero.builder;

import feja.localzero.entity.Post;
import org.springframework.data.jpa.domain.Specification;

public class PostBuilder {

    private Specification<Post> specification = ((root, query, criteriaBuilder) -> null);

    public PostBuilder perUser(Long userId) {
        if (userId != null) {
            this.specification = this.specification.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("user").get("id"),userId));
        }
        return this;
    }

    public Specification<Post> build() {
        return this.specification;
    }
}
