define([
  // Application.
  //"app",
  //"text!templates/home.html"
  "app",
  "backbone"
],

function(app,/* template*/Backbone) {

  return Backbone.Collection.extend({
    url: function(){
      console.log(this.options);
      return "https://api.twitter.com/1.1/search/tweets.json?"+ $.param(this.options);
    },
    sync: function(method, model, options){
      options.timeout = 10000;
      //options.dataType = "jsonp";
      options.headers = {
        'Authorization': 'Bearer ' + app.bearer_token
      };
      return Backbone.sync(method, model, options);
    },
    parse: function(response) {
        return response.results;
    },
    initialize : function(data, options){
      this.options = options;
    }

  });

});
