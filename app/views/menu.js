define([
  // Application.
  "app",
  "text!templates/menu.html"
],

function(app, template) {

  return Backbone.Marionette.ItemView.extend({
    tagName: "div",
    id:"menu",
    className: "page-layout scrollable",
    template: template,
    events: {
    },
    initialize : function(e){
    }

  });

});
