package feja.localzero.controller;

import feja.localzero.dto.EcoActionRequest;
import feja.localzero.dto.EcoActionResponse;
import feja.localzero.dto.EcoDashboardResponse;
import feja.localzero.service.EcoActionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tracker")
public class EcoActionController {

    private final EcoActionService ecoActionService;

    public EcoActionController(EcoActionService ecoActionService) {
        this.ecoActionService = ecoActionService;
    }

    @PostMapping
    public ResponseEntity<EcoActionResponse> logAction(@RequestBody EcoActionRequest request) {
        return ResponseEntity.ok(ecoActionService.logAction(request));
    }

    @GetMapping("/dashboard/{userId}")
    public EcoDashboardResponse getDashboard(@PathVariable Long userId) {
        return ecoActionService.getDashboard(userId);
    }
}
