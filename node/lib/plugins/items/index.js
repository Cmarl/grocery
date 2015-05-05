'use strict';

var Item = require('../../models/item');

exports.register = function(server, options, next){

  server.route({
    method: 'GET',
    path: '/items',
    config: {
      description: 'Gets all items',
      handler: function(request, reply){
        Item.find({userId: request.auth.credentials.d.uid}, function(err,items){
          return reply({items: items});
        });
      }
    }
  });
  return next();
};
exports.register.attributes = {
  name: 'items.index'
};
