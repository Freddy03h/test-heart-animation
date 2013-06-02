define([
  // Application.
  "app",
  "text!templates/menu.html"
],

function(app, template) {

  var ItemLine = Backbone.Marionette.ItemView.extend({
    template: '<a href="javascript://" data-animation="slideleft"><li><%= title %></li></a>',
    events: {
      "click a" : "showLang"
    },
    showLang: function(e){
      e.preventDefault();
      this.trigger("clean:selecting");
      this.selecting();
      app.appRegion.currentView.mainRegion.currentView.view.model.set('lang', this.model.get('title'));
      app.appRegion.currentView.closeSubMenu();
    },
    selecting: function(){
      this.$el.find('a').addClass('selected');
    }
  });

  return Backbone.Marionette.CollectionView.extend({
    tagName: "ul",
    //id:"sub-menu",
    //className: "scrollable",
    //template: template,
    itemView: ItemLine,
    events: {
    },
    initialize : function(e){
      this.on("itemview:clean:selecting", function(childView){
        this.cleanSelecting();
      });
    },
    cleanSelecting: function(){
      this.$el.find('a').removeClass('selected');
    },
    selecting : function(lang){
      var langModel = this.collection.findWhere({title: lang});
      this.cleanSelecting();
      if(langModel)
        this.children.findByModel(langModel).selecting();
    }

  });

});
