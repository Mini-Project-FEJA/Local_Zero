package feja.localzero.dto;

import lombok.Getter;

@Getter
public class EcoTrackerProgressResponse {

    private long currentProgress;
    private int goal;
    private boolean completed;

    public EcoTrackerProgressResponse(
            long currentProgress,
            int goal,
            boolean completed) {

        this.currentProgress = currentProgress;
        this.goal = goal;
        this.completed = completed;
    }
}
