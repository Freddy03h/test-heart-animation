define([
  // Application.
  "app",
  "text!templates/split-view.html",
  "views/menu",
  "views/submenu"
],

function(app, template, MenuView, SubmenuView) {

  return Backbone.Marionette.Layout.extend({
    tagName: "div",
    className: "split-view",
    template: template,
    regions: {
      mainRegion: {
        selector: '#main',
        regionType : Backbone.Marionette.AnimationRegion
      },
      headerRegion: '#header',
      menuRegion: '#menu-main',
      submenuRegion: "#toggle-menu"
    },
    events: {
      'click #button-split': 'openMenu',
      'click #button-toggle': 'toggleSubMenu',
      'click #button-back': 'backNavigation',
      'click #menu a': 'openMenu'
    },
    initialize : function(e){
      this.menuView = new MenuView();
      this.submenuView = new SubmenuView({
        collection: new Backbone.Collection([
          {title:"All", code:""},
          {title:"English", code:"en"},
          {title:"French", code:"fr"},
          {title:"Spanish", code:"es"},
          {title:"German", code:"de"},
          {title:"Italian", code:"it"}
        ])
      });
      this.has3d = (Modernizr.cssanimations && Modernizr.csstransforms3d && Modernizr.positionfixed);
    },
    onRender: function(){
      this.menuRegion.show(this.menuView);
      this.submenuRegion.show(this.submenuView);

      this.submenuEl = this.$el.find('#toggle-menu');
      this.buttonSubmenuEl = this.$el.find('#button-toggle');
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

      //$(e.currentTarget).toggleClass('selected');

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

      this.buttonSubmenuEl.removeClass('selected');

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

      this.buttonSubmenuEl.addClass('selected');

      submenu.addClass('displayed');
      setTimeout(function(){
          self.contentEl.addClass('open-submenu');
      },10);
    },

    backNavigation: function(e){
      app.appRegion.currentView.mainRegion.animation = "slideright";
      window.history.back();
    },

    setTitleToHeader: function(title, back){
      this.$el.find("#header .title:not(.current)").text(title);
      this.$el.find("#header .title").toggleClass('current');
      this.$el.find("#header").toggleClass( 'back', back );
    }

  });

});
