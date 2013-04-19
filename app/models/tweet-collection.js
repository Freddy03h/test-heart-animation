define([
  // Application.
  //"app",
  //"text!templates/home.html"
  "backbone"
],

function(/*app, template*/Backbone) {

  return Backbone.Collection.extend({
    url: "http://search.twitter.com/search.json?q=javascript",
    sync: function(method, model, options){
      options.timeout = 10000;
      options.dataType = "jsonp";
      return Backbone.sync(method, model, options);
    },
    parse: function(response) {
        return response.results;
    },
    initialize : function(){
    }

  });

});
