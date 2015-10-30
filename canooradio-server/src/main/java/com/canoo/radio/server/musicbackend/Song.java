package com.canoo.radio.server.musicbackend;

public class Song {

    private final String id;
    private final String artist;
    private final String song;
    private final String album;
    private int votes;

    public Song(String id, String artist, String song, String album, int votes) {
        this.id = id;
        this.artist = artist;
        this.song = song;
        this.album = album;
        this.votes = votes;
    }

    public String getId() {
        return id;
    }

    public String getArtist() {
        return artist;
    }

    public String getSong() {
        return song;
    }

    public String getAlbum() {
        return album;
    }

    public int getVotes() {
        return votes;
    }
}
