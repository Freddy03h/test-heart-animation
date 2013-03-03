// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file.
  deps: ["main"],

  paths: {
    // JavaScript folders.
    libs: "../assets/js/libs",
    plugins: "../assets/js/plugins",
    vendor: "../assets/vendor",

    // Libraries.
    jquery: "../assets/js/libs/jquery",
    lodash: "../assets/js/libs/lodash",
    backbone: "../assets/js/libs/backbone",
    modernizr: "../assets/js/libs/modernizr",

    // Plugins Require
    text: "../assets/js/libs/require/text"
  },

  shim: {
    // Backbone library depends on lodash and jQuery.
    backbone: {
      deps: ["lodash", "jquery"],
      exports: "Backbone"
    },

    "plugins/jquery.toObject": ["jquery", "plugins/form2js"],

    "plugins/backbone.marionette": ["backbone"],

    "plugins/backbone.marionette.animationregion": ["plugins/backbone.marionette"]
  }

});
