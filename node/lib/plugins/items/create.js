'use strict';

var Item = require('../../models/item');

exports.register = function(server, options, next){

  server.route({
    method: 'POST',
    path: '/items',
    config: {
      description: 'Creates item',
      handler: function(request, reply){
        var item = new Item(request.payload);
        item.userId = request.auth.credentials.d.uid;
        item.save(function(err){
          if(err){
            console.log(err);
          }
          return reply(item);
        });
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'items.create'
};
