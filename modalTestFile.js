

var history = JSON.parse(window.localStorage.getItem("City"));
console.log(history);
    for (var i = 0; i < history.length; i++) {
      var li = $("<li>").addClass("list-group-item");
      li.text(history[i]);
      $("#history-1").append(li);
    }