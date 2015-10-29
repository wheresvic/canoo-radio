package com.canoo.radio.server.musicbackend.mpd;

import com.canoo.radio.server.musicbackend.MusicBackend;
import com.canoo.radio.server.musicbackend.Song;
import org.bff.javampd.MPD;

import java.util.List;

class MusicBackendMpd implements MusicBackend {
    private MPD mpd;

    public MusicBackendMpd() {
        try {
            mpd = new MPD.Builder().server("10.0.1.24").port(6600).build();
        } catch (Exception e) {
            e.printStackTrace();
            System.exit(-1);
        }
    }

    public Song getCurrentSong() {
        throw new RuntimeException("Not implemented yet!");
    }

    public List<Song> getUpcommingSongs() {
        throw new RuntimeException("Not implemented yet!");
    }

    public List<Song> getRecentlyPlayedSongs() {
        throw new RuntimeException("Not implemented yet!");
    }

    public List<Song> getAllSongs() {
        throw new RuntimeException("Not implemented yet!");
    }

    public void addSongToQueue(Song song) {
        throw new RuntimeException("Not implemented yet!");
    }

    public void addSongmpdToQueue(Song song) {
        throw new RuntimeException("Not implemented yet!");
    }

    public void startPlayback() {
        throw new RuntimeException("Not implemented yet!");
    }

    public void stopPlayback() {
        throw new RuntimeException("Not implemented yet!");
    }

    public void nextSong() {
        throw new RuntimeException("Not implemented yet!");
    }

    public void previousSong() {
        throw new RuntimeException("Not implemented yet!");
    }
}
