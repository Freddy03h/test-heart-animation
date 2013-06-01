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
    index: function(keywordString) {
      var keywordModel = app.someModule.models.keywords.findWhere({title: keywordString}) || app.someModule.models.keywords.at(0);

      var tweetsCollection = new TweetCollection([],{
        q: keywordModel.get('title')
      });

      app.appRegion.currentView.mainRegion.show(new Backbone.Marionette.PullableLayout({
        id: "home-pullable-" + keywordModel.get('title'),
        view: new HomeView({
          collection: tweetsCollection,
          model: keywordModel
        })
      }));

      app.appRegion.currentView.setTitle(keywordModel.get('title'));

      app.appRegion.currentView.menuRegion.currentView.selectingModel(keywordModel);

      tweetsCollection.fetch();
    },
    post: function() {
      app.appRegion.currentView.mainRegion.show(new PostView());
    }
  });

  return Router;

});
