// Load the application once the DOM is ready, using `jQuery.ready`:
$(function() {
  // Handler for .ready() called.

  // Todo Model
  // ----------

  // Our basic **Todo** model has a `title` attribute.
  var Todo = Backbone.Model.extend({

    // Default attributes for the todo item.
    defaults: function() {
      return {
        title: "empty todo...",
      };
    }

  });

  // Todo Item View
  // --------------

  // The DOM element for a todo item...
  var TodoView = Backbone.View.extend({

    //... is a list tag.
    tagName: "li",

    // Cache the template function for a single item.
    template: _.template($('#item-template').html()),

    // The TodoView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Todo** and a **TodoView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    // Re-render the titles of the todo item.
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });
});