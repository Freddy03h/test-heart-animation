define([
  // Application.
  "app",
  "text!templates/post.html"
],

function(app, template) {

  return Backbone.Marionette.ItemView.extend({
    tagName: "div",
    id:"post",
    className: "scrollable",
    template: template,
    events: {
    },
    initialize : function(e){
    }

  });

});
