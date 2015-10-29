package com.canoo.radio.server.musicbackend.mpd;

import com.canoo.radio.server.musicbackend.Song;
import org.junit.Test;

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
    public void testCurrentSong() {
        try {

            MusicBackendMpd mpdBackend = new MusicBackendMpd();
            final String filename = mpdBackend.getCurrentSong().getFilename();
            assertNotNull(filename);
            System.out.println(filename);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Test
    public void testUpcomingSongs() {
        try {

            MusicBackendMpd mpdBackend = new MusicBackendMpd();
            final List<Song> upcomingSongs = mpdBackend.getUpcomingSongs();
            assertTrue(upcomingSongs.size() > 0);
            System.out.println(upcomingSongs.get(0).getFilename());

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Test
    public void testGetAllSongs() {
        try {

            MusicBackendMpd mpdBackend = new MusicBackendMpd();
            final List<Song> allSongs = mpdBackend.getAllSongs();
            assertTrue(allSongs.size() > 0);
            System.out.println(allSongs.size());

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Test
    public void testRemoveSongFromQueue() {
        try {

            MusicBackendMpd mpdBackend = new MusicBackendMpd();
            Song newSong = mpdBackend.getUpcomingSongs().get(0);

            mpdBackend.removeSongFromQueue(newSong);

            assertFalse(mpdBackend.getUpcomingSongs().contains(newSong));
            System.out.printf(newSong.getFilename());
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Test
    public void testStopPlayback(){
        try {
            MusicBackendMpd mpdBackend = new MusicBackendMpd();
            mpdBackend.stopPlayback();

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }

    }

    @Test
    public void testStartPlayback(){
        try {
            MusicBackendMpd mpdBackend = new MusicBackendMpd();
            mpdBackend.startPlayback();

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }

    }

    @Test
    public void testNextSong(){
        try {
            MusicBackendMpd mpdBackend = new MusicBackendMpd();
            mpdBackend.nextSong();

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }

    }

    @Test
    public void testPreviousSong(){
        try {
            MusicBackendMpd mpdBackend = new MusicBackendMpd();
            mpdBackend.previousSong();

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }

    }

    @Test
    public void testPlayedSongs() {
        try {
            MusicBackendMpd mpdBackend = new MusicBackendMpd();
            final List<Song> playedSongs = mpdBackend.getPlayedSongs();

            assertNotEquals(0, playedSongs.size());
            System.out.println(playedSongs.size());

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Test
    public void testClearPlaylist(){
        try {
            MusicBackendMpd mpdBackend = new MusicBackendMpd();
            final int sizeBefore = mpdBackend.getUpcomingSongs().size();

            mpdBackend.clearQueue();

            final int sizeAfter = mpdBackend.getUpcomingSongs().size();

            assertTrue(sizeAfter < sizeBefore);
            assertTrue(sizeAfter == 0);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }

    }


}
