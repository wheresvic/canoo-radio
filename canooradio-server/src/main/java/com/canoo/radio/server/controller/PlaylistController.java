package com.canoo.radio.server.controller;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.List;

import com.canoo.radio.server.Strings;
import com.canoo.radio.server.musicbackend.MusicBackend;
import com.canoo.radio.server.musicbackend.Song;
import com.canoo.radio.server.voting.SongEntity;
import com.canoo.radio.server.voting.User;
import com.canoo.radio.server.voting.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping("/playlist")
public class PlaylistController {

    @Value("${user.queue.limit}")
    private int userQueueLimit;

    @Autowired
    private MusicBackend musicBackend;

    @Autowired
    private UserRepository userRepository;

    public void setMusicBackend(MusicBackend musicBackend) {
        this.musicBackend = musicBackend;
    }

    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void setUserQueueLimit(int userQueueLimit) {
        this.userQueueLimit = userQueueLimit;
    }

    @RequestMapping("/current")
    public Song getCurrentSong() throws Exception {
        return musicBackend.getCurrentSong();
    }

    @RequestMapping("/upcoming")
    public List<Song> getUpcomingSongs() throws Exception {
        return musicBackend.getUpcomingSongs();
    }

    @RequestMapping("/played")
    public List<Song> getPlayedSongs() throws Exception {
        final List<Song> playedSongs = musicBackend.getPlayedSongs();
        Collections.reverse(playedSongs);
        final List<Song> returnedList = playedSongs.stream().limit(10).collect(toList());
        Collections.reverse(returnedList);
        return returnedList;
    }

    @RequestMapping("/add")
    public void addSong(@RequestParam(value = "userId") String userId, @RequestParam(value = "fileName") String fileName) throws Exception {

        if (Strings.isNullOrEmpty(userId)) {
            throw new UserQueueLimitException();
        }

        final List<String> upcomingSongIds = musicBackend.getUpcomingSongs().stream().map(Song::getId).collect(toList());
        final User user = userRepository.findOne(userId);
        final List<SongEntity> songEntities = user.getQueuedSongEntities().stream().filter(s -> upcomingSongIds.contains(s.getId())).collect(toList());
        user.setQueuedSongEntities(songEntities);

        if (user.getQueuedSongEntities().size() < userQueueLimit) {
            musicBackend.addSongToQueue(fileName);

            SongEntity newSong = new SongEntity(fileName);

            if (!songEntities.contains(newSong)) {
                user.getQueuedSongEntities().add(new SongEntity(fileName));
            }
            userRepository.save(user);

            if (musicBackend.getCurrentSong() == null) {
                musicBackend.startPlaybackAtEnd();
            }
        } else {
            throw new UserQueueLimitException();
        }
    }

    @RequestMapping("/clear")
    public void clearPlaylist() throws Exception {
        musicBackend.clearQueue();
    }

    @RequestMapping("/next")
    public void nextSong() throws Exception {
        musicBackend.nextSong();
    }

    @RequestMapping("/previous")
    public void previousSong() throws Exception {
        musicBackend.previousSong();
    }

    @ExceptionHandler(UserQueueLimitException.class)
    void handleBadRequests(HttpServletResponse response) throws IOException {
        response.sendError(HttpStatus.FORBIDDEN.value());
    }

    private class UserQueueLimitException extends Exception {
    }
}
