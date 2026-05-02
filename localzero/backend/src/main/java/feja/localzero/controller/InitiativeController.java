package feja.localzero.controller;

import feja.localzero.entity.SustainabilityInitiative;
import feja.localzero.entity.User;
import feja.localzero.service.InitiativeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/initiatives")
public class InitiativeController {

    private final InitiativeService service;

    public InitiativeController(InitiativeService service) {
        this.service = service;
    }

    @PostMapping("/create-initiative")
    public SustainabilityInitiative createInitiative(@RequestBody SustainabilityInitiative initiative) {
        return service.create(initiative.getUser().getId(), initiative);
    }

    @GetMapping("/get-all-initiatives")
    public List<SustainabilityInitiative> getAllInitiatives() {
        return service.getAll();
    }

    @GetMapping("/user/{userID}")
    public List<SustainabilityInitiative> getInitiativesByUser(@PathVariable Long userID) {
        return service.getFromUser(userID);
    }

//    @PostMapping("/{initiativeID}/join/{userID}")
//    public ResponseEntity<String> joinInitiative(@RequestBody Long initiativeID,
//                                                 @RequestBody Long userID) {
//        try {
//            service.join(initiativeID, userID);
//            return ResponseEntity.ok("You have joined initiative");
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(("Couldn't join initiative"));
//        }
//    }
}
