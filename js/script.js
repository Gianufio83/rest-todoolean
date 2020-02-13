// alert('Ciao');
$(document).ready(function () {
  getAllList();

$('#button').click(function () {
  var value = $('#input').val();
  createNewToDo(value);
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
         text: todo.text
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
// Function - POST
function createNewToDo(value) {
  $.ajax({
    url: 'http://157.230.17.132:3016/todos',
    method: 'POST',
    data : {
      text: value
    },
    success: function (data) {
      $('.lists').html('');
      getAllList();
    },
    error: function () {
      alert('Errore');
    }
  });


}
