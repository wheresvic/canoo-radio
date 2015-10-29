package com.canoo.radio.server.musicbackend.mpd;

import com.canoo.radio.server.musicbackend.Song;
import org.bff.javampd.objects.MPDSong;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

class MpdUtils {

    public static Song convertMpdSongToSong(MPDSong mpdSong) {
        Song song = new Song(mpdSong.getId(), mpdSong.getArtistName(), mpdSong.getTitle(), mpdSong.getArtistName());
        return song;
    }

    public static List<Song> convertMpdSongListToSongList(Collection<MPDSong> mpdSongList) {
        List<Song> songList = new ArrayList<>();

        for (MPDSong mpdSong : mpdSongList) {
            songList.add(convertMpdSongToSong(mpdSong));
        }

        return songList;
    }

    public static MPDSong getMpdSong(int id, Collection<MPDSong> allSongs) {
        return allSongs.stream().filter(s -> s.getId() == id).findFirst().orElseGet(null); //Get Lastone
    }
}
