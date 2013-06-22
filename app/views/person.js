define([
  // Application.
  "app",
  "text!templates/person.html"
],

function(app, template) {

  return Backbone.Marionette.ItemView.extend({
    tagName: "div",
    id: function(){ return 'person-'+this.model.id;},
    template: template,

    initialize: function(){
      this.listenTo(this.model, 'change', this.render);
    }/*,
    onRender: function(){
      this.constructor.__super__.onRender.call(this);
    },
    events:{
      'click.post': 'example'
    },
    example: function(e){
      console.log('example');
    },*/

  });

});
