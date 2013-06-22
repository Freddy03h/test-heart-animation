require([
  // Application.
  "app",

  // Main Router.
  "router",

  "views/split-view",
],

function(app, Router, SplitView) {

  window.addEventListener("message",
    function(e) {
      //if(e.origin == "http://exampleb.com")       
      console.log(e);
    },
  false);

  app.someModule.views.split = new SplitView();
  app.appRegion.show(app.someModule.views.split);

  // Define your master router on the application namespace and trigger all
  // navigation from this instance.
  app.router = new Router();

  if(!app.google_auth){
    //window.location.pathname = '/heart/login';
    window.history.pushState(null, "", "/heart/login");
  }

  // Trigger the initial route and enable HTML5 History API support, set the
  // root folder to '/' by default.  Change in app.js.
  Backbone.history.start({ pushState: true, root: app.root });

  /*app.bearer_token = localStorage.getItem('bearer');
  console.log(app.bearer_token);

  if(app.bearer_token){
    app.codebird.setBearerToken( app.bearer_token );

  }else{
    app.codebird.__call(
      'oauth2_token',
      {},
      function (reply) {
        app.bearer_token = reply.access_token;
        localStorage.setItem('bearer', app.bearer_token);
        app.codebird.setBearerToken( app.bearer_token );
      }
    );
  }*/

  /*
  Client ID:  
251443412694-6e33m2hquu621vmev084eo5vvjafbahj.apps.googleusercontent.com
Email address:  
251443412694-6e33m2hquu621vmev084eo5vvjafbahj@developer.gserviceaccount.com
Client secret:  
w42r0R6nj6JpEpoiFkjNzU_M
Redirect URIs:  http://localhost:8081/heart/
JavaScript origins: http://localhost
  */

  /*

var xhr = new XMLHttpRequest();
xhr.open('POST', 'https://www.googleapis.com/urlshortener/v1/url?key=AIzaDyAdjuPT5Pb4Nu56WJ_nlrMGOAgUAtKjiPM');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = function() {
  alert(xhr.responseText);
};
xhr.send(JSON.stringify({
  'longUrl': 'http://www.google.com'
}));

  */



  // All navigation that is relative should be passed through the navigate
  // method, to be processed by the router. If the link has a `data-bypass`
  // attribute, bypass the delegation completely.

  /*$(document).on("click", "a[href]:not([data-bypass])", function(evt) {
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
  });*/

});
