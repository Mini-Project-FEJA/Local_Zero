package feja.localzero.builder;

import feja.localzero.entity.InitiativeCategory;
import feja.localzero.entity.SustainabilityInitiative;
import org.springframework.data.jpa.domain.Specification;

public class InitiativeBuilder {

    //root = tabell/entity, query = sql frågan, criteriaBuilder = operatorer
    private Specification<SustainabilityInitiative> specification = (root, query, criteriaBuilder) -> null;

    public InitiativeBuilder perUser(Long userId) {
        if (userId != null) {
            this.specification = this.specification.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("user").get("id"), userId));
        }
        return this;
    }

    public InitiativeBuilder withCategory(InitiativeCategory category) {
        if (category != null) {
            this.specification = this.specification.and(((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("category"), category)));
        }
        return this;
    }

    public InitiativeBuilder withVisibility(InitiativeCategory visibility) {
        if (visibility != null) {
            this.specification = this.specification.and(((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("visibility"), visibility)));
        }
        return this;
    }

    public Specification<SustainabilityInitiative> build() {
        return this.specification;
    }
}
