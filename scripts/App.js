// Load the application once the DOM is ready, using `jQuery.ready`:
$(function() {
  // Handler for .ready() called.

  // Todo Model
  // ----------

  // Our basic **Todo** model has `title`, and `done` attributes.
  var Todo = Backbone.Model.extend({

    // Default attributes for the todo item.
    defaults: function() {
      return {
        title: "empty todo...",
        done: false
      };
    },

    // Toggle the `done` state of this todo item.
    toggle: function() {
      this.set('done', !this.get("done"));
    }

  });

  // Todo Collection
  // ---------------

  // The collection of todos is backed by *Local Variable* instead of a *localStorage* or a remote
  // server.
  var TodoList = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Todo,

  });

  // Create our global collection of **Todos**.
  var Todos = new TodoList;

  // Todo Item View
  // --------------

  // The DOM element for a todo item...
  var TodoView = Backbone.View.extend({

    //... is a list tag.
    tagName: "li",

    // Cache the template function for a single item.
    template: _.template($('#item-template').html()),

    // The DOM events specific to an item.
    events: {
      "click .toggle": "toggleDone",
    },

    // The TodoView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Todo** and a **TodoView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    // Re-render the titles of the todo item.
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.toggleClass('done', this.model.get('done'));
      return this;
    },

    // Toggle the `"done"` state of the model.
    toggleDone: function() {
      this.model.toggle();
    }

  });

  // The Application
  // ---------------

  // Our overall **AppView** is the top-level piece of UI.
  var AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#todoapp"),

    // Delegated events for creating new items.
    events: {
      "keypress #new-todo": "createOnEnter",
    },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed.
    initialize: function() {

      this.input = this.$("#new-todo");

      // whenever anything changes, re-render.
      this.listenTo(Todos, 'all', this.render);

      this.main = $('#main');
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
      if (Todos.length) {
        this.main.show();
      } else {
        this.main.hide();
      }
    },

    // If you hit return in the main input field, create new **Todo** model,
    // adding it to a *Local Variable* instead of persisting it to *localStorage*.
    createOnEnter: function(e) {
      if (e.keyCode != 13) return;

      var todo = new Todo({
        title: this.input.val()
      });
      Todos.add(todo);

      var view = new TodoView({
        model: todo
      });
      this.$("#todo-list").append(view.render().el);

      // clear the input once the todo is added to our list.
      this.input.val('');
    }

  });

  // Finally, we kick things off by creating the **App**.
  var App = new AppView;

});