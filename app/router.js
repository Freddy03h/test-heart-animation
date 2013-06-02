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

      app.appRegion.currentView.mainRegion.show(new Backbone.Marionette.PullableLayout({
        id: "home-pullable-" + keywordModel.get('title'),
        view: new HomeView({
          collection: keywordModel.tweets,
          model: keywordModel
        })
      }));

      app.appRegion.currentView.setTitle(keywordModel.get('title'));

      app.appRegion.currentView.menuRegion.currentView.selectingModel(keywordModel);
      app.appRegion.currentView.submenuRegion.currentView.selecting(keywordModel.get('lang'));

      keywordModel.tweets.fetch();
    },
    post: function() {
      app.appRegion.currentView.mainRegion.show(new PostView());
    }
  });

  return Router;

});
