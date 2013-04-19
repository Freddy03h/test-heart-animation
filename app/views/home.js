define([
  // Application.
  "app",
  "text!templates/home.html",
  "text!templates/tweet-line.html"
],

function(app, template, templateTweet) {

  var TweetLine = Backbone.Marionette.ItemView.extend({
    template: templateTweet
  });

  return Backbone.Marionette.CompositeView.extend({
    tagName: "div",
    id:"home",
    template: template,
    itemView: TweetLine,
    itemViewContainer: "ul",
    events: {
      "click .reload-button": "reloadData"
    },
    initialize : function(e){
    },
    reloadData: function(callback){
      //var self = this;
      /*setTimeout(function(){
        console.log('FINISH 4');
        callback();
      },2000);*/
      app.someModule.models.tweets.fetch({
        success: function(collection, response, options){
          console.log(collection);
          callback();
        }
      });
    }

  });

});
