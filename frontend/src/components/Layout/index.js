import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../Header';

import Home from '../../screens/Home.js';
import Post from '../../screens/Post.js';
import PostDetail from '../../screens/PostDetail.js';

const Layout = () => {
    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/createPost" component={Post} />
                <Route exact path="/post/:id" component={PostDetail} />
            </Switch>
        </Router>
    );
};

export default Layout;