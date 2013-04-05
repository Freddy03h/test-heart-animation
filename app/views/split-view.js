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
      'click #menu-one': 'openMenu',
      'click #menu-two': 'openSubMenu',
      'click #menu a': 'openMenu'
    },
    initialize : function(e){
      this.menuView = new MenuView();
      this.has3d = (Modernizr.cssanimations && Modernizr.csstransforms3d);
    },
    onRender: function(){
      this.menuRegion.show(this.menuView);
    },
    openMenu: function(e){
      this.$el.toggleClass('open-menu');
    },
    openSubMenu: function(e){
      var self = this;
      var submenu = this.$el.find('#sub-menu');
      $(e.currentTarget).toggleClass('selected');
      if(submenu.is(":visible")){
        if(this.has3d){
          submenu.on('webkitTransitionEnd transitionEnd', function(e){
            submenu.off('webkitTransitionEnd transitionEnd');
            submenu.hide();
          });
        }else{
          submenu.hide();
        }
      }else{
        submenu.show();
      }
      setTimeout(function(){
        self.$el.find('#content').toggleClass('open-submenu');
      },10);
    }

  });

});
