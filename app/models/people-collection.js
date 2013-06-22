define([
  // Application.
  //"app",
  //"text!templates/home.html"
  "app",
  "backbone",
  "models/google-api-sync",
  "models/person-model"
],

function(app,/* template*/Backbone, ApiSync, PersonModel) {

  return Backbone.Collection.extend({
    /*url: function(){
      console.log(this.options);
      return "https://www.googleapis.com/plus/v1/people/me";
    },*/
    model: PersonModel,
    url: 'https://www.googleapis.com/plus/v1/people/me/people/visible',
    sync: ApiSync,
    parse: function(response) {
      return response.items;
    },
    initialize : function(data, options){
      this.options = options;
    }

  });

});
