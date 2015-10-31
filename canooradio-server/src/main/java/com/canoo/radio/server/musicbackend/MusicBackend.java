package com.canoo.radio.server.musicbackend;

import java.util.List;

import org.bff.javampd.exception.MPDDatabaseException;
import org.bff.javampd.exception.MPDPlayerException;
import org.bff.javampd.exception.MPDPlaylistException;

public interface MusicBackend {
    Song getCurrentSong() throws Exception;

    List<Song> getPlayedSongs() throws Exception;

    List<Song> getUpcomingSongs() throws Exception;

    List<Song> getAllSongs() throws Exception;

    List<Song> searchSongs(String query) throws Exception;

    void removeSongFromQueue(Song song) throws Exception;

    void addSongToQueue(String fileName) throws Exception;

    void startPlayback() throws Exception;

    void startPlaybackAtEnd() throws MPDDatabaseException, MPDPlayerException, MPDPlaylistException;

    void stopPlayback() throws Exception;

    void nextSong() throws Exception;

    void previousSong() throws Exception;

    void clearQueue() throws Exception;

    void updateDatabase() throws Exception;
}
