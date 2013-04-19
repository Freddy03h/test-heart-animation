define([
  // Application.
  "app",
  "text!templates/menu.html"
],

function(app, template) {

  var ItemLine = Backbone.Marionette.ItemView.extend({
    template: '<a href="post" data-animation="slideleft"><li><span class="title"><%= title %></span></li></a>'
  });

  return Backbone.Marionette.CollectionView.extend({
    tagName: "ul",
    id:"menu",
    //className: "scrollable",
    //template: template,
    itemView: ItemLine,
    events: {
    },
    initialize : function(e){
    }

  });

});
