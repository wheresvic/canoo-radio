package com.canoo.radio.server.voting;


import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class SongEntity {

    @Id
    private String id;

    SongEntity() {
    }

    public SongEntity(String fileName) {
        id = fileName;
    }

    public String getId() {
        return id;
    }
}
