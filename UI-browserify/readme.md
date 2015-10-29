
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
npm run watch-js
npm run watch-sass
```

This will dist the combined `app.js` under the `public/dist/` folder and the `watch-sass` task will dist the `canooradio.css` to the dist folder as well. 

```
node canooradio.js
```

to run a server which can serve the frontend.


