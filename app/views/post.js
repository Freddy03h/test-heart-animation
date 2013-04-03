define([
  // Application.
  "app",
  "text!templates/post.html"
],

function(app, template) {

  return Backbone.Marionette.ItemView.extend({
    tagName: "div",
    id:"post",
    className: "page-layout scrollable",
    template: template,
    events: {
      //'touchstart': 'touchstart',
      'touchmove': 'touchmove',
      'touchend': 'touchend'
    },
    initialize : function(){
      this.isLoading = false;
      this.isActivated = false;
    },
    onRender: function(){
      this.ptr = this.$el.find('.pull-to-refresh');
      this.ptrIcon = this.ptr.find('.icon');
      this.ptrPul = this.ptr.find('.title-pull');
      this.ptrRel = this.ptr.find('.title-release');
      //this.$el.on('touchstart',{self: this},this.touchstart).on('touchmove',{self: this},this.touchmove).on('touchend',{self: this},this.touchend);
    },
    onClose: function(){
      //this.$el.off('touchstart touchmove touchend');
    },

    /*touchstart: function(e){
    },*/
    touchmove: function(e){
      var scrollTop = e.currentTarget.scrollTop;
      var ratio = Math.round(scrollTop*100/60);

      if(ratio <= -50){
        var ratioDegree = (Math.abs(ratio)-50)*2;
        if(ratioDegree > 100) ratioDegree = 100;
        var degree = -ratioDegree * 180 / 100;
        this.ptrIcon.css('transform', 'rotate('+ degree + 'deg)');
      }

      if(ratio <= -100){
        this.isActivated = true;
        this.ptrPul.hide();
        this.ptrRel.show();
      }else{
        this.ptrRel.hide();
        this.ptrPul.show();
        this.isActivated = false;
      }

    },
    touchend: function(e){
      var self = this;

      if(this.isActivated){
        this.isActivated = false;
        this.ptr.addClass('loading');
        setTimeout(function(){
          self.ptr.animate({
            height: 0
          }, 'fast', 'linear', function () {
            self.ptr.attr('style','');
            self.ptr.removeClass('loading');
          });
        },2000, this);
      }else{
        this.ptrIcon.css('transform', 'rotate(0deg)');
      }

    }

  });

});
