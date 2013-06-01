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
      'click #menu-two': 'toggleSubMenu',
      'click #menu a': 'openMenu'
    },
    initialize : function(e){
      this.menuView = new MenuView({
        collection: app.someModule.models.keywords
      });
      this.has3d = (Modernizr.cssanimations && Modernizr.csstransforms3d && Modernizr.positionfixed);
    },
    onRender: function(){
      this.menuRegion.show(this.menuView);

      this.submenuEl = this.$el.find('#sub-menu');
      this.contentEl = this.$el.find('#content');
    },
    openMenu: function(e){
      this.$el.toggleClass('open-menu');
    },
    /*openSubMenu: function(e){
      var self = this;
      var submenu = this.submenuEl;
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
    },*/

    toggleSubMenu: function(e){
      var self = this;
      var submenu = this.submenuEl;

      $(e.currentTarget).toggleClass('selected');

      if(submenu.hasClass('displayed')){
        self.closeSubMenu(e);
      }else{
        self.openSubMenu(e);
      }
      /*setTimeout(function(){
        menu.toggleClass('open-menu');
      },10);*/
    },

    closeSubMenu: function(e){
      var self = this;
        var submenu = this.submenuEl;

        if(this.has3d){
          submenu.on('webkitTransitionEnd transitionEnd', function(e){
            submenu.off('webkitTransitionEnd transitionEnd');
            submenu.removeClass('displayed');
          });
        }else{
          submenu.removeClass('displayed');
        }
        setTimeout(function(){
            self.contentEl.removeClass('open-submenu');
        },10);
    },
    openSubMenu: function(e){
      var self = this;
        var submenu = this.submenuEl;

        submenu.addClass('displayed');
        setTimeout(function(){
            self.contentEl.addClass('open-submenu');
        },10);
    },

    setTitle: function(titleText){
      this.$el.find("#header .title").text(titleText);
    }

  });

});
