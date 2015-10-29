package com.canoo.radio.server.musicbackend.mpd;

import com.canoo.radio.server.musicbackend.Song;
import org.bff.javampd.objects.MPDSong;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

class MpdUtils {

    public static Song convertMpdSongToSong(MPDSong mpdSong) {
        Song song = new Song(mpdSong.getTitle(), mpdSong.getFile(), mpdSong.getId());
        return song;
    }

    public static List<Song> convertMpdSongListToSongList(Collection<MPDSong> mpdSongList) {
        List<Song> songList = new ArrayList<>();

        for (MPDSong mpdSong : mpdSongList) {
            songList.add(convertMpdSongToSong(mpdSong));
        }

        return songList;
    }

    public static MPDSong getMpdSong(String songFilename, Collection<MPDSong> allSongs) {
        return allSongs.stream().filter(s -> s.getFile().equals(songFilename)).findFirst().orElse(null);
    }
}
