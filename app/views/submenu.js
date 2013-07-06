define([
  // Application.
  "app",
  "text!templates/menu.html"
],

function(app, template) {

  var ItemLine = Backbone.Marionette.ItemView.extend({
    template: '<li data-lang="<%= code %>"><%= title %></li>',
    tagName: "a",
    attributes:{
      "href": "javascript://",
      "data-animation": "slideleft"
    },
    events: {
      "click" : "showLang"
    },
    showLang: function(e){
      e.preventDefault();
      this.trigger("clean:selecting");
      this.selecting();
      app.appRegion.currentView.mainRegion.currentView.view.model.set('lang', this.model.get('code'));
      app.appRegion.currentView.closeSubMenu();
    },
    selecting: function(){
      this.$el.addClass('selected');
    }
  });

  return Backbone.Marionette.CompositeView.extend({
    tagName: 'div',
    //id:"toggle-menu",
    className: 'wrap',
    template: '<ul></ul>',
    itemView: ItemLine,
    ui: {
      ul: 'ul'
    },
    events: {
    },
    initialize : function(e){
      this.on("itemview:clean:selecting", function(childView){
        this.cleanSelecting();
      });
    },
    appendHtml: function(collectionView, itemView, index){
      collectionView.ui.ul.append(itemView.el);
    },
    cleanSelecting: function(){
      this.$el.find('a').removeClass('selected');
    },
    selecting : function(lang){
      var langModel = this.collection.findWhere({code: lang});
      this.cleanSelecting();
      if(langModel)
        this.children.findByModel(langModel).selecting();
    }

  });

});
