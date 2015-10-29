package com.canoo.radio.server;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class Mp3UploadController {

    @Value("${mpd.folder}")
    private String mpdFolder;

    @ResponseBody
    @RequestMapping(value = "/uploadMp3", method = RequestMethod.POST)
    public String handleFileUpload(@RequestParam("name") String name, @RequestParam("file") MultipartFile file) {
        if (!file.isEmpty()) {
            try {
                byte[] bytes = file.getBytes();
                final File mp3File = new File(mpdFolder + "/" + name);
                try (BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(mp3File))) {
                    stream.write(bytes);
                }
                return "You successfully uploaded " + name + "!";
            } catch (Exception e) {
                return "You failed to upload " + name + " => " + e.getMessage();
            }
        } else {
            return "You failed to upload " + name + " because the file was empty.";
        }
    }
}
