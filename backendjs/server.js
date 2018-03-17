const Hapi = require('hapi');
var lynx = require('lynx');

const server = new Hapi.Server();
server.connection({ port: 8066 });
var metrics = new lynx('telegraf', 8125);


server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Selam dokka3');
    }
});
server.route({
    method: 'GET',
    path: '/click/{carmodel}',
    handler: function (request, reply) {
    	metrics.increment(encodeURIComponent(request.params.carmodel));
        reply('${encodeURIComponent(request.params.carmodel)} clicked');
    }
});

server.start((err) => {

    if (err)
        throw err;

    console.log('Server running at:', server.info.uri);
});
