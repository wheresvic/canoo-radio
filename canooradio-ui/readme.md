
# Setup

## MPD

`sudo apt-get install mpd`. Configure mpd in `/etc/mpd.conf`

```
bind_to_address "::"

    audio_output {
     type            "shout"
     name            "Canoo Radio shoutcast"
     host            "localhost"
     port            "<PORT OF ICECAST>"
     mount           "<MOUNT OF ICECAST>"
     password        "<PASSWORD OF ICECAST>"
     bitrate         "128"
     format          "44100:16:2"
     encoding        "mp3"
   }
   audio_output {
          type "pulse"
          name "Canoo Radio RDP"
          sink "rtp"
   }
```

Install icecast via `sudo apt-get install icecast2`. Configure icecast in `/etc/icecast2/icecast.xml`

```
    <authentication>
        <source-password><PASSWORD OF ICECAST></source-password>
        <relay-password><PASSWORD OF ICECAST></relay-password>
        <admin-user>admin</admin-user>
        <admin-password><PASSWORD OF ICECAST></admin-password>
    </authentication>
    <listen-socket>
        <port><PORT OF ICECAST></port>
        <shoutcast-mount><MOUNT OF ICECAST></shoutcast-mount>
    </listen-socket>
```

Fix mpd ownership `sudo chown -R mpd /var/lib/mpd/music`

Check that the services are running:

```
sudo service mpd status
sudo service icecast2 status
```

mpd gui: `sudo apt-get install ario`

Set the relevant variables in `application.properties`. Note that mpd is listening on `6600` and icecast is listening on `4710` in the current setup. Can install `sonata` which is a gui that can connect to and manage(?) mpd.

## Project

```
sudo npm install -g browserify
sudo npm install -g clean-css
sudo npm install -g uglifyjs
sudo npm install -g nodemon
sudo npm install -g envify
sudo npm install -g node-sass
sudo npm install -g mocha
```

npm install

### running

```
npm run all
```

This will dist the combined `app.js` under the `public/dist/` folder and the `canooradio.css` to the dist folder as well. Changes to the `js` folder and the `sass` folder are watched via nodemon

```
node radio.js
```

to run a server which can serve the frontend. Note that if you are developing locally then the api needs to be located at `localhost:8080`. This can be found under `app.config.serverBaseUrl`

### Testing

```
mocha
```

to run tests located under the `tests` folder. Note that the mpd service needs to be running for the tests to pass!

