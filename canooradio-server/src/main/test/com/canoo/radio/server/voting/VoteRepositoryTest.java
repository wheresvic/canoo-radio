package com.canoo.radio.server.voting;

import com.canoo.radio.server.CanooRadioServer;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertTrue;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = CanooRadioServer.class)
public class VoteRepositoryTest {

    @Autowired
    VoteRepository voteRepository;

    @Test
    public void addVoteTest() throws Exception {
        long oldSize = voteRepository.count();

        final Vote vote = new Vote("Du musst ein Schwein sein", Vote.VoteValue.UPVOTE);
        voteRepository.save(vote);

        long newSize = voteRepository.count();

        assertNotEquals(oldSize, newSize);
        assertTrue(oldSize < newSize);
    }

}
