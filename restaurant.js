// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================
var tables = [
  {
    customerName: "Chris",
    phoneNumber: 1234567890,
    customerEmail: "me@mail.com",
    customerID: 123,
    
  }
];

var waitlist = [
  {
    customerName: "Chris",
    phoneNumber: 1234567890,
    customerEmail: "me@gmail.com",
    customerID: 123,
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "/views/reserve.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "/views/tables.html"));
});

// Displays all tables
app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

// Displays all waitlist
app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist);
  });

// Displays a single table, or returns false
app.get("/api/tables/:table", function(req, res) {
  var chosen = req.params.table;

  console.log(chosen);

  for (var i = 0; i < tables.length; i++) {
    if (chosen === tables[i].routeName) {
      return res.json(tables[i]);
    }
  }

  return res.json(false);
});

// Create New Tables - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newtable = req.body;

  // Using a RegEx Pattern to remove spaces from newTable
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newtable.routeName = newtable.name.replace(/\s+/g, "").toLowerCase();

  console.log(newtable);

  tables.push(newtable);

  res.json(newtable);
});


// Displays a single waitlist, or returns false
app.get("/api/waitlists/:waitlist", function(req, res) {
    var chosenwaitlist = req.params.waitlist;
  
    console.log(chosenwaitlist);
  
    for (var i = 0; i < waitlists.length; i++) {
      if (chosenwaitlist === waitlists[i].routeName) {
        return res.json(waitlists[i]);
      }
    }
  
    return res.json(false);
  });
  
  // Create New Waitlists - takes in JSON input
  app.post("/api/waitlists", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newwaitlist = req.body;
  
    // Using a RegEx Pattern to remove spaces from newWaitlist
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newwaitlist.routeName = newwaitlist.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newwaitlist);
  
    tables.push(newwaitlist);
  
    res.json(newwaitlist);
  });





// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
