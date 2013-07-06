define([
  // Application.
  "app",
  "text!templates/menu.html"
],

function(app, template) {

  /*var ItemLine = Backbone.Marionette.ItemView.extend({
    template: '<li><span class="title"><%= title %></span><span class="lang"><%= lang %></span></li>',
    tagName: "a",
    attributes:{
      "href": "javascript://"
    },
    events: {
      "click" : "showKeyword"
    },
    initialize : function(e){
      this.listenTo(this.model, 'change', this.render);
      this.selectState = false;
    },
    onRender: function(){
      if(this.selectState)
        this.selecting();
    },
    showKeyword: function(e){
      e.preventDefault();
      //this.trigger("remove:class");
      //$(e.currentTarget).addClass('selected');
      app.router.navigate('keyword/'+this.model.get('title'), {trigger: true});
    },
    selecting: function(){
      this.$el.addClass('selected');
      this.selectState = true;
    },
    unSelecting: function(){
      this.$el.removeClass('selected');
      this.selectState = false;
    }
  });*/

  return Backbone.Marionette.ItemView.extend({
    tagName: "ul",
    id:"menu-list",
    className: "wrap",
    template: template,
    //itemView: ItemLine,
    events: {
      "click li": "changeMenu"
    },
    initialize : function(e){
      /*this.on("itemview:remove:class", function(childView, msg){
        this.$el.find('a').removeClass('selected');
      });*/
      this.state = 'people';
    },
    changeSelect: function(code){
      this.$el.find('li').removeClass('selected');
      this.$el.find('#menu-'+code).addClass('selected');
    },
    changeMenu:function(e){
      console.log(e.currentTarget.dataset.page);
      var page = e.currentTarget.dataset.page;
      //this.changeSelect(page);
      app.appRegion.currentView.$el.toggleClass('open-menu');
      app.router.navigate( page, {trigger: true});
    }/*,
    selectingModel : function(modelSelected){
      this.children.call('unSelecting');
      //this.$el.find('a').removeClass('selected');
      this.children.findByModel(modelSelected).selecting();
    }*/

  });

});
