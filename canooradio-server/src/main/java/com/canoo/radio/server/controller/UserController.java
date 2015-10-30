package com.canoo.radio.server.controller;

import com.canoo.radio.server.voting.User;
import com.canoo.radio.server.voting.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/get")
    public User getUser(@RequestParam("userId") String userId) {
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
