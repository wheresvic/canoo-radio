
# Setup

```
sudo npm install -g browserify
sudo npm install -g clean-css
sudo npm install -g uglifyjs
sudo npm install -g nodemon
sudo npm install -g envify
sudo npm install -g node-sass
```

npm install

# running

```
npm run all
```

This will dist the combined `app.js` under the `public/dist/` folder and the `canooradio.css` to the dist folder as well. Changes to the `js` folder and the `sass` folder are watched via nodemon

```
node canooradio.js
```

to run a server which can serve the frontend. Note that if you are developing locally then the api needs to be located at `localhost:8080`. This can be found under `app.config.serverBaseUrl`

