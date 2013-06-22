define([
  // Application.
  //"app",
  //"text!templates/home.html"
  "app",
  "backbone"
],

function(app,/* template*/Backbone) {

  return Backbone.Model.extend({
    defaults: {
      "displayName": "",
      "image": {"url": ""},
      "gender":"",
      "aboutMe":"",
      "birthday": ""
    },
    url: function(){
      return "https://www.googleapis.com/plus/v1/people/" + this.get('id');
    },
    sync: function(method, model, options){
      options.timeout = 10000;
      //options.dataType = "jsonp";
      options.headers = {
        'Authorization': 'Bearer ' + app.google_auth.access_token
      };
      return Backbone.sync(method, model, options);
    },
    /*parse: function(response) {
      console.log(response);
      return response;
    },*/
    initialize : function(data, options){
      this.options = options;
    }

  });

});
