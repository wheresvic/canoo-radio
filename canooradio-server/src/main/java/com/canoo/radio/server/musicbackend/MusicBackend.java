package com.canoo.radio.server.musicbackend;

import java.util.List;

public interface MusicBackend {
    Song getCurrentSong() throws Exception;

    List<Song> getPlayedSongs() throws Exception;

    List<Song> getUpcomingSongs() throws Exception;

    List<Song> getAllSongs() throws Exception;

    void removeSongFromQueue(Song song) throws Exception;

    void addSongToQueue(Song song) throws Exception;

    void addSongToQueue(String fileName) throws Exception;

    void startPlayback() throws Exception;

    void stopPlayback() throws Exception;

    void nextSong() throws Exception;

    void previousSong() throws Exception;

    void clearQueue() throws Exception;

    void updateDatabase() throws Exception;
}
