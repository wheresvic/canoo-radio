* Setup MPD 

- Install mpd with your packagemanger

- Configure mpd in ``/etc/mpd.conf`` 
-- ``bind_to_address "::"``
--  ``
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
``

- Install icecast with your packagemanager
- Configure icecast in ``/etc/icecast2/icecast.xml``
-- ``
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
 ``
