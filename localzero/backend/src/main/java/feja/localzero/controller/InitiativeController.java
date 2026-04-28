package feja.localzero.controller;

import feja.localzero.entity.SustainabilityInitiative;
import feja.localzero.service.InitiativeService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InitiativeController {

    private final InitiativeService service;

    public InitiativeController(InitiativeService service) {
        this.service = service;
    }

    @PostMapping("/create-initiative")
    public SustainabilityInitiative createInitiative(@RequestBody SustainabilityInitiative initiative) {
        return service.create(initiative.getUser().getId(), initiative);
    }
}
