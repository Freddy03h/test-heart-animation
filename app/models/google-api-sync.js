define([
  // Application.
  //"app",
  //"text!templates/home.html"
  "app",
  "backbone"
],

function(app,/* template*/Backbone) {

  return function(method, model, options){
    options.timeout = 10000;
    //options.dataType = "jsonp";
    options.headers = {
      'Authorization': 'Bearer ' + app.google_auth.access_token
    };
    options.error = function( jqXHR, textStatus, errorThrown ){
      if(jqXHR.status === 401){
        app.router.navigate("/login", {trigger: true});
      }
    };
    return Backbone.sync(method, model, options);
  };

});
