define([
  // Application.
  "app",
  "text!templates/post.html"
],

function(app, template) {

  return Backbone.Marionette.ItemView.extend({
    tagName: "div",
    id:"post",
    className: "scrollable",
    template: template,
    events: {
      //'touchstart': 'touchstart',
      //'touchmove': 'touchmove',
      //'touchend': 'touchend'
    },
    initialize : function(){
      console.log(this);

      this.isLoading = false;
      this.isActivated = false;
    },
    onRender: function(){
      console.log(this.$el.parent());
      console.log(this.$el);
      this.ptr = this.$el.find('.pull-to-refresh');
      this.$el.parent().on('touchstart',{self: this},this.touchstart).on('touchmove',{self: this},this.touchmove).on('touchend',{self: this},this.touchend);
    },
    onClose: function(){
      this.$el.parent().off('touchstart touchmove touchend');
    },

    touchstart: function(e){
      var self = e.data.self;
      console.log('touchstart');
      console.log(this);
      console.log(self);
      console.log(e);
    },
    touchmove: function(e){
      var self = e.data.self;
      console.log('touchmove');
      var scrollTop = e.currentTarget.scrollTop;
      var ratio = Math.round(Math.abs(scrollTop*100/60));
      console.log(ratio+"%");
      var ratioColor = 255-(ratio/100*255);
      ratioColor = (ratioColor < 0) ? 0 : ratioColor;
      console.log(ratioColor);
      self.ptr.css('background-color','rgb(255,'+ratioColor+','+ratioColor+')');

      if(ratio>=100){
        self.isActivated = true;
      }else{
        self.isActivated = false;
      }

    },
    touchend: function(e){
      var self = e.data.self;
      console.log('touchend');
      console.log(e);
      if(self.isActivated){
        self.isActivated = false;
        self.ptr.css('position', 'static');
        self.ptr.css('background-color','rgb(0,255,0)');
        setTimeout(function(){
          self.ptr.css('position', 'absolute');
          self.ptr.css('background-color','rgb(255,255,255)');
        },2000);
      }else{
        self.ptr.css('background-color','rgb(255,255,255)');
      }
    }

  });

});
