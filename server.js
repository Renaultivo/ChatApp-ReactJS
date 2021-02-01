const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');
const md5 = require('md5');

app.use(cors());

app.locals.users = new Object();

function userChanged(userID) {

  io.emit('userChanged', {
    [app.locals.users[userID].id]: {
      id: app.locals.users[userID].id,
      name: app.locals.users[userID].name,
      deleted: app.locals.users[userID].deleted,
      status: app.locals.users[userID].status,
      isTyping: app.locals.users[userID].isTyping,
      picture: app.locals.users[userID].picture
    }
  });

}

io.on('connection', function(socket) {

  let sessionID = socket.handshake.url.split('=')[1].split('&')[0];

  function sendCurrentData() {

    let userList = new Object();

    Object.keys(app.locals.users).map(
      user => {

        userList[app.locals.users[user].id] = {
          name: app.locals.users[user].name,
          status: app.locals.users[user].status,
          isTyping: app.locals.users[user].isTyping,
          picture: app.locals.users[user].picture
        }

      }
    );

    socket.emit('logged', {
      sessionID: app.locals.users[sessionID].id,
      userList
    });

  }

  if (!app.locals.users[sessionID]) {
    sessionID = socket.client.conn.id;
    socket.emit('sessionIDChanged', sessionID);
    socket.emit('requestLogin');
  } else {
    app.locals.users[sessionID].status = 'online';
    app.locals.users[sessionID].disconnectedSince = null;
    sendCurrentData();
    userChanged(sessionID);
  }

  socket.on('login', function(user) {

    app.locals.users[sessionID] = {
      id: md5(`user${sessionID}id`),
      name: user.name,
      status: 'online',
      picture: user.picture,
      isTyping: false,
      lastChange: new Date()
    };

    socket.emit('registered', app.locals.users[sessionID]);

    if (user.name.trim().split('').length > 3) {

      sendCurrentData();
      userChanged(sessionID);

    } else {
      socket.emit('error', 'Nickname too short');
    }

  });

  socket.on('typing', function(isTyping) {
    app.locals.users[sessionID].status = 'online';
    app.locals.users[sessionID].isTyping = isTyping;
    app.locals.users[sessionID].lastChange = new Date();
    userChanged(sessionID);
  });

  socket.on('sendMessage', function(message) {

    if (message.trim().length > 0) {
      
      io.emit('receivedMessage', {
        user: app.locals.users[sessionID].id,
        text: message
      });

    }

  });

  socket.on('disconnect', function() {

    if (app.locals.users[sessionID]) {
      app.locals.users[sessionID].status = 'offline';
      app.locals.users[sessionID].disconnectedSince = new Date();
      userChanged(sessionID);
    }

  });

});

setInterval(function() {

  let currentDate = new Date();

  for (session in app.locals.users) {

    // 1 minute
    if (app.locals.users[session].lastChange.getTime() + (1000 * 60) < currentDate
      && app.locals.users[session].status == 'online') {

      app.locals.users[session].status = 'afk';
      userChanged(session);

    }

    if (app.locals.users[session].disconnectedSince) {

      // 10 minutes
      if (app.locals.users[session].disconnectedSince.getTime() + (1000 * 60 * 10) < currentDate) {

        app.locals.users[session].deleted = true;
        userChanged(session);
        delete app.locals.users[session];

      }

    }

  }

}, (1000 * 60)); // 1 minute

http.listen(4322, () => {
  console.log('listening on port 4322');
});