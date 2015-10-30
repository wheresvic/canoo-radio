package com.canoo.radio.server.controller;

import com.canoo.radio.server.musicbackend.MusicBackend;
import com.canoo.radio.server.musicbackend.Song;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static java.util.stream.Collectors.toList;

@RestController
public class MusicBackendController {

    @Autowired
    private MusicBackend musicBackend;

    @RequestMapping("/currentSong")
    public Song getCurrentSong() throws Exception {
        return musicBackend.getCurrentSong();
    }

    @RequestMapping("/upcomingSongs")
    public List<Song> getUpcomingSongs() throws Exception {
        return musicBackend.getUpcomingSongs();
    }

    @RequestMapping("/playedSongs")
    public List<Song> getPlayedSongs() throws Exception {
        return musicBackend.getPlayedSongs().stream().limit(10).collect(toList());
    }

    @RequestMapping("/allSongs")
    public List<Song> getAllSongs() throws Exception {
        return musicBackend.getAllSongs();
    }

    @RequestMapping("/addSong")
    public void addSong(@RequestParam(value="fileName") String fileName) throws Exception {
        musicBackend.addSongToQueue(fileName);
    }

    @RequestMapping("/clearQueue")
    public void addSong() throws Exception {
        musicBackend.clearQueue();
    }

}
