const express = require("express");
const db = require("./config/db");
const router_user = require("./router/userroutes");
const bodyParser = require("body-parser");
const passport = require("passport");
const route_blog = require("./router/blogroutes");
const route_comment = require("./router/commentroutes");
const route_like = require("./router/likeroutes")
const route_noti = require("./router/notirouters")
const path = require("path");

const app = express();

app.use(
  require("express-session")({
    secret: "buohnuohnuighqwdropwnmoijqninihihjikipjnioh", //decode or encode session
    resave: false,
    saveUninitialized: false,
  })
);

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const PORT = process.env.PORT || 5000;
db();



const http = require('http').Server(app);
//Pass the Express app into the HTTP module.
const socketIO = require('socket.io')(http);

let socketIDs = [];

const addUser = (data) => {
  socketIDs.push(data);
}

const checkUser = (socketID) => {
  let check = 0;
  socketIDs.forEach((item) => {
    if (item.socketId === socketID) {
      check = 1;
    }
  })
  return check
}

const getSocketIdFromUserId = (userId) => {
  let socketId = ""
  socketIDs.forEach((item) => {
    if (item.userId === userId) {
      socketId = item.socketId
    }
  })
  return socketId
}

const removeUser = (socketID) => {
  let newSocketIDs = [];
  socketIDs.forEach((item) => {
    if (item.socketId !== socketID) {
      newSocketIDs.push(item)
    }
  })
  socketIDs = [...newSocketIDs]
}



socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected`);
  // addUser(socket.id)

  socket.on('message', (message) => {
    console.log('message', message);
  });

  socket.on('sendToUserId', (message) => {
    let socketId = getSocketIdFromUserId(message.userId)
    console.log("socketIDs", socketIDs)
    if (socketId) {
      socketIO.to(socketId).emit('messageFromUserId', message.data);
    } else {
      console.log("save to the queue", message)
    }
  })

  socket.on('registerUser', (message) => {
    console.log("vao day")
    if (checkUser(socket.id) === 0) {
      addUser({
        socketId: socket.id,
        userId: message.userId,
        message: message.message
      })
    }
    console.log("socketIDs", socketIDs)
  })

  socket.on('disconnect', () => {
    console.log(`A user ${socket.id} disconnected`);
    removeUser(socket.id)
    console.log("socketIDs", socketIDs)
  });
});

http.listen(PORT, () => {
  console.log(`App listening at ${PORT}`);
});

// app.listen(PORT);
app.use("/user", router_user);
app.use("/blog", route_blog);
app.use("/comment", route_comment);
app.use("/like", route_like);
app.use("/noti", route_noti);

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}
