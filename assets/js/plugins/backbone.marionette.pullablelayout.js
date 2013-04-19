Backbone.Marionette.PullableLayout = Backbone.Marionette.Layout.extend({

    //className: function(){return "page-layout scrollable";},
    /*attributes: function(){
      console.log(this);
      return {class: "page-layout scrollable"};
    },*/
    template: '<div class="pull-to-refresh"><p class="icon"></p><p class="title-pull">Tirer pour actualiser</p><p class="title-release">Relâcher pour actualiser</p></div><div class="wrap"></div>',
    className: "scrollable",
    regions: {
      wrapRegion: '.wrap'
    },
    events: {
      //'touchstart': 'touchstart',
      'touchmove': 'touchmove',
      'touchend': 'touchend'
    },
    initialize : function(options){
      this.view = options.view;
      this.isLoading = false;
      this.isActivated = false;
    },
    onRender: function(){
      this.wrapRegion.show(this.view);

      this.ptr = this.$el.find('.pull-to-refresh');
      this.ptrIcon = this.ptr.find('.icon');
      this.ptrPul = this.ptr.find('.title-pull');
      this.ptrRel = this.ptr.find('.title-release');
      //this.$el.on('touchstart',{self: this},this.touchstart).on('touchmove',{self: this},this.touchmove).on('touchend',{self: this},this.touchend);
      //this.$el.find('.wrap').before(this.ptr);
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
    pullToRefresh: function(){
      var self = this;
      this.view.reloadData(function(){self.refreshEnd();});
    },
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