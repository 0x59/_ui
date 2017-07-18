const express = require('express');
const path = require('path');

const app = express();
const publicPath = path.resolve(__dirname, 'public');	

app.use(express.static(publicPath));

app.use(/\/.+/, function(req, res) {
	res.redirect('/');
});

app.listen(4000);
