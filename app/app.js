define([
  // Libraries.
  "jquery",
  "lodash",
  "backbone",
  "modernizr",

  // Plugins.
  //"plugins/backbone.layoutmanager"
  "plugins/jquery.toObject",
  "plugins/backbone.marionette",
  "plugins/backbone.marionette.animationregion"

],

function($, _, Backbone) {

  /*var iphone = ( navigator.userAgent.match(/(iPhone|iPod)/i) ? true : false );
  if(iphone){
    var safari = ( navigator.userAgent.match(/(Safari)/i) ? true : false );
    if(safari)
      $('html').addClass('iphone-safari');
  }*/
  var iOSDevice = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? true : false );
  if(iOSDevice){
    $('html').addClass('ios-device');

    var iphone = ( navigator.userAgent.match(/(iPhone|iPod)/i) ? true : false );
    if(iphone){
      var safari = ( navigator.userAgent.match(/(Safari)/i) ? true : false );
      if(safari)
        $('html').addClass('iphone-safari');
    }
  }

  Modernizr.addTest("overflowscrolling",function(){
      return Modernizr.testAllProps("overflowScrolling");
  });

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
    root: "/",
    someModule: {
      views: {},
      models: {}
    }
  });

  app.addRegions({
    bodyRegion: 'body'
  });

  return app;

});
