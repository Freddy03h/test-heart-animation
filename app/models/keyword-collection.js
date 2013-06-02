define([
  // Application.
  //"app",
  "backbone",
  "models/tweet-collection"
],

function(/*app,*/Backbone, TweetCollection) {

  var KeyworkModel = Backbone.Model.extend({
    initialize : function(data, options){
      this.tweets = new TweetCollection([],{
        q: this.get('title')
      });
      this.on('change', function(){
        this.tweets.options.q = this.get('title');
        this.tweets.options.lang = this.get('lang');
        this.tweets.fetch();
      });
    }
  });

  return Backbone.Collection.extend({
    model: KeyworkModel
  });

});
