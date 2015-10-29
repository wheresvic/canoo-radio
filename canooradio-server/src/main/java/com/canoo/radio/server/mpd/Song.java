package com.canoo.radio.server.mpd;

public class Song {

    private String title;
    private String filename;

    public Song(String title, String filename) {
        this.title = title;
        this.filename = filename;
    }

    public String getTitle() {
        return title;
    }

    public String getFilename() {
        return filename;
    }
}
