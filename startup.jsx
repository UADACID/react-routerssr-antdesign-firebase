// This file will be use on the client and on the server
import React, { Component } from 'react';
import { IndexRoute, Route, Link } from 'react-router';
import { ReactRouterSSR } from 'meteor/reactrouter:react-router-ssr';
import App from './both/scenes/app';
import Home from './both/scenes/home';
import Another from './both/scenes/another';
import ReactHelmet from 'react-helmet';
import ReactCookie from 'react-cookie';
/// Collections
Items = new Mongo.Collection('items');

Meteor.startup( function() {
  AppRoutes = (
      <Route component={App}>
        <Route path="/" component={Home} />
        <Route path="/another" component={Another} />
      </Route>
  );

  ReactRouterSSR.Run(AppRoutes, {
  props: {
    onUpdate() {
      // Notify the page has been changed to Google Analytics
      // ga('send', 'pageview');
    },
  }
}, {
    htmlHook(html) {
      const head = ReactHelmet.rewind();
      return html.replace('<head>', '<head>' + head.title + head.base + head.meta + head.link + head.script);
    },
    preRender: function(req, res) {
      ReactCookie.plugToRequest(req, res);
    }
  });
});
