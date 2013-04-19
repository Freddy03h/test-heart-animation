define([
  // Application.
  "app",
  "models/tweet-collection",
  "views/home",
  "views/post"
],

function(app, TweetCollection, HomeView, PostView) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index",
      "keyword/:keyword": "index",
      "post": "post"
    },
    index: function(keyword) {
      keyword = keyword || 'javascript';

      var tweets = new TweetCollection([],{
        q: keyword
      });

      app.appRegion.currentView.mainRegion.show(new Backbone.Marionette.PullableLayout({
        id: "home-pullable-"+keyword,
        view: new HomeView({
          collection: tweets,
          model: new Backbone.Model({title: keyword})
        })
      }));

      tweets.fetch();

    },
    post: function() {
      app.appRegion.currentView.mainRegion.show(new PostView());
    }
  });

  return Router;

});
