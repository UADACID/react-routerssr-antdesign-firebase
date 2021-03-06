// This file will be use on the client and on the server
import React, { Component } from 'react';
import { IndexRoute, Route, Link, browserHistory } from 'react-router';
import { ReactRouterSSR } from 'meteor/reactrouter:react-router-ssr';
import App from './both/scenes/app';
import Home from './both/scenes/Home';
import Category from './both/scenes/Category';
import Product from './both/scenes/Product';
import Notification from './both/scenes/Notification';
import Transaction from './both/scenes/Transaction';
import AddCategory from './both/scenes/category/Add';
import UpdateCategory from './both/scenes/category/Update';
import ReadCategory from './both/scenes/category/Read';
import ReadTransaction from './both/scenes/transaction/Read';
import ReactHelmet from 'react-helmet';
import ReactCookie from 'react-cookie';
/// Collections
Items = new Mongo.Collection('items');

Meteor.startup( function() {
  AppRoutes = (
    <Route history={browserHistory}>
      <Route path="/login" component={Home} />
      <Route component={App}>
        <Route path="/" component={Home} />
        <Route path="/product" component={Product} />
        <Route path="/category" component={Category} />
          <Route exact={true} path="/category/add" component={AddCategory}/>
          <Route exact={true} path="/category/read/:id" component={ReadCategory}/>
          <Route exact={true} path="/category/update/:id" component={UpdateCategory}/>
        <Route path="/transaction" component={Transaction} />
          <Route exact={true} path="/transaction/read/:id" component={ReadTransaction}/>
        <Route path="/notification" component={Notification} />
      </Route>
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
