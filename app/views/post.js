define([
  // Application.
  "app",
  "text!templates/post.html"
],

function(app, template) {

  return Backbone.Marionette.PullableView.extend({
    tagName: "div",
    id:"post",
    template: template,

    /*initialize: function(){
      this.constructor.__super__.initialize.call(this);
    },
    onRender: function(){
      this.constructor.__super__.onRender.call(this);
    },
    events:{
      'click.post': 'example'
    },
    example: function(e){
      console.log('example');
    },*/

    pullToRefresh: function(){
      //Fake REFRESH
      var self = this;
      setTimeout(function(){
        self.refreshEnd();
      },2000, this);
    }

  });

});
