$(document).ready(function() {
  var config = {
    apiKey: "AIzaSyCafVsPaIWWNFKImMZ4eH_i8cqwiNbXg4A",
    authDomain: "fbase-first-project.firebaseapp.com",
    databaseURL: "https://fbase-first-project.firebaseio.com",
    projectId: "fbase-first-project",
    storageBucket: "fbase-first-project.appspot.com",
    messagingSenderId: "173552719130",
    appId: "1:173552719130:web:1e8a1d1a42e01fa8cc48a3",
    measurementId: "G-NXXTWZFBCQ"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  var userInput;
  $("#submitBtn").click(function(e) {
    e.preventDefault();
    var trainName = $("#train_name")
      .val()
      .trim();
    console.log(trainName.match(/[a-z]/i));
    var destination = $("#final_stop")
      .val()
      .trim();
    var firstTrain = $("#first_train_time")
      .val()
      ;
    var frequency = $("#train_frequency").val();
    database.ref().push({
      name: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    });
    $("input").val("");
  });
  database.ref().on("child_added", function(snapshot) {
    userInput = snapshot.val();
    console.log(userInput);

    $("#table_body").append("<tr>");
    $("#table_body tr:last-child").append(
      $("<td>" + userInput.name + "</td>"),
      $("<td>" + userInput.destination + "</td>"),
      $("<td>" + userInput.frequency + "</td>"),
      $("<td>" + userInput.firstTrain + "</td>"),
      $("<td>" + 0 + "</td>")
    );
  });
});
