#alert-view-container {
  position: fixed;
  z-index: 10000;
  top: 110px;
  right: 30px;
  max-width: 250px;
  height: auto; }
  #alert-view-container button {
    margin-left: 10px; }

table.playlist td {
  vertical-align: middle !important; }

table.playlist td.voting {
  background-color: #e3e7e4; }

table.playlist tr.played {
  color: #aaa; }
  table.playlist tr.played i:hover {
    color: #f6b8c5; }
  table.playlist tr.played i.voted {
    color: #62494e; }

table.playlist .votes {
  vertical-align: middle;
  margin-left: 3px;
  font-weight: bold;
  font-family: cursive; }

table.playlist tr.current {
  background-color: #62494e;
  color: #fdfdfd; }

.nav-tabs > li > a {
  color: #999; }

.on-air-background {
  padding: 200px 0 60px;
  color: #fdfdfd;
  background-image: url("/img/onair.jpg") !important;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover; }

.on-air-background h2.slogan {
  color: #fff;
  font-size: 48px;
  font-weight: 900; }

/* inner heading */
.on-air-background.inner {
  background: #eee;
  padding: 150px 0 50px; }

#music-browser {
  margin-top: 20px; }

#browser-tab input[type=text] {
  width: 100%;
  background: #e3e7e4;
  font-family: 'Open Sans', sans serif;
  border: 0;
  font-size: 14px;
  text-align: left;
  vertical-align: middle;
  padding: 0 10px; }

#browser-tab input[type=text]:focus {
  background: #656a64;
  color: #eff1ef;
  box-shadow: none;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  transition: background 0.25 ease-in;
  -moz-transition: background 0.25 ease-in;
  -webkit-transition: background 0.25 ease-in; }

#drop-files {
  width: 100%;
  height: 125px;
  background: #62494e;
  opacity: 0.5;
  border: 4px dashed #777;
  font-size: 2em;
  float: left;
  font-weight: bold;
  margin: 0 20px 20px 0;
  text-align: center;
  padding-top: 1.5em; }
  #drop-files:hover {
    opacity: 1; }

#mask {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1035;
  width: 100%;
  height: 100%;
  display: none; }

#relax-overlay {
  height: 80%;
  width: 80%;
  margin-top: 100px;
  display: none;
  position: absolute;
  color: black;
  background: white;
  top: 5%;
  left: 10%;
  z-index: 1040;
  /* CSS 3 */
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -o-border-radius: 10px;
  border-radius: 10px;
  overflow: hidden; }
  #relax-overlay .matter:nth-of-type(1) {
    border: 1px solid #222;
    border-radius: 5.05px;
    height: 5.05px;
    width: 5.05px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -2.5px;
    margin-left: -2.5px;
    animation: spin 0.5s linear infinite; }
  #relax-overlay .matter:nth-of-type(1):after {
    content: '';
    display: block;
    width: 5px;
    height: 5px;
    background: #9b7b4b;
    border-radius: 2.5px;
    position: absolute;
    right: 50%;
    margin-right: -2.5px;
    margin-top: -2.5px;
    box-shadow: inset 1px 2px 1px #000; }
  #relax-overlay .matter:nth-of-type(2) {
    border: 1px solid #222;
    border-radius: 20.2px;
    height: 20.2px;
    width: 20.2px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -10px;
    margin-left: -10px;
    animation: spin 1s linear infinite; }
  #relax-overlay .matter:nth-of-type(2):after {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    background: #8b9b4b;
    border-radius: 5px;
    position: absolute;
    right: 50%;
    margin-right: -5px;
    margin-top: -5px;
    box-shadow: inset 1px 2px 2px #000; }
  #relax-overlay .matter:nth-of-type(3) {
    border: 1px solid #222;
    border-radius: 45.45px;
    height: 45.45px;
    width: 45.45px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -22.5px;
    margin-left: -22.5px;
    animation: spin 1.5s linear infinite; }
  #relax-overlay .matter:nth-of-type(3):after {
    content: '';
    display: block;
    width: 15px;
    height: 15px;
    background: #5b9b4b;
    border-radius: 7.5px;
    position: absolute;
    right: 50%;
    margin-right: -7.5px;
    margin-top: -7.5px;
    box-shadow: inset 1px 2px 3px #000; }
  #relax-overlay .matter:nth-of-type(4) {
    border: 1px solid #222;
    border-radius: 80.8px;
    height: 80.8px;
    width: 80.8px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -40px;
    margin-left: -40px;
    animation: spin 2s linear infinite; }
  #relax-overlay .matter:nth-of-type(4):after {
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    background: #4b9b6b;
    border-radius: 10px;
    position: absolute;
    right: 50%;
    margin-right: -10px;
    margin-top: -10px;
    box-shadow: inset 1px 2px 4px #000; }
  #relax-overlay .matter:nth-of-type(5) {
    border: 1px solid #222;
    border-radius: 126.25px;
    height: 126.25px;
    width: 126.25px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -62.5px;
    margin-left: -62.5px;
    animation: spin 2.5s linear infinite; }
  #relax-overlay .matter:nth-of-type(5):after {
    content: '';
    display: block;
    width: 25px;
    height: 25px;
    background: #4b9b9b;
    border-radius: 12.5px;
    position: absolute;
    right: 50%;
    margin-right: -12.5px;
    margin-top: -12.5px;
    box-shadow: inset 1px 2px 5px #000; }
  #relax-overlay .matter:nth-of-type(6) {
    border: 1px solid #222;
    border-radius: 181.8px;
    height: 181.8px;
    width: 181.8px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -90px;
    margin-left: -90px;
    animation: spin 3s linear infinite; }
  #relax-overlay .matter:nth-of-type(6):after {
    content: '';
    display: block;
    width: 30px;
    height: 30px;
    background: #4b6b9b;
    border-radius: 15px;
    position: absolute;
    right: 50%;
    margin-right: -15px;
    margin-top: -15px;
    box-shadow: inset 1px 2px 6px #000; }
  #relax-overlay .matter:nth-of-type(7) {
    border: 1px solid #222;
    border-radius: 247.45px;
    height: 247.45px;
    width: 247.45px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -122.5px;
    margin-left: -122.5px;
    animation: spin 3.5s linear infinite; }
  #relax-overlay .matter:nth-of-type(7):after {
    content: '';
    display: block;
    width: 35px;
    height: 35px;
    background: #5b4b9b;
    border-radius: 17.5px;
    position: absolute;
    right: 50%;
    margin-right: -17.5px;
    margin-top: -17.5px;
    box-shadow: inset 1px 2px 7px #000; }
  #relax-overlay .matter:nth-of-type(8) {
    border: 1px solid #222;
    border-radius: 323.2px;
    height: 323.2px;
    width: 323.2px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -160px;
    margin-left: -160px;
    animation: spin 4s linear infinite; }
  #relax-overlay .matter:nth-of-type(8):after {
    content: '';
    display: block;
    width: 40px;
    height: 40px;
    background: #8b4b9b;
    border-radius: 20px;
    position: absolute;
    right: 50%;
    margin-right: -20px;
    margin-top: -20px;
    box-shadow: inset 1px 2px 8px #000; }
  #relax-overlay .matter:nth-of-type(9) {
    border: 1px solid #222;
    border-radius: 409.05px;
    height: 409.05px;
    width: 409.05px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -202.5px;
    margin-left: -202.5px;
    animation: spin 4.5s linear infinite; }
  #relax-overlay .matter:nth-of-type(9):after {
    content: '';
    display: block;
    width: 45px;
    height: 45px;
    background: #9b4b7b;
    border-radius: 22.5px;
    position: absolute;
    right: 50%;
    margin-right: -22.5px;
    margin-top: -22.5px;
    box-shadow: inset 1px 2px 9px #000; }
  #relax-overlay .matter:nth-of-type(10) {
    border: 1px solid #222;
    border-radius: 505px;
    height: 505px;
    width: 505px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -250px;
    margin-left: -250px;
    animation: spin 5s linear infinite; }
  #relax-overlay .matter:nth-of-type(10):after {
    content: '';
    display: block;
    width: 50px;
    height: 50px;
    background: #9b4b4b;
    border-radius: 25px;
    position: absolute;
    right: 50%;
    margin-right: -25px;
    margin-top: -25px;
    box-shadow: inset 1px 2px 10px #000; }
  #relax-overlay .matter:nth-of-type(11) {
    border: 1px solid #222;
    border-radius: 611.05px;
    height: 611.05px;
    width: 611.05px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -302.5px;
    margin-left: -302.5px;
    animation: spin 5.5s linear infinite; }
  #relax-overlay .matter:nth-of-type(11):after {
    content: '';
    display: block;
    width: 55px;
    height: 55px;
    background: #9b7b4b;
    border-radius: 27.5px;
    position: absolute;
    right: 50%;
    margin-right: -27.5px;
    margin-top: -27.5px;
    box-shadow: inset 1px 2px 11px #000; }
  #relax-overlay .matter:nth-of-type(12) {
    border: 1px solid #222;
    border-radius: 727.2px;
    height: 727.2px;
    width: 727.2px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -360px;
    margin-left: -360px;
    animation: spin 6s linear infinite; }
  #relax-overlay .matter:nth-of-type(12):after {
    content: '';
    display: block;
    width: 60px;
    height: 60px;
    background: #8b9b4b;
    border-radius: 30px;
    position: absolute;
    right: 50%;
    margin-right: -30px;
    margin-top: -30px;
    box-shadow: inset 1px 2px 12px #000; }
  #relax-overlay .matter:nth-of-type(13) {
    border: 1px solid #222;
    border-radius: 853.45px;
    height: 853.45px;
    width: 853.45px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -422.5px;
    margin-left: -422.5px;
    animation: spin 6.5s linear infinite; }
  #relax-overlay .matter:nth-of-type(13):after {
    content: '';
    display: block;
    width: 65px;
    height: 65px;
    background: #5b9b4b;
    border-radius: 32.5px;
    position: absolute;
    right: 50%;
    margin-right: -32.5px;
    margin-top: -32.5px;
    box-shadow: inset 1px 2px 13px #000; }
  #relax-overlay .matter:nth-of-type(14) {
    border: 1px solid #222;
    border-radius: 989.8px;
    height: 989.8px;
    width: 989.8px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -490px;
    margin-left: -490px;
    animation: spin 7s linear infinite; }
  #relax-overlay .matter:nth-of-type(14):after {
    content: '';
    display: block;
    width: 70px;
    height: 70px;
    background: #4b9b6b;
    border-radius: 35px;
    position: absolute;
    right: 50%;
    margin-right: -35px;
    margin-top: -35px;
    box-shadow: inset 1px 2px 14px #000; }
  #relax-overlay .matter:nth-of-type(15) {
    border: 1px solid #222;
    border-radius: 1136.25px;
    height: 1136.25px;
    width: 1136.25px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -562.5px;
    margin-left: -562.5px;
    animation: spin 7.5s linear infinite; }
  #relax-overlay .matter:nth-of-type(15):after {
    content: '';
    display: block;
    width: 75px;
    height: 75px;
    background: #4b9b9b;
    border-radius: 37.5px;
    position: absolute;
    right: 50%;
    margin-right: -37.5px;
    margin-top: -37.5px;
    box-shadow: inset 1px 2px 15px #000; }

@keyframes spin {
  to {
    transform: rotate(360deg); } }

.display-overlay {
  display: block !important;
  opacity: 1; }

.animate-enter,
.animate-leave {
  -webkit-transition: 1075ms cubic-bezier(0.25, 0.25, 0.75, 0.75) all;
  -moz-transition: 1075ms cubic-bezier(0.25, 0.25, 0.75, 0.75) all;
  -ms-transition: 1075ms cubic-bezier(0.25, 0.25, 0.75, 0.75) all;
  -o-transition: 1075ms cubic-bezier(0.25, 0.25, 0.75, 0.75) all;
  transition: 1075ms cubic-bezier(0.25, 0.25, 0.75, 0.75) all;
  position: relative;
  display: block;
  overflow: hidden;
  text-overflow: clip;
  white-space: nowrap; }

.animate-leave.animate-leave-active,
.animate-enter {
  opacity: 0;
  width: 0px;
  height: 0px; }

.animate-enter.animate-enter-active,
.animate-leave {
  opacity: 1;
  width: 150px;
  height: 30px; }
