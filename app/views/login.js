define([
  // Application.
  "app",
  "text!templates/login.html"
],

function(app, template) {

  return Backbone.Marionette.ItemView.extend({
    tagName: "div",
    id:"login",
    template: template,

    /*initialize: function(){
      this.constructor.__super__.initialize.call(this);
    },
    onRender: function(){
      this.constructor.__super__.onRender.call(this);
    },*/
    events:{
      'click #login-button': 'example'
    },
    example: function(e){

      var urlAuth = "https://accounts.google.com/o/oauth2/auth?client_id=251443412694-6e33m2hquu621vmev084eo5vvjafbahj.apps.googleusercontent.com&redirect_uri=http://localhost:8081/heart/oauthcallback&response_type=code token id_token gsession&scope=https://www.googleapis.com/auth/plus.login&state=toto";
      //var urlAuth = "https://accounts.google.com/o/oauth2/auth?client_id=251443412694-6e33m2hquu621vmev084eo5vvjafbahj.apps.googleusercontent.com&redirect_uri=postmessage&response_type=code token id_token gsession&scope=https://www.googleapis.com/auth/plus.login&origin=http://localhost:8081&state=toto&request_visible_actions=http://schemas.google.com%/AddActivity&cookie_policy=single_host_origin&proxy=oauth2relay80960199";
      //var urlAuth = "https://accounts.google.com/o/oauth2/auth?client_id=251443412694-6e33m2hquu621vmev084eo5vvjafbahj.apps.googleusercontent.com&redirect_uri=postmessage&response_type=code token id_token gsession&scope=https://www.googleapis.com/auth/plus.login&origin=http://localhost:8081&state=toto";
      //var urlAuth = "https://accounts.google.com/o/oauth2/postmessageRelay?parent=http://localhost:8081";
      //var popupWin = window.open(urlAuth, 'titi', config='height=500, width=700, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, directories=no, status=no');
      //this.$el.find('#my-frame').prop('src', urlAuth);
      window.location = urlAuth;

    }

  });

});
