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

      app.appRegion.currentView.mainRegion.show(new Backbone.Marionette.PullableLayout({
        id: "home-pullable",
        view: new HomeView({
          collection: app.someModule.models.tweets
        })
      }));

      app.someModule.models.tweets.fetch();

    },
    post: function() {
      app.appRegion.currentView.mainRegion.show(new PostView());
    }
  });

  return Router;

});
