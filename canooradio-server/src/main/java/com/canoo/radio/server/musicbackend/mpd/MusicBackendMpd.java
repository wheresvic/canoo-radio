package com.canoo.radio.server.musicbackend.mpd;

import com.canoo.radio.server.musicbackend.MusicBackend;
import com.canoo.radio.server.musicbackend.Song;
import org.bff.javampd.MPD;
import org.bff.javampd.exception.MPDConnectionException;
import org.bff.javampd.exception.MPDDatabaseException;
import org.bff.javampd.exception.MPDPlayerException;
import org.bff.javampd.exception.MPDPlaylistException;
import org.bff.javampd.objects.MPDSong;
import org.springframework.stereotype.Service;

import java.net.UnknownHostException;
import java.util.List;

import static com.canoo.radio.server.musicbackend.mpd.MpdUtils.*;

@Service
class MusicBackendMpd implements MusicBackend {
    private MPD mpd;

    public MusicBackendMpd() throws UnknownHostException, MPDConnectionException {
        mpd = new MPD.Builder().server("10.0.1.24").port(6600).build();
    }

    @Override
    public Song getCurrentSong() throws MPDPlayerException {
        return convertMpdSongToSong(mpd.getPlayer().getCurrentSong());
    }

    @Override
    public List<Song> getPlayedSongs() throws Exception {
        final List<MPDSong> songList = mpd.getPlaylist().getSongList();
        final int currentIndex = songList.indexOf(mpd.getPlaylist().getCurrentSong());
        final List<MPDSong> playedSongs = songList.subList(0, currentIndex);
        return convertMpdSongListToSongList(playedSongs);
    }

    @Override
    public List<Song> getUpcomingSongs() throws MPDPlaylistException {
        final List<MPDSong> songList = mpd.getPlaylist().getSongList();
        final int currentIndex = songList.indexOf(mpd.getPlaylist().getCurrentSong());
        final List<MPDSong> upcomingSongs = songList.subList(currentIndex + 1, songList.size());
        return convertMpdSongListToSongList(upcomingSongs);
    }

    @Override
    public List<Song> getAllSongs() throws MPDDatabaseException {
        return convertMpdSongListToSongList(mpd.getDatabase().listAllSongs());
    }

    @Override
    public void removeSongFromQueue(Song song) throws Exception {
        final MPDSong mpdSong = getMpdSong(song.getId(), mpd.getDatabase().listAllSongs());
        mpd.getPlaylist().removeSong(mpdSong);
    }

    @Override
    public void addSongToQueue(Song song) throws MPDDatabaseException, MPDPlaylistException {
        MPDSong mpdSong = getMpdSong(song.getId(), mpd.getDatabase().listAllSongs());
        mpd.getPlaylist().addSong(mpdSong);
    }

    @Override
    public void addSongToQueue(String fileName) throws Exception {
        final MPDSong mpdSong = getMpdSong(fileName, mpd.getDatabase().listAllSongs());
        mpd.getPlaylist().addSong(mpdSong);
    }

    @Override
    public void startPlayback() throws MPDPlayerException {
        mpd.getPlayer().play();
    }

    @Override
    public void stopPlayback() throws MPDPlayerException {
        mpd.getPlayer().stop();
    }

    @Override
    public void nextSong() throws MPDPlayerException {
        mpd.getPlayer().playNext();
    }

    @Override
    public void previousSong() throws MPDPlayerException {
        mpd.getPlayer().playPrev();
    }

    @Override
    public void clearQueue() throws Exception {
        mpd.getPlaylist().clearPlaylist();
    }

    @Override
    public void updateDatabase() throws Exception {
        mpd.getAdmin().updateDatabase();
    }
}
