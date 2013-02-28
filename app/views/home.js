define([
  // Application.
  "app",
  "text!templates/home.html"
],

function(app, template) {

  return Backbone.Marionette.ItemView.extend({
    tagName: "div",
    id:"home",
    className: "scrollable",
    template: template,
    events: {
    },
    initialize : function(e){
    }

  });

});
