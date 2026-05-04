package feja.localzero.controller;

import feja.localzero.dto.LoginRequest;
import feja.localzero.entity.User;
import feja.localzero.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }


    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return service.registerUser(user);
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return service.getById(id);
    }

   /* @PostMapping("/login")
    public User login(@RequestBody User user){
       return service.login(user.getUsername(), user.getPasswordHash());
    }

    */
    @PostMapping("/login")
    public User login(@RequestBody LoginRequest request){

        return service.login(request.getUsername(), request.getPassword());
    }

    @GetMapping("/my-community/{communityId}")
    public List<User> getUsersInMyCommunity(@PathVariable Long communityId) {
        return service.getUsersByCommunityId(communityId);
    }

}