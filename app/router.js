define([
  // Application.
  "app",
  "views/home",
  "views/post"
],

function(app, HomeView, PostView) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index",
      "post": "post"
    },

    index: function() {
      app.someModule.views.home = app.someModule.views.home || new HomeView();
      app.mainRegion.show(app.someModule.views.home);
    },

    post: function() {
      app.someModule.views.post = app.someModule.views.post || new PostView();
      app.mainRegion.show(app.someModule.views.post);
    },


  });

  return Router;

});
