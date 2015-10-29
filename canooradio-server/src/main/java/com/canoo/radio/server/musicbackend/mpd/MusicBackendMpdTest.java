package com.canoo.radio.server.musicbackend.mpd;

import com.canoo.radio.server.musicbackend.Song;
import org.bff.javampd.exception.MPDConnectionException;
import org.bff.javampd.exception.MPDDatabaseException;
import org.bff.javampd.exception.MPDPlayerException;
import org.bff.javampd.exception.MPDPlaylistException;
import org.junit.Test;

import java.net.UnknownHostException;
import java.util.List;

import static org.junit.Assert.*;

public class MusicBackendMpdTest {

    @Test
    public void testSetup() {
        try {

            MusicBackendMpd mpdBackend = new MusicBackendMpd();

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Test
    public void testAddSongToQueue() {
        try {
            MusicBackendMpd mpdBackend = new MusicBackendMpd();
            mpdBackend.clearQueue();

            final List<Song> allSongs = mpdBackend.getAllSongs();

            for (int i = 0; i < 10; i++) {
                mpdBackend.addSongToQueue(allSongs.get(i));
            }

            mpdBackend.startPlayback();

            assertEquals(9, mpdBackend.getUpcomingSongs().size());

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Test
    public void testCurrentSong() throws MPDConnectionException, UnknownHostException, MPDPlayerException {
        MusicBackendMpd mpdBackend = new MusicBackendMpd();
        String fileName = mpdBackend.getCurrentSong().getFileName();
        assertNotNull(fileName);
    }

    @Test
    public void testUpcomingSongs() throws MPDConnectionException, UnknownHostException, MPDPlaylistException {
        MusicBackendMpd mpdBackend = new MusicBackendMpd();
        final List<Song> upcomingSongs = mpdBackend.getUpcomingSongs();
        assertTrue(upcomingSongs.size() > 0);
        System.out.println(upcomingSongs.get(0).getFileName());
    }

    @Test
    public void testGetAllSongs() throws MPDConnectionException, UnknownHostException, MPDDatabaseException {
        MusicBackendMpd mpdBackend = new MusicBackendMpd();
        final List<Song> allSongs = mpdBackend.getAllSongs();
        assertTrue(allSongs.size() > 0);
        System.out.println(allSongs.size());
    }

    @Test
    public void testRemoveSongFromQueue() throws Exception {
        MusicBackendMpd mpdBackend = new MusicBackendMpd();
        Song newSong = mpdBackend.getUpcomingSongs().get(0);

        mpdBackend.removeSongFromQueue(newSong);

        assertFalse(mpdBackend.getUpcomingSongs().contains(newSong));
        System.out.printf(newSong.getFileName() + "");
    }

    @Test
    public void testStopPlayback() throws MPDPlayerException, MPDConnectionException, UnknownHostException {
        MusicBackendMpd mpdBackend = new MusicBackendMpd();
        mpdBackend.stopPlayback();
    }

    @Test
    public void testStartPlayback() throws MPDConnectionException, UnknownHostException, MPDPlayerException {
        MusicBackendMpd mpdBackend = new MusicBackendMpd();
        mpdBackend.startPlayback();


    }

    @Test
    public void testNextSong() throws MPDPlayerException, MPDConnectionException, UnknownHostException {
        MusicBackendMpd mpdBackend = new MusicBackendMpd();
        mpdBackend.nextSong();
    }

    @Test
    public void testPreviousSong() throws MPDConnectionException, UnknownHostException, MPDPlayerException {
        MusicBackendMpd mpdBackend = new MusicBackendMpd();
        mpdBackend.previousSong();
    }

    @Test
    public void testPlayedSongs() throws Exception {
        MusicBackendMpd mpdBackend = new MusicBackendMpd();
        final List<Song> playedSongs = mpdBackend.getPlayedSongs();

        assertNotEquals(0, playedSongs.size());
        System.out.println(playedSongs.size());

    }

    @Test
    public void testClearPlaylist() throws Exception {
        MusicBackendMpd mpdBackend = new MusicBackendMpd();
        final int sizeBefore = mpdBackend.getUpcomingSongs().size();

        mpdBackend.clearQueue();

        final int sizeAfter = mpdBackend.getUpcomingSongs().size();

        assertTrue(sizeAfter < sizeBefore);
        assertTrue(sizeAfter == 0);
    }


}
