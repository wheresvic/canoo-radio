
# Setup

```
sudo npm install -g browserify
sudo npm install -g clean-css
sudo npm install -g uglifyjs
sudo npm install -g nodemon
sudo npm install -g envify
```

npm install

# runnning

```
npm run watch-js
```

This will dist the combined `app.js` under the `public/dist/` folder. Then 

```
cd public
python -m SimpleHTTPServer
```

to run a browser instance which can serve the frontend.

# TODO

set up a simple node.js server with CORS :)

