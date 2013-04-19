require([
  // Application.
  "app",

  // Main Router.
  "router",

  "models/tweet-collection",

  "views/split-view"
],

function(app, Router, TweetCollection, SplitView) {

  app.someModule.models.tweets = new TweetCollection();
  app.someModule.models.keywords = new Backbone.Collection([
    {
      title: "javascript"
    },{
      title: "html 5"
    },{
      title: "require js"
    },{
      title: "backbone"
    },{
      title: "marionette"
    },{
      title: "yeoman"
    },{
      title: "grunt"
    },{
      title: "bower"
    },{
      title: "jam"
    },{
      title: "sass"
    }
  ]);

  app.someModule.views.split = new SplitView();
  app.appRegion.show(app.someModule.views.split);

  // Define your master router on the application namespace and trigger all
  // navigation from this instance.
  app.router = new Router();

  // Trigger the initial route and enable HTML5 History API support, set the
  // root folder to '/' by default.  Change in app.js.
  Backbone.history.start({ /*pushState: false,*/ root: app.root });

  // All navigation that is relative should be passed through the navigate
  // method, to be processed by the router. If the link has a `data-bypass`
  // attribute, bypass the delegation completely.
  $(document).on("click", "a[href]:not([data-bypass])", function(evt) {
    // Get the absolute anchor href.
    var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
    // Get the absolute root.
    var root = location.protocol + "//" + location.host + app.root;

    app.appRegion.currentView.mainRegion.animation = evt.currentTarget.getAttribute('data-animation') || 'dissolve';

    // Ensure the root is part of the anchor href, meaning it's relative.
    if (href.prop.slice(0, root.length) === root) {
      // Stop the default event to ensure the link will not cause a page
      // refresh.
      evt.preventDefault();

      // `Backbone.history.navigate` is sufficient for all Routers and will
      // trigger the correct events. The Router's internal `navigate` method
      // calls this anyways.  The fragment is sliced from the root.
      Backbone.history.navigate(href.attr, true);
    }
  });

});
