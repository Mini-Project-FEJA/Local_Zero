const BASE_URL = "http://localhost:8081";

export class QueryBuilder {

    constructor(contentType) {
        this.contentType = contentType;
        this.userId = null;
        this.category = null;
        this.sortOrder = "newest";
        this.limit = null;
    }

    perUser(userId) {
        this.userId = userId;
        return this;
    }

    withCategory(category) {
        this.category = category;
        return this;
    }

    newestFirst() {
        this.sortOrder = "newest";
        return this;
    }

    oldestFirst() {
        this.sortOrder = "oldest";
        return this;
    }

    withLimit(limit) {
        this.limit = limit;
        return this;
    }

    async executeSearch() {
        const params = new URLSearchParams();

        if (this.userId) params.append("userId", this.userId);
        if (this.category) params.append("category", this.category);
        if (this.sortOrder) params.append("sort", this.sortOrder);
        if (this.limit) params.append("limit", this.limit);

        const url = `${BASE_URL}/${this.contentType}/search?${params.toString()}`

        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`Couldn't fetch ${this.contentType}`);
        }
    }
}