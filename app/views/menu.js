define([
  // Application.
  "app",
  "text!templates/menu.html"
],

function(app, template) {

  var ItemLine = Backbone.Marionette.ItemView.extend({
    template: '<a href="javascript://" data-animation="slideleft"><li><span class="title"><%= title %></span><span class="lang"><%= lang %></span></li></a>',
    events: {
      "click a" : "showKeyword"
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
      this.$el.find('a').addClass('selected');
      this.selectState = true;
    }
  });

  return Backbone.Marionette.CollectionView.extend({
    tagName: "ul",
    id:"menu",
    //className: "scrollable",
    //template: template,
    itemView: ItemLine,
    events: {
    },
    initialize : function(e){
      /*this.on("itemview:remove:class", function(childView, msg){
        this.$el.find('a').removeClass('selected');
      });*/
    },
    selectingModel : function(modelSelected){
      this.$el.find('a').removeClass('selected');
      this.children.findByModel(modelSelected).selecting();
    }

  });

});
