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

    public String getId() {
        return id;
    }

    public List<Vote> getVotes() {

        return votes;
    }

    public void upvoteSong(String songFileName) {
        voteSong(songFileName, Vote.VoteValue.UPVOTE);
    }

    public void downvoteSong(String songFileName) {
        voteSong(songFileName, Vote.VoteValue.DOWNVOTE);
    }

    public void clearVote(String songFileName) {
        Vote vote = votes.stream().filter(v -> v.getSongFilename().equals(songFileName)).findFirst().orElse(null);
        if (vote == null) {
            votes.remove(vote);
        }
    }

    private void voteSong(String songFileName, Vote.VoteValue voteValue) {
        Vote vote = votes.stream().filter(v -> v.getSongFilename().equals(songFileName)).findFirst().orElse(null);
        if (vote == null) {
            votes.add(new Vote(songFileName, voteValue));
        } else {
            vote.setValue(voteValue);
        }
    }
}
