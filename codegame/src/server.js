import path from 'path';
var Server = require('http').Server;
import Express from 'express';
import React from 'react';
var renderToString = require('react-dom/server').renderToString;
var reactRouter = require('react-router');
var match = reactRouter.match;
var RouterContext = reactRouter.RouterContext;
import routes from './routes';
import NotFoundPage from './components/NotFoundPage';

// initialize the server and configure support for ejs template
const app = new Express();
const server = new Server(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));

//The label value for the server
var serverLabelValue = '';

//Socket.io
var io = require('socket.io')(server);
io.on('connection', function (socket) {
	//Log to the console when a user connects and send the current label value
	console.log('User connected');
	socket.emit('init', serverLabelValue)
	
	//When the client changes the value of the input
	socket.on('client:input', function(data) {
		console.log('Recieved ' + data.value);
		serverLabelValue = data.value;
		socket.broadcast.emit('client:update-label', serverLabelValue);
	});
});


//Map server routes to React routes
app.get('*', (req, res) => {
		match(
			{ routes, location: req.url },
			(err, redirectLocation, renderProps) => {
				if (err) {
					return res.status(500).send(err.message);
				}
				
				if (redirectLocation) {
					return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
				}
				
				let markup;
				if (renderProps) {
					markup = renderToString(<RouterContext {...renderProps}/>);
				}
				else {
					markup = renderToString(<NotFoundPage/>);
					res.status(404);
				}
				
				return res.render('index', { markup });
			}
		);
});


//Node.js server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
	if (err) {
		return console.error(err);
	}
	console.info('Server running on http://localhost:' + port);
});