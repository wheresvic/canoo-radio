package com.canoo.radio.server.controller;

import com.canoo.radio.server.voting.User;
import com.canoo.radio.server.voting.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    private class UserTemp {
        private String userId;
        private Map<String, Integer> votes = new HashMap<>();

        public UserTemp(String userId) {
            this.userId = userId;
        }

        public void upVote(String fileName) {
            votes.put(fileName, 1);
        }

        public String getUserId() {
            return userId;
        }

        public Map<String, Integer> getVotes() {
            return votes;
        }
    }

    @ResponseBody
    @RequestMapping("/snoop")
    public UserTemp getSnoop() {
        UserTemp user = new UserTemp("snoop");
        user.upVote("wtf");
        return user;
    }

    @RequestMapping("/{id}")
    public User getUser(@PathVariable("id") String userId) {
        User user = userRepository.findOne(userId);
        if (user != null) {
            return user;
        } else {
            user = new User(userId, new ArrayList<>());
            userRepository.save(user);
            return user;
        }
    }


}
