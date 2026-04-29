package feja.localzero.service;

import feja.localzero.entity.Community;
import feja.localzero.repo.CommunityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommunityService {

    private final CommunityRepository communityRepository;

    public CommunityService(CommunityRepository communityRepository) {
        this.communityRepository = communityRepository;
    }

    public Community createCommunity(String name) {
        Community community = new Community();
        community.setName(name);
        return communityRepository.save(community);
    }

    public List<Community> getAllCommunities() {
        return communityRepository.findAll();
    }

    public Community getCommunityById(Long id) {
        return communityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Community not found"));
    }

    public Community getByName(String name) {
        return communityRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Community not found"));
    }

    public void deleteCommunity(Long id) {
        if (!communityRepository.existsById(id)) {
            throw new RuntimeException("Community not found");
        }
        communityRepository.deleteById(id);
    }
}