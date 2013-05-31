define([
  // Application.
  "app",
  "text!templates/menu.html"
],

function(app, template) {

  var ItemLine = Backbone.Marionette.ItemView.extend({
    template: '<a href="javascript://" data-animation="slideleft"><li><span class="title"><%= title %></span></li></a>',
    events: {
      "click a" : "showKeyword"
    },
    showKeyword: function(e){
      e.preventDefault();
      this.trigger("remove:class");
      $(e.currentTarget).addClass('selected');
      app.router.navigate('keyword/'+this.model.get('title'), {trigger: true});
    }
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
      this.on("itemview:remove:class", function(childView, msg){
        this.$el.find('a').removeClass('selected');
      });
    }

  });

});
