import MessageBox from "./MessageBox";
import InputLayout from "./InputLayout";

export default function ChatBox(props) {

  return (
		<div className="chatBox flexBox columnDirection">
			<MessageBox sessionID={props.sessionID} messageList={props.messageList} userList={props.userList} />
				<div className="messageSendBox">
					<InputLayout onChange={props.onTypingStart} onEnter={props.onSendMessage} />
				</div>
		</div>
	);

}