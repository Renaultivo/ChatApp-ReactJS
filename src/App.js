import './App.css';
import './css/simplified.css';
import UserList from './components/UserList';
import ChatBox from './components/ChatBox';
import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import ModalRegisterUser from './components/ModalRegisterUser';

const SERVER_ADDRESS = 'http://192.168.0.17:4322/';

let typingStatusTimeOutID = null;
let typingStatusDelayIsRunnung = false;

function App() {

  const [userList, setUserList] = useState({});
  const [loginStatus, setLoginStatus] = useState(true);
  const [messageList, setMessageList] = useState([]);

  const [sessionID, setSessionID] = useState({});
    
  const [socket, setSocket] = useState(null);


  useEffect(() => {
    
    const clientSocket =  socketIOClient(`${SERVER_ADDRESS}?id=${document.cookie.split('=')[1] ? document.cookie.split('=')[1] : '0'}`, {
      transports: ['websocket']
    });

    setSocket(clientSocket);

    clientSocket.on('logged', function(sessionData) {
      setLoginStatus(true);
      setSessionID(sessionData.sessionID);
      setUserList(sessionData.userList);
    });

    clientSocket.on('sessionIDChanged', function(session) {
      document.cookie = `id=${session}`;
    });

    clientSocket.on('userChanged', function(userChanged) {
      setUserList(userList => {return {...userList, ...userChanged}})
    });

    clientSocket.on('requestLogin', function() {
      setLoginStatus(false);
    });

    clientSocket.on('receivedMessage', function(receivedMessage) {
      setMessageList(messageList => [...messageList, receivedMessage]);
    });

  }, []);

  function onRegisterHandler(user) {
    socket.emit('login', user);
  }

  function onSendMessageHandler(message) {
    socket.emit('sendMessage', message);
    socket.emit('typing', false);
    typingStatusTimeOutID = setTimeout(delayToDisableTypingStatus, 2000);
  }

  function delayToDisableTypingStatus(e) {
    typingStatusDelayIsRunnung = false;
    socket.emit('typing', false);
  }

  const onTypingStartHandler = () => {

    if (!typingStatusDelayIsRunnung) {
      typingStatusDelayIsRunnung = true;
      socket.emit('typing', true);
    }

    if (typingStatusTimeOutID != null) {
      clearTimeout(typingStatusTimeOutID);
    }

    typingStatusTimeOutID = setTimeout(delayToDisableTypingStatus, 1000);

  }

  return (
    <div className="flexBox rowDirection chatBackground">
      <UserList list={userList} />
      <ChatBox sessionID={sessionID} messageList={messageList} userList={userList} onSendMessage={onSendMessageHandler} onTypingStart={() => { onTypingStartHandler() }} />
      { loginStatus == false ? <ModalRegisterUser onRegister={onRegisterHandler} /> : '' }
    </div>
  );
}

export default App;
