define([
  // Application.
  "app",
  "text!templates/post.html"
],

function(app, template) {

  /*var ScrollableView = Backbone.Marionette.ItemView.extend({

    className: "page-layout scrollable",
    events: {
      //'touchstart': 'touchstart',
      'touchmove.pulltorefresh': 'touchmove',
      'touchend.pulltorefresh': 'touchend'
    },
    initialize : function(){
      // add events from child
      if (this.events)
        this.events = _.defaults(this.events, ScrollableView.prototype.events);

      this.delegateEvents(this.events);

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
      if(this.isActivated){
        this.isActivated = false;
        this.ptr.addClass('loading');
        this.pullToRefresh();
      }else{
        this.ptrIcon.css('transform', 'rotate(0deg)');
      }
    },
    pullToRefresh: function(){},
    refreshEnd: function(){
      var self = this;
      this.ptr.animate({
        height: 0
      }, 'fast', 'linear', function () {
        self.ptr.attr('style','');
        self.ptr.removeClass('loading');
      });
    }
  });*/

  return Backbone.Marionette.ScrollableView.extend({
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
