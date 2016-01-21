
# on the server the bin is called nodejs

export NODE_ENV=production
npm run build-js
npm run build-sass

forever stop radio.js
forever start radio.js
