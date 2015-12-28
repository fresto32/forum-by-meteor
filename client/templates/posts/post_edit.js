Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPostId = this._id;

    var postProperties = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };

    Meteor.call('postEdit', postProperties, currentPostId, function(error, result){
        //display the error and report it
        if(error)
          return alert(error.reason);

        //route to the identical URL post
        if(result.postExists)
          alert('This link has already been posted');

        Router.go('postPage', {_id: result._id});

    });
  },

//The following is Discovering Meteor's code
/*    Posts.update(currentPostId, {$set: postProperties}, function(error) {
      if (error) {
        // display the error to the user
        alert(error.reason);
      } else {
        Router.go('postPage', {_id: currentPostId});
      }
    });*/

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this post?")) {
      var currentPostId = this._id;
      Posts.remove(currentPostId);
      Router.go('postsList');
    }
  }
});
