package com.canoo.radio.server.voting;


import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.util.List;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

@Entity
public class User {
    @Id
    private String id;

    @OneToMany(fetch = FetchType.EAGER)
    @Cascade({CascadeType.MERGE, CascadeType.SAVE_UPDATE})
    private List<Vote> votes;

    @OneToMany(fetch = FetchType.EAGER)
    @Cascade({CascadeType.PERSIST})
    private List<SongEntity> queuedSongEntities;

    public User() {

    }

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

    public List<SongEntity> getQueuedSongEntities() {
        return queuedSongEntities;
    }

    public void setQueuedSongEntities(List<SongEntity> queuedSongEntities) {
        this.queuedSongEntities = queuedSongEntities;
    }

    public void upvoteSong(String songFileName) {
        voteSong(songFileName, Vote.VoteValue.UPVOTE);
    }

    public void downvoteSong(String songFileName) {
        voteSong(songFileName, Vote.VoteValue.DOWNVOTE);
    }

    public Vote clearVote(String songFileName) {

        Vote vote = votes.stream().filter(v -> v.getSongFilename().equals(songFileName)).findFirst().orElse(null);
        if (vote != null) {
            votes.remove(vote);
        }

        return vote;
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
