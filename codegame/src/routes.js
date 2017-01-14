'use strict';

import React from 'react';
var reactRouter = require('react-router');
var Route = reactRouter.Route;
var IndexRoute = reactRouter.IndexRoute;

import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import Input from './components/Input';
import NotFoundPage from './components/NotFoundPage';


const routes = (
	<Route path='/' component={Layout}>
		<IndexRoute component={IndexPage}/>
		<Route path="/input" component={Input}/>
		<Route path="*" component={NotFoundPage}/>
	</Route>
);

export default routes;