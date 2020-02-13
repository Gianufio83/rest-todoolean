// alert('Ciao');
$(document).ready(function () {
  getAllList();

$('#button').click(function () {
  var value = $('#input').val();
  createNewToDo(value);
});
$(document).on('click', '.delete', function () {
  var buttonDelete = $(this);
  var idDeleteTodo = buttonDelete.parent().attr('data-id');
  console.log(idDeleteTodo);
  toDoDelete(idDeleteTodo);
});
$(document).on('click', '#open', function () {
  $(this).parent('.todo').children('#update').removeAttr('disabled');
});

$(document).on('click', '#update-button', function () {
  var attr = $(this).parent('.todo').children('#update').val();
  var id = $(this).parent('.todo').attr('data-id');
  update(id, attr);

});

});





// Functions
// Function -GET
function getAllList() {
  $.ajax({
    url: 'http://157.230.17.132:3016/todos',
    method: 'GET',
    success: function (data) {
    // console.log(data);
    var list = data;
    var source = $('#list-template').html();
    var template = Handlebars.compile(source);
    for (var i = 0; i < list.length; i++) {
       var todo = list[i];
       var context = {
         text: todo.text,
         id : todo.id
       }
    var html = template(context);
      $('.lists').append(html);
    }
  },
    error: function () {
      alert('Errore');
    }
  });
}
// Function -POST
function createNewToDo(input) {
  $.ajax({
    url: 'http://157.230.17.132:3016/todos',
    method: 'POST',
    data : {
      text: input
    },
    success: function (data) {
      $('ol.lists').html('');
      $('#input').val('');
      getAllList();
    },
    error: function () {
      alert('Errore');
    }
  });
}
// Function -DELETE
function toDoDelete(id) {
  $.ajax({
    url: 'http://157.230.17.132:3016/todos/' + id,
    method: 'DELETE',
    success: function (data) {
      $('ol.lists').html('');
      $('#input').val('');
      getAllList();
    },
    error: function () {
      alert('Errore');
    }
  });
}


// Function -UPDATE
function update(id, value) {
  $.ajax({
    url: 'http://157.230.17.132:3016/todos' + id,
    method: 'PUT',
    data : {
      text: value
    },
    success: function (data) {
      $('ol.lists').html('');
      $('#input').val('');
      getAllList();
    },
    error: function () {
      alert('Errore');
    }

  });
}
