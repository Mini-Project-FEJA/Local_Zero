package feja.localzero.controller;

import feja.localzero.entity.InitiativeCategory;
import feja.localzero.entity.UserRole;
import feja.localzero.entity.Visibility;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/enums")
public class EnumController {

    @GetMapping("/categories")
    public List<Map<String, String>> getCategories() {
        return Arrays.stream(InitiativeCategory.values())
            .map(category -> Map.of(
                    "name", category.name(),
                    "label", category.getLabel()
            ))
            .collect(Collectors.toList());
    }

    @GetMapping("/visibility")
    public List<Map<String, String>> getVisibilities() {
        return Arrays.stream(Visibility.values())
                .map(visibility -> Map.of(
                        "name", visibility.name(),
                        "label", visibility.getLabel()
                ))
                .collect(Collectors.toList());
    }

    @GetMapping("/user-roles")
    public List<Map<String, String>> getUserRoles() {
        return Arrays.stream(UserRole.values())
                .map(role -> Map.of(
                        "name", role.name(),
                        "label", role.getLabel()
                ))
                .collect(Collectors.toList());
    }

}
