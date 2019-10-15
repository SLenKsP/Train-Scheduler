$(document).ready(function() {
  // setting up firebase
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
  // show current time
  var currentTime = function() {
    setInterval(function() {
      $("#currentTime").text(moment().format("hh:mm A"));
    });
  };
  currentTime();
  // click event to enter user input
  $("#submitBtn").click(function(e) {
    e.preventDefault();
    var trainName = $("#train_name")
      .val()
      .trim();
    var destination = $("#final_stop")
      .val()
      .trim();
    var firstTrain = $("#first_train_time").val();
    var frequency = $("#train_frequency").val();

    // setting up next arrival time
    //first train time in utc
    var setFirstTrainTime = moment(firstTrain, "hh:mm").subtract(1, "years");

    //current time in utc
    var currentTime = moment();

    //difference
    var timeDifference = moment().diff(moment(setFirstTrainTime), "minutes");

    //time remainder
    var timeRemainder = timeDifference % frequency;

    //time until next train arrival (in minutes)
    var timeTillNextArrival_inMins = frequency - timeRemainder;

    // next train time from now
    var nextTrain = moment()
      .add(timeTillNextArrival_inMins, "minutes")
      .format("hh:mm A");

    database.ref().push({
      name: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency,
      nextTrain: nextTrain,
      currentTime: currentTime.format("hh:mm A"),
      timeTillNextArrival_inMins: timeTillNextArrival_inMins
    });
    $("input").val("");
  });
  // getting values from database and setting them up on the html
  database.ref().on("child_added", function(snapshot) {
    userInput = snapshot.val();

    var trainName = userInput.name;
    var destination = userInput.destination;
    var frequency = userInput.frequency;
    var firstTrain = userInput.firstTrain;
    var nextTrain = userInput.nextTrain;
    var currentTime = userInput.currentTime;
    var timeTillNextArrival_inMins = userInput.timeTillNextArrival_inMins;
    // setting up next arrival time
    //first train time in utc
    var setFirstTrainTime = moment(firstTrain, "hh:mm").subtract(1, "years");

    //current time in utc
    var currentTime = moment();

    //difference
    var timeDifference = moment().diff(moment(setFirstTrainTime), "minutes");

    //time remainder
    var timeRemainder = timeDifference % frequency;

    //time until next train arrival (in minutes)
    var timeTillNextArrival_inMins = frequency - timeRemainder;

    // next train time from now
    var nextTrain = moment()
      .add(timeTillNextArrival_inMins, "minutes")
      .format("hh:mm A");
    var tableRow = $("<tr>");
    $("#table_body").append("<tr>");
    $("#table_body tr:last-child").append(
      $("<td>" + trainName + "</td>"),
      $("<td>" + destination + "</td>"),
      $("<td>" + frequency + "</td>"),
      $("<td>" + nextTrain + "</td>"),
      $("<td>" + timeTillNextArrival_inMins + "</td>"),
      $("<button class='remove fa fa-trash mt-3'></button>")
    );
  });
  // remove table row click event (in progress- still need to remove object from firebase too!)
  $("body").on("click", ".remove", function(e) {
    e.preventDefault();
    console.log("hello");
    var removeConfirmation = confirm(
      "Are you sure you want to remove this train schedule from the table?"
    );
    if (removeConfirmation) {
      $(this)
        .closest("tr")
        .remove();
    } else {
      return;
    }
  });
});
