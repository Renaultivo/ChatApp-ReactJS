import styled from "styled-components";
import { UserIcon } from "./ChatUser";

const ChatMessageElement = styled.div`
  color: #DDDDDD;
  width: fit-content;
  max-width: calc(80% - 40px);
  margin: 30px 20px;
  padding: 10px 20px 20px 20px;
  animation: dropMessageAnimation linear 0.3s;
  background-color: #232323;
  ${
    props => props.messageFromCurrentUser === true ?
    'border-radius: 10px 0px 10px 10px; align-self: flex-end; text-align: right;'
      : 'border-radius: 0px 10px 10px 10px; text-align: left;'
  }
`;

const MessageUserIcon = styled(UserIcon)`
  top: -14px;
  z-index: 2;
  position: relative;
  ${
    props => props.messageFromCurrentUser === true ?
    'right: -46px; margin: -10px 0 0 calc(100% - 20px);' : 'left: -24px; margin: -10px 0 0 -10px;'
  }
`;

const MessageText = styled.div`
  top: -8px;
  position: relative;
  word-break: break-all;
`;

export default function ChatMessage(props) {

  return (
    <ChatMessageElement messageFromCurrentUser={props.messageFromCurrentUser}>
      <div className="flexBox rowDirection"
        style={{ marginRight: '32px' }}>
        <MessageUserIcon
          src={require(`../icon/${props.user.picture}`).default}
          messageFromCurrentUser={props.messageFromCurrentUser}/>
      </div>
      <MessageText>
        {
          !props.messageFromCurrentUser ? 
          `${props.user.name}: ${props.text}` : props.text
        }
      </MessageText>
    </ChatMessageElement>
  );

}