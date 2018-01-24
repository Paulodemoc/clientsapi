var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Clients = require('./api/models/clientsModel'),
    Phones = require('./api/models/phonesModel'),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Clientsdb');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var routes = require('./api/routes/clientsRoutes');
routes(app);
routes = require('./api/routes/phonesRoutes');
routes(app);

app.use(function (req, res) {
    res.status(404).send({
        url: req.originalUrl + ' not found'
    })
});

app.listen(port);

console.log('Clients API server started on: ' + port);