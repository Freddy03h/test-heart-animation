define([
  // Libraries.
  "jquery",
  "lodash",
  "backbone",
  "modernizr",

  // Plugins.
  //"plugins/backbone.layoutmanager"
  "plugins/jquery.toObject",
  "plugins/backbone.routefilter",
  "plugins/backbone.marionette",
  "plugins/backbone.marionette.animationregion",
  "plugins/backbone.marionette.pullableview",
  "plugins/backbone.marionette.pullablelayout",
  "plugins/modernizr.test"

],

function($, _, Backbone) {

  Backbone.Marionette.TemplateCache.prototype.loadTemplate = function(templateId) {
    // Marionette expects "templateId" to be the ID of a DOM element.
    // But with RequireJS, templateId is actually the full text of the template.
    var template = templateId;

    // Make sure we have a template before trying to compile it
    if (!template || template.length === 0){
        var msg = "Could not find template: '" + templateId + "'";
        var err = new Error(msg);
        err.name = "NoTemplateError";
        throw err;
    }

    return template;
  };

  // Provide a global location to place configuration settings and module
  // creation.
  var app = new Backbone.Marionette.Application({
    // The root path to run the application through.
    root: "/heart/",
    someModule: {
      views: {},
      models: {}
    }
  });

  app.addRegions({
    appRegion: '#app'
  });

  var authGoogle = localStorage.getItem('google-auth');
  if (authGoogle)
    app.google_auth = JSON.parse(authGoogle);

  app.overlay = $("#overlay");
  app.setOverlay = function (bool) {
    if (!bool) {
      app.overlay.addClass('closing');
      setTimeout(function () {
        app.overlay.addClass('closed');
      }, 300);
    } else {
      app.overlay.removeClass('closed');
      app.overlay.removeClass('closing');
    }
  };

  return app;

});
