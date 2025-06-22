const express = require("express");
const app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

server.listen(3000);
// WARNING: app.listen(80) will NOT work here!
app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
var time = 0;
var pause = 0;
app.get("/:h/:m/:s", function (req, res) {
  const { h, m, s } = req.params;
  time = parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s);
  res.sendFile(__dirname + "/index.html");
});
app.get("/stop", function (req, res) {
  time = 0;
  res.sendFile(__dirname + "/index.html");
});
app.get("/pause", function (req, res) {
  pause = 1;
  res.sendFile(__dirname + "/index.html");
});
app.get("/resume", function (req, res) {
  pause = 0;
  res.sendFile(__dirname + "/index.html");
});
var hr;
var min;
var sec;
var io = require("socket.io")(80);
setInterval(function () {
  if (time != 0 && pause == 0) {
    time--;
    hr = Math.floor(time / 3600);
    sec = time % 60;
    min = Math.floor((time / 60) % 60);
  } else {
    hr = 0;
    sec = 0;
    min = 0;
  }
  if (pause == 1) {
    hr = Math.floor(time / 3600);
    sec = time % 60;
    min = Math.floor((time / 60) % 60);
  }
  io.emit("time", { hr: hr, min: min, sec: sec });
  console.log(hr + ":" + min + ":" + sec);
}, 1000);
