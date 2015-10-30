package com.canoo.radio.server.controller;

import com.canoo.radio.server.musicbackend.MusicBackend;
import com.canoo.radio.server.musicbackend.Song;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/music")
public class MusicController {

    @Autowired
    MusicBackend musicBackend;

    @Value("${mpd.folder}")
    private String mpdFolder;

    @RequestMapping("/search")
    public List<Song> searchMusic(@RequestParam("query") String query) throws Exception {
        return musicBackend.searchSongs(query);
    }

    @RequestMapping("/random")
    public List<Song> getRandomSongs(@RequestParam("limit") int limit) throws Exception {
        final List<Song> randomSongs = musicBackend.getAllSongs();
        Collections.shuffle(randomSongs);

        return randomSongs.subList(0, limit - 1);
    }

    @ResponseBody
    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public String handleFileUpload(@RequestParam("name") String name, @RequestParam("file") MultipartFile file) {
        if (!file.isEmpty()) {
            try {
                byte[] bytes = file.getBytes();
                final File mp3File = new File(mpdFolder + "/" + name);
                try (BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(mp3File))) {
                    stream.write(bytes);
                }
                musicBackend.updateDatabase();

                return "You successfully uploaded " + name + "!";
            } catch (Exception e) {
                return "You failed to upload " + name + " => " + e.getMessage();
            }
        } else {
            return "You failed to upload " + name + " because the file was empty.";
        }
    }
}
