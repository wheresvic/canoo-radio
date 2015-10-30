package com.canoo.radio.server.musicbackend.mpd;

import com.canoo.radio.server.musicbackend.MusicBackend;
import com.canoo.radio.server.musicbackend.Song;
import com.canoo.radio.server.voting.VoteRepository;
import org.bff.javampd.MPD;
import org.bff.javampd.exception.MPDConnectionException;
import org.bff.javampd.exception.MPDDatabaseException;
import org.bff.javampd.exception.MPDPlayerException;
import org.bff.javampd.exception.MPDPlaylistException;
import org.bff.javampd.objects.MPDSong;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.net.UnknownHostException;
import java.util.List;

import static com.canoo.radio.server.musicbackend.mpd.MpdUtils.*;

@Service
class MusicBackendMpd implements MusicBackend {
    @Autowired
    private VoteRepository voteRepository;


    @Value("${mpd.host}")
    private String mpdHost;

    @Value("${mpd.port}")
    private int mpdPort;

    private MPD mpd;

    @PostConstruct
    private void initialize() throws UnknownHostException, MPDConnectionException {
        if (mpd == null) {
            mpd = new MPD.Builder().server(mpdHost).port(mpdPort).build();
        }
    }

    @Override
    public Song getCurrentSong() throws MPDPlayerException {
        MPDSong song = mpd.getPlayer().getCurrentSong();

        if (song != null)
            return convertMpdSongToSong(song, voteRepository);

        return null;
    }

    @Override
    public List<Song> getPlayedSongs() throws Exception {
        final List<MPDSong> songList = mpd.getPlaylist().getSongList();

        MPDSong current = mpd.getPlaylist().getCurrentSong();

        if (current != null) {
            final int currentIndex = songList.lastIndexOf(current);
            final List<MPDSong> playedSongs = songList.subList(0, currentIndex);
            return convertMpdSongListToSongList(playedSongs, voteRepository);
        }

        return convertMpdSongListToSongList(songList, voteRepository);
    }

    @Override
    public List<Song> getUpcomingSongs() throws MPDPlaylistException {
        final List<MPDSong> songList = mpd.getPlaylist().getSongList();

        MPDSong current = mpd.getPlaylist().getCurrentSong();

        if (current != null) {
            final int currentIndex = songList.lastIndexOf(current);
            final List<MPDSong> upcomingSongs = songList.subList(currentIndex + 1, songList.size());
            return convertMpdSongListToSongList(upcomingSongs, voteRepository);
        }

        return convertMpdSongListToSongList(songList, voteRepository);
    }

    @Override
    public List<Song> getAllSongs() throws MPDDatabaseException {
        return convertMpdSongListToSongList(mpd.getDatabase().listAllSongs(), voteRepository);
    }

    @Override
    public List<Song> searchSongs(String query) throws Exception {
        return convertMpdSongListToSongList(mpd.getDatabase().searchAny(query), voteRepository);
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
        if (mpdSong != null) {
            mpd.getPlaylist().addSong(mpdSong);
        }
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
