import ChatMessage from "./ChatMessage";

export default function MessageBox(props) {

  return (
    <div className="flexBox columnDirection messageBox">
      
      {
        props.messageList.map(
          (data, index) => 
            <ChatMessage
              key={index}
              user={props.userList[data.user]}
              text={data.text}
              messageFromCurrentUser={data.user === props.sessionID} />
        )
      }

    </div>
  );

}