package com.canoo.radio.server.musicbackend;

public class Song {

    private String title;
    private String filename;
    private int id;

    public Song(String title, String filename, int id) {
        this.title = title;
        this.filename = filename;
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public String getFilename() {
        return filename;
    }
}
