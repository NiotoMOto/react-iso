import path from 'path';
import express from 'express';
import http from 'http';

import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import {routes} from './routes'
// import { routes } from './routes';


const webpack = require('webpack');
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';


const config = require('./webpack.config');
const compiler = webpack(config);

const app = express();

const port = 3000;

const middleware = webpackMiddleware(compiler, {
    hot: true,
    inline: true,
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
  }
});

app.set('view engine', 'ejs');

app.use(middleware);
app.use(webpackHotMiddleware(compiler));
app.use(express.static('public'));

app.use(function(req, res, next) {
    GLOBAL.navigator = {
        userAgent: req.headers['user-agent']
    }
    next();
});

app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirectLocation, props) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (props) {
      const markup = renderToString(<RoutingContext {...props} />);
      res.render('index.ejs', { markup })
    } else {
      res.sendStatus(404);
    }
  });
});

const server = http.createServer(app);
server.listen(3003);

server.on('listening', () => {

  console.log('Listening on 3003');

});
