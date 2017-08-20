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
});