package com.canoo.radio.server.musicbackend;

import java.util.List;

/**
 * ...
 */
public interface MusicBackend {
    Song getCurrentSong();

    List<Song> getUpcommingSongs();

    List<Song> getRecentlyPlayedSongs();

    List<Song> getAllSongs();

    void addSongToQueue(Song song);

    void startPlayback();

    void stopPlayback();

    void nextSong();

    void previousSong();
}
