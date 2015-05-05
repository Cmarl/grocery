'use strict';

var Item = require('../../models/item');

exports.register = function(server, options, next){

  server.route({
    method: 'PUT',
    path: '/items',
    config: {
      description: 'Updates item',
      handler: function(request, reply){
        Item.findOne({_id: request.payload._id, userId: request.auth.credentials.d.uid}, function(err, item){
          if(err){
            return reply(err).code(400);
          }
          item.done = request.payload.done;
          item.photo = request.payload.photo;
          item.name = request.payload.name;
          item.department = request.payload.department;
          item.qty = request.payload.qty;
          item.priority = request.payload.priority;
          item.createdAt = request.payload.createdAt;
          item.save(function(){
            return reply(item);
          });
        });
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'items.update'
};
