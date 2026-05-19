package feja.localzero.controller;

import feja.localzero.entity.InitiativeCategory;
import feja.localzero.entity.SustainabilityInitiative;
import feja.localzero.service.InitiativeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/initiatives")
public class InitiativeController {

    private final InitiativeService service;
    private final InitiativeService initiativeService;

    public InitiativeController(InitiativeService service, InitiativeService initiativeService) {
        this.service = service;
        this.initiativeService = initiativeService;
    }

    @PostMapping("/create-initiative")
    public SustainabilityInitiative createInitiative(@RequestBody SustainabilityInitiative initiative) {
        return service.create(initiative.getUser().getId(), initiative);
    }

    @GetMapping("/get-all-initiatives")
    public List<SustainabilityInitiative> getAllInitiatives() {
        return service.getAll();
    }

    @GetMapping("/hosted/{userID}")
    public List<SustainabilityInitiative> getHostedInitiatives(@PathVariable Long userID) {
        return service.getFromUser(userID);
    }

    @GetMapping("/joined/{userID}")
    public List<SustainabilityInitiative> getParticipating(@PathVariable Long userID) {
        return service.getJoinedByUser(userID);
    }

    @PostMapping("/{initiativeID}/join/{userID}")
    public ResponseEntity<String> joinInitiative(@PathVariable Long initiativeID,
                                                 @PathVariable Long userID) {
        try {
            service.join(initiativeID, userID);
            return ResponseEntity.ok("You have joined initiative");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(("Couldn't join initiative"));
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchInitiatives(
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) InitiativeCategory category,
            @RequestParam(defaultValue = "newest") String sort,
            @RequestParam(required = false) Integer limit) {
        try {
            List<SustainabilityInitiative> initiatives = initiativeService
                    .search(userId, category, sort, limit);
            return ResponseEntity.ok(initiatives);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to search initiatives in InitiativesController");
        }

    }
}
