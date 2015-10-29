package com.canoo.radio.server.mpd;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SongRestController {

    @RequestMapping("/song")
    public Song getSong(@RequestParam(value = "name", defaultValue = "DefaultName") String name) {
        return new Song(name + " yehe", "a file name for " + name);
    }

}