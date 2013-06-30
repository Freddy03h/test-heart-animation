define([
  // Application.
  "app",
  "controller",
  "views/split-view",
],

function(app, Controller, SplitView) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Marionette.AppRouter.extend({
    controller: new Controller(),
    appRoutes: {
      "": "people",
      "people": "people",

      "me": "me",
      "person-:id": "person",
      "login": "login",
      "oauthcallback": "oauthcallback"
      //"": "index",
      //"keyword/:keyword": "index",
      //"post": "post"
    },
    before: function(route, params){
      console.log(route);

      console.log(app.appRegion);
      console.log(app.appRegion.currentView);
      //console.log(app.appRegion.currentView instanceof SplitView);

      if(!app.appRegion.currentView ||  (!(app.appRegion.currentView instanceof SplitView) && route !== 'login'))
        app.appRegion.show( new SplitView() );
    }/*,
    after: function(route, params){}*/
  });

  return Router;

});
