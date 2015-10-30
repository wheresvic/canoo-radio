package com.canoo.radio.server.voting;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Vote {

    public enum VoteValue {
        UPVOTE(1),
        DOWNVOTE(-1);

        int vote;

        VoteValue(int vote) {
            this.vote = vote;
        }

    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String songFilename;
    private VoteValue value;

    public Vote(String songFilename, VoteValue value) {
        this.songFilename = songFilename;
        this.value = value;
    }
}
