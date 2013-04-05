Backbone.Marionette.PullableView = Backbone.Marionette.ItemView.extend({

    //className: function(){return "page-layout scrollable";},
    /*attributes: function(){
      console.log(this);
      return {class: "page-layout scrollable"};
    },*/
    className: "scrollable",
    events: {
      //'touchstart': 'touchstart',
      'touchmove.pulltorefresh': 'touchmove',
      'touchend.pulltorefresh': 'touchend'
    },
    initialize : function(){
      // add events from child
      if (this.events)
        this.events = _.defaults(this.events, Backbone.Marionette.PullableView.prototype.events);

      this.delegateEvents(this.events);

      this.isLoading = false;
      this.isActivated = false;
    },
    onRender: function(){
      this.ptr = $('<div class="pull-to-refresh"><p class="icon"></p><p class="title-pull">Tirer pour actualiser</p><p class="title-release">Relâcher pour actualiser</p></div>');
      //this.ptr = this.$el.find('.pull-to-refresh');
      this.ptrIcon = this.ptr.find('.icon');
      this.ptrPul = this.ptr.find('.title-pull');
      this.ptrRel = this.ptr.find('.title-release');
      //this.$el.on('touchstart',{self: this},this.touchstart).on('touchmove',{self: this},this.touchmove).on('touchend',{self: this},this.touchend);
      this.$el.find('.wrap').before(this.ptr);
    },
    /*onClose: function(){
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

});