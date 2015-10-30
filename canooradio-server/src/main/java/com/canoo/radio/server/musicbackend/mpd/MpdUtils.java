package com.canoo.radio.server.musicbackend.mpd;

import com.canoo.radio.server.musicbackend.Song;
import com.canoo.radio.server.voting.VoteRepository;
import org.bff.javampd.objects.MPDSong;

import java.util.Collection;
import java.util.List;

import static java.util.stream.Collectors.toList;

class MpdUtils {

    public static Song convertMpdSongToSong(MPDSong mpdSong, VoteRepository voteRepository) {
        final int votes = voteRepository.findBySongFilename(mpdSong.getFile()).stream().mapToInt(v -> v.getValue().getValue()).sum();
        Song song = new Song(mpdSong.getFile(), mpdSong.getArtistName(), mpdSong.getTitle(), mpdSong.getArtistName(), votes);
        return song;
    }

    public static List<Song> convertMpdSongListToSongList(Collection<MPDSong> mpdSongList, VoteRepository voteRepository) {
        return mpdSongList.stream().map(mpdSong -> convertMpdSongToSong(mpdSong, voteRepository)).collect(toList());
    }

    public static MPDSong getMpdSong(String fileName, Collection<MPDSong> allSongs) {
        return allSongs.stream().filter(s -> s.getFile().equals(fileName)).findFirst().orElseGet(null); //Get Lastone
    }
}
