'use strict';

var User = require('../../models/user');

exports.register = function(server, options, next){
  server.route({
    method: 'POST',
    path: '/users',
    config: {
      description: 'Create or update a user',
      handler: function(request, reply){
        if(request.auth.credentials._id){return reply();}
        var user = new User();
        user.firebaseId = request.auth.credentials.d.uid;
        user.save(function(err){
          if (err) { return reply().code(400); }
          return reply();
        });
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'users.create'
};
