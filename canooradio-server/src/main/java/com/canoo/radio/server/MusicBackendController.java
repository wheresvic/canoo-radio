package com.canoo.radio.server;

import com.canoo.radio.server.musicbackend.MusicBackend;
import com.canoo.radio.server.musicbackend.Song;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
        return musicBackend.getPlayedSongs();
    }

    @RequestMapping("/allSongs")
    public List<Song> getAllSongs() throws Exception {
        return musicBackend.getAllSongs();
    }

    @RequestMapping("/addSong")
    public void addSong(@RequestParam(value="id") String id) throws Exception {
        musicBackend.addSongToQueue(id);
    }

}
