'use strict';

var Item = require('../../models/item');

exports.register = function(server, options, next){

  server.route({
    method: 'DELETE',
    path: '/items/{itemId}',
    config: {
      description: 'Eliminates item',
      handler: function(request, reply){
        Item.findOne({_id: request.params.itemId, userId: request.auth.credentials.d.uid}, function(err, item){
          if(err){return reply(err).code(400);}
          item.remove(function(){
            return reply(item);
          });
        });
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'items.destroy'
};
