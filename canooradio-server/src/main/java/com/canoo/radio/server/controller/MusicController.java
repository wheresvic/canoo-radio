package com.canoo.radio.server.controller;

import com.canoo.radio.server.musicbackend.MusicBackend;
import com.canoo.radio.server.musicbackend.Song;
import com.mpatric.mp3agic.ID3v2;
import com.mpatric.mp3agic.Mp3File;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

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
    public String handleFileUpload(@RequestParam("file") MultipartFile file) throws Exception{
        if (!file.isEmpty()) {
            byte[] bytes = file.getBytes();
            final File tempFile = File.createTempFile(UUID.randomUUID().toString(), ".mp3", new File(mpdFolder));
            try (BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(tempFile))) {
                stream.write(bytes);
            }

            final Mp3File mp3File = new Mp3File(tempFile);
            final ID3v2 id3v2Tag = mp3File.getId3v2Tag();
            if (mp3File.hasId3v2Tag() && !id3v2Tag.getTitle().isEmpty() && !id3v2Tag.getAlbum().isEmpty() && !id3v2Tag.getArtist().isEmpty()) {
                return "success";
            } else {
                tempFile.delete();
                throw new RuntimeException("Uploaded File has no or no valid Id3v2 Tags");
            }

        } else {
            throw new RuntimeException("Uploaded File was empty");
        }
    }
}
