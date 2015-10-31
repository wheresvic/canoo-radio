package com.canoo.radio.server.controller;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import com.canoo.radio.server.musicbackend.MusicBackend;
import com.canoo.radio.server.musicbackend.Song;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/playlist")
public class PlaylistController {

    @Autowired
    private MusicBackend musicBackend;

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
        final List<Song> returnedList = playedSongs.stream().limit(10).collect(Collectors.toList());
        Collections.reverse(returnedList);
        return returnedList;
    }

    @RequestMapping("/add")
    public void addSong(@RequestParam(value = "fileName") String fileName) throws Exception {
        musicBackend.addSongToQueue(fileName);
        if (musicBackend.getCurrentSong() == null) {
            musicBackend.startPlaybackAtEnd();
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
}
