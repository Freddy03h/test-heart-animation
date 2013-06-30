define([
  // Application.
  "app",
  "models/people-collection",
  "models/person-model",
  "views/login",
  "views/people",
  "views/person"
],

function(app, PeopleCollection, PersonModel, LoginView, PeopleView, PersonView) {

  // Defining the application router, you can attach sub routers here.
  var Controller = Marionette.Controller.extend({
    login: function(){
      console.log('OH!!');
      //app.appRegion.currentView.mainRegion.show(new LoginView());
      app.appRegion.show(new LoginView());
    },
    oauthcallback: function(){
      if(location.hash){
        var params = {},
            queryString = location.hash.substring(1),
            regex = /([^&=]+)=([^&]*)/g,
            m;
        while (m = regex.exec(queryString)) {
          params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }

        console.log(params);

        localStorage.setItem('google-auth', JSON.stringify(params));
        app.google_auth = params;
        app.router.navigate("/", {trigger: true});
      }
    },
    people: function(){
      app.someModule.models.peopleCollection = app.someModule.models.peopleCollection || new PeopleCollection();

      app.appRegion.currentView.menuRegion.currentView.changeSelect('people');
      app.appRegion.currentView.setTitleToHeader('people', false);

      app.appRegion.currentView.mainRegion.show(
        new PeopleView({
          collection: app.someModule.models.peopleCollection
        })
      );

      app.someModule.models.peopleCollection.fetch();
    },
    person: function(id){
      var personModel = app.someModule.models.peopleCollection.get(id);

      app.appRegion.currentView.setTitleToHeader('person', true);

      app.appRegion.currentView.mainRegion.show(
        new PersonView({
          model: personModel
        })
      );

      personModel.fetch();
    },
    me: function(){
      app.someModule.models.meModel = app.someModule.models.meModel || new PersonModel({id: 'me'});

      app.appRegion.currentView.menuRegion.currentView.changeSelect('me');
      app.appRegion.currentView.setTitleToHeader('me', false);

      app.appRegion.currentView.mainRegion.show(
        new PersonView({
          model: app.someModule.models.meModel
        })
      );

      app.someModule.models.meModel.fetch();
    }/*,
    index: function(keywordString) {
      var keywordModel = app.someModule.models.keywords.findWhere({title: keywordString}) || app.someModule.models.keywords.at(0);

      app.appRegion.currentView.mainRegion.show(new Backbone.Marionette.PullableLayout({
        id: "home-pullable-" + keywordModel.get('title'),
        view: new HomeView({
          collection: keywordModel.tweets,
          model: keywordModel
        })
      }));

      app.appRegion.currentView.setModelToHeader(keywordModel);

      app.appRegion.currentView.menuRegion.currentView.selectingModel(keywordModel);
      app.appRegion.currentView.submenuRegion.currentView.selecting(keywordModel.get('lang'));

      keywordModel.tweets.fetch();
    },
    post: function() {
      app.appRegion.currentView.mainRegion.show(new PostView());
    }*/
  });

  return Controller;

});
