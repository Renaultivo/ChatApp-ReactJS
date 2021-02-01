import styled from "styled-components";

const userStatusColor = {
	afk: 'orange',
	online: '#2ECC71',
	offline: '#F94646'
}

const UserStatus = styled.div`
	top: 4px;
	left: -55px;
	width: 15px;
	height: 15px;
	min-width: 15px;
	min-height: 15px;
	margin: 23px 0px 0px 40px;
	position: relative;
	box-shadow: 0 0 10px #000000;
	border-radius: 10px;
	background-color: ${props => userStatusColor[props.status]};
`;

export const UserIcon = styled.img`
	width: 35px;
	height: 35px;
	margin: 10px;
	box-shadow: 0 0 10px #000000;
	border-radius: 50%;
`;

const UserName = styled.div`
	color: #DDDDDD;
	padding: 0 10px;
	margin-left: -45px;
`;

const IsTypingStatus = styled.div`
	color: orange;
	font-size: 14px;
	margin-top: 10px;
	margin-left: -34px;
`;

export default function ChatUser(props) {

	return (
		<div className="flexBox alignCenter rowDirection chatUser">
			<UserIcon src={require(`../icon/${props.user.picture}`).default} />
			<UserStatus status={props.user.status} />
			<div className="flexBox columnDirection">
				<UserName>{props.user.name}</UserName>
				<IsTypingStatus className={props.user.isTyping ? "showTypingStatus" : "hideTypingStatus"}>Typing...</IsTypingStatus>
			</div>
		</div>
	);

}