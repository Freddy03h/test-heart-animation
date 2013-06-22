define([
  // Application.
  "app",
  "text!templates/home.html",
  "text!templates/person-line.html"
],

function(app, template, templatePerson) {

  var PersonLine = Backbone.Marionette.ItemView.extend({
    template: templatePerson,
    tagName: "li",
    events:{
      'click': 'showPerson'
    },
    showPerson: function(e){
      app.appRegion.currentView.mainRegion.animation = "slideleft";
      app.router.navigate("/person-"+this.model.id, {trigger: true});
    }
  });

  return Backbone.Marionette.CompositeView.extend({
    tagName: "div",
    id:"home",
    className:"scrollable",
    template: template,
    itemView: PersonLine,
    itemViewContainer: "ul"
    /*events: {
      "click .reload-button": "reloadData"
    },
    initialize : function(e){
    },
    reloadData: function(callback){
      //var self = this;
      this.collection.fetch({
        success: function(collection, response, options){
          if(typeof callback === "function")
            callback();
        }
      });
    }*/

  });

});
