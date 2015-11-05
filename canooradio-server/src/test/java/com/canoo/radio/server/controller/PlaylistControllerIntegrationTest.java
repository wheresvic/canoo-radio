package com.canoo.radio.server.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.canoo.radio.server.CanooRadioServer;
import com.canoo.radio.server.musicbackend.MusicBackend;
import com.canoo.radio.server.musicbackend.Song;
import com.canoo.radio.server.voting.SongEntity;
import com.canoo.radio.server.voting.User;
import com.canoo.radio.server.voting.UserRepository;
import com.github.springtestdbunit.DbUnitTestExecutionListener;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.github.springtestdbunit.annotation.DatabaseTearDown;
import junit.framework.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.support.DirtiesContextTestExecutionListener;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;

import static java.util.stream.Collectors.toList;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.*;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@TestExecutionListeners({DependencyInjectionTestExecutionListener.class,
        DirtiesContextTestExecutionListener.class,
        TransactionalTestExecutionListener.class,
        DbUnitTestExecutionListener.class})
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = CanooRadioServer.class)
// @DatabaseSetup(ItemRepositoryIT.DATASET)
// @DatabaseTearDown(type = DatabaseOperation.DELETE_ALL, value = { ItemRepositoryIT.DATASET })
@DirtiesContext
// @IntegrationTest("spring.jpa.properties.hibernate.show_sql:true")
public class PlaylistControllerIntegrationTest {

    MusicBackend musicBackend;

    @Autowired
    UserRepository userRepository;

    PlaylistController sut;

    @Before
    public void setUp() throws Exception {
        musicBackend = mock(MusicBackend.class);

        sut = new PlaylistController();

        sut.setMusicBackend(musicBackend);
        sut.setUserRepository(userRepository);
        sut.setUserQueueLimit(3);
    }

    @Test
    public void testAddSongWhenAlreadyAdded() throws Exception {

        // given
        String songPath1 = "/coach.mp3";
        Song song = new Song(songPath1, "coach", "coach", "coach", 2);

        String userId = "snoop";

        List<Song> returnedSongs = new ArrayList<>();
        returnedSongs.add(song);

        when(musicBackend.getUpcomingSongs()).thenReturn(returnedSongs);

        User user = new User(userId, new ArrayList<>());

        List<SongEntity> songEntities = Arrays.asList(new SongEntity(songPath1));
        user.setQueuedSongEntities(songEntities);
        userRepository.save(user);

        /*
        {
            List<SongEntity> _songs = user.getQueuedSongEntities();

            System.out.println("++++ TEST 1 ++++");

            for (SongEntity t : _songs) {
                System.out.println(t.getId());
            }

            System.out.println("---- TEST 1 ----");
        }

        {
            final List<Song> upcomingSongIds = musicBackend.getUpcomingSongs();
            final List<SongEntity> _filtered = user.getQueuedSongEntities().stream().filter(s -> upcomingSongIds.contains(s.getId())).collect(toList());

            System.out.println("++++ TEST 2 ++++");

            for (SongEntity t : _filtered) {
                System.out.println(t.getId());
            }

            System.out.println("---- TEST 2 ----");
        }
        */

        // when
        sut.addSong(userId, songPath1);

        // then
        List<Song> upcomingSongs = sut.getUpcomingSongs();
        assertTrue(upcomingSongs.size() > 0);

    }

    @Test
    public void testAddSong() throws Exception {

        // given
        String songPath1 = "/coach.mp3";
        String userId = "snoop";

        when(musicBackend.getUpcomingSongs()).thenReturn(new ArrayList<>());

        User user = new User(userId, new ArrayList<>());
        userRepository.save(user);

        // when
        sut.addSong(userId, songPath1);

        // then
        User retrieved = userRepository.findOne(userId);
        assertThat(retrieved.getQueuedSongEntities().size(), is(1));

    }
}