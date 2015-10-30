package com.canoo.radio.server.controller;

import com.canoo.radio.server.voting.User;
import com.canoo.radio.server.voting.UserRepository;
import com.canoo.radio.server.voting.Vote;
import com.canoo.radio.server.voting.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/vote")
public class VotingController {

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/up")
    public void getUpvoteSong(@RequestParam("filename") String fileName, @RequestParam("userId") String userId) {
        final User user = userRepository.findOne(userId);
        if (user != null) {
            user.upvoteSong(fileName);
            userRepository.save(user);
        }
    }

    @RequestMapping("/down")
    public void getDownvoteSong(@RequestParam("filename") String fileName, @RequestParam("userId") String userId) {
        final User user = userRepository.findOne(userId);
        if (user != null) {
            user.downvoteSong(fileName);
            userRepository.save(user);
        }
    }

    @RequestMapping("/clear")
    public void getClearVote(@RequestParam("filename") String fileName, @RequestParam("userId") String userId) {
        final User user = userRepository.findOne(userId);
        if (user != null) {
            Vote vote = user.clearVote(fileName);

            if (vote != null) {
                voteRepository.delete(vote);
            }

            userRepository.save(user);
        }
    }
}
