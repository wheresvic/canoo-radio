package com.canoo.radio.server;

import com.canoo.radio.server.musicbackend.MusicBackend;
import com.canoo.radio.server.musicbackend.Song;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MusicBackendController {

    @Autowired
    private MusicBackend musicBackend;

    @RequestMapping("/song")
    public Song getSong(@RequestParam(value = "name", defaultValue = "DefaultName") String name) {
        return new Song(name + " yehe", "a file name for " + name, 5);
    }

}
