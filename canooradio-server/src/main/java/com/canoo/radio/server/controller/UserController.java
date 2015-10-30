package com.canoo.radio.server.controller;

import com.canoo.radio.server.voting.User;
import com.canoo.radio.server.voting.UserRepository;
import com.canoo.radio.server.voting.Vote;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {
    private class UiUser {
        private String userId;
        private Map<String, Integer> votes = new HashMap<>();

        public UiUser(User user) {
            this.userId = user.getId();
            this.votes = new HashMap<>();
            for (Vote vote : user.getVotes()) {
                this.votes.put(vote.getSongFilename(), vote.getValue().getValue());
            }

        }

        public String getUserId() {
            return userId;
        }

        public Map<String, Integer> getVotes() {
            return votes;
        }
    }

    @Autowired
    private UserRepository userRepository;

    @ResponseBody
    @RequestMapping("/{id}")
    public UiUser getUser(@PathVariable("id") String userId) {
        User user = userRepository.findOne(userId);
        if (user != null) {
            return new UiUser(user);
        } else {
            user = new User(userId, new ArrayList<>());
            userRepository.save(user);
            return new UiUser(user);
        }
    }


}
