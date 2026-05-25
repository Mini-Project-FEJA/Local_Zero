package feja.localzero.service;

import feja.localzero.dto.UserDTO;
import feja.localzero.entity.Community;
import feja.localzero.entity.User;
import feja.localzero.repo.CommunityRepository;
import feja.localzero.repo.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final CommunityRepository communityRepository;
    private final BCryptPasswordEncoder passwordEncoder;



    public UserService(UserRepository userRepository, CommunityRepository communityRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.communityRepository = communityRepository;
        this.passwordEncoder = passwordEncoder;
    }



    /*public User register(User user) {
        //behöver hasha password senare
        return userRepository.save(user);
    }

     */

    public User registerUser(User user){
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPasswordHash(encodedPassword);

        System.out.println("Encoded password" + encodedPassword);
        user.setPasswordHash(encodedPassword);

        Community community = getUserCommunity(user);
        user.setCommunity(community);

        userRepository.save(user);
        return user;
    }

    public Community getUserCommunity(User user){
        return communityRepository
                .findByName(user.getLocation())
                .orElseThrow(() -> new RuntimeException("Community not found"));
    }

    /**
     * Metod för att authenticate en user genom att verifiera  password
     */
    public boolean authenticate(User user, String password){
        return passwordEncoder.matches(password, user.getPasswordHash());
    }

    public UserDTO getById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new UserDTO(user);
    }

    public User getByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User getByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

//    //kan tas bort om vi använder registrering som sätter community id
//    public User assignUserToCommunity(Long userId, Long communityId) {
//
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        Community community = communityRepository.findById(communityId)
//                .orElseThrow(() -> new RuntimeException("Community not found"));
//
//        user.setCommunity(community);
//
//        return userRepository.save(user);
//    }

    public User login(String username, String password) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()){
            User user = userOpt.get();
            if (authenticate(user,password)){
                return user;
            }
        }
        throw new RuntimeException("Invalid username or password");
    }

    public List<User> getUsersByCommunityId(Long communityId) {
        return userRepository.findByCommunityId(communityId);
    }

}