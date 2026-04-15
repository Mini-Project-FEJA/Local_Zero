package feja.localzero.Controller;

import feja.localzero.Entity.User;
import feja.localzero.Service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return service.register(user);
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return service.getById(id);
    }
}