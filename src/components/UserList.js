import { useEffect } from "react";
import ChatUser from "./ChatUser";

export default function UserList(props) {

    return (
        <div className="flexBoxAlign rowDirection flexWrap userList">
            <label for="userCheckBox">User List</label>
            <input id="userCheckBox" type="checkbox" />
            <div id="innerUserList" className="flexBoxAlign rowDirection flexWrap">
                { Object.keys(props.list).map((user, index) => !props.list[user].deleted ? <ChatUser key={index} user={props.list[user]} /> : '') }
            </div>
        </div>
    );

}