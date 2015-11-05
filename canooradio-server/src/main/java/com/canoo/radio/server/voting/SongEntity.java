package com.canoo.radio.server.voting;


import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class SongEntity {

    @Id
    private String id;

    public SongEntity() {
    }

    public SongEntity(String fileName) {
        id = fileName;
    }

    public String getId() {
        return id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        final SongEntity that = (SongEntity) o;

        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }
}
