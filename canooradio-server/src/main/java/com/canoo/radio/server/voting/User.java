package com.canoo.radio.server.voting;


import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class User {
    @Id
    private String id;

    @OneToMany
    private List<Vote> votes;

    public User(String id, List<Vote> votes) {
        this.id = id;
        this.votes = votes;
    }
}
