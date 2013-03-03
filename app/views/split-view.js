define([
  // Application.
  "app",
  "text!templates/split-view.html",
  "views/menu"
],

function(app, template, MenuView) {

  return Backbone.Marionette.Layout.extend({
    tagName: "div",
    className: "split-view page-layout",
    template: template,
    regions: {
      mainRegion: {
        selector: '#main',
        regionType : Backbone.Marionette.AnimationRegion
      },
      headerRegion: '#header',
      menuRegion: '#menu-main'
    },
    events: {
      'click .menu-button': 'openMenu'
    },
    initialize : function(e){
      this.menuView = new MenuView();
    },
    onRender: function(){
      this.menuRegion.show(this.menuView);
    },
    openMenu: function(e){
      this.$el.toggleClass('open-menu');
    }

  });

});
