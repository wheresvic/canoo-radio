# Canoo Radio

Canoo Radio is a radio station based on mpd where listeners decide upon and vote on its content. It is a full fledged web application that comes with a Node.js server and an Angular.js front-end. Canoo radio also depends upon mpd to manage the song library + the playlist and Icecast to allow the output of mpd to be fed to an http audio streamng endpoint.

At the moment the entire development stack is setup on Linux with instructions provided here for installing mpd and icecast on debian based systems. Mac and windows users will need to figure out how to get mpd and icecast setup as the installation is different from that of linux. One option is to install mpd and icecast on a separate ubuntu machine and connect to the mpd server on it.

## Setup

### Installing mpd and icecast on linux

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

Note that mpd is listening on `6600` and icecast is listening on `4710` in the current setup. Can install `sonata` which is a gui that can connect to and manage(?) mpd.

## Project

Install global dependencies:

```
sudo npm install -g browserify
sudo npm install -g clean-css
sudo npm install -g uglifyjs
sudo npm install -g nodemon
sudo npm install -g envify
sudo npm install -g node-sass
sudo npm install -g mocha
sudo npm install -g forever
```

Install project dependencies via `npm install`.

### running

```
npm run build-js
npm run build-sass
```

This will dist the combined `app.js` under the `public/dist/` folder and the `canooradio.css` to the dist folder as well. You might need to create the `dist` folder as it is not checked in. `npm run all` will run in development mode where changes to the `js` folder and the `sass` folder are watched via nodemon.

```
node radio.js
```

to run the app. However in production you probably want to run node using a process manager like `forever`.

```
forever list
forever stop radio.js
forever start radio.js

```

### Testing

```
env ENV=test mocha test/test-mpd.js
env ENV=test mocha test/test-radio.js
env ENV=test mocha test/test-db-wrapper.js
mocha test/test-mpd-integration.js
```

to run tests located under the `tests` folder. Note that the `test` environment uses mock mpd data and if you'd like to test with the mpd service running then exclude the environment variable but then the expectations on tests will likely not pass :)

Note that the tests need to be run individually due to the file-based db
