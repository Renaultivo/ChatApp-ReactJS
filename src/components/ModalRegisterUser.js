import { useEffect, useState } from "react";
import styled from "styled-components";
import { getAll } from "../tools/importManager";
import InputLayout from "./InputLayout";

const imgList = getAll(
  require.context(
    '../icon',
    false,
    /\.(ico|png)/
  )
)

const ModalBackground = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.9);
`;

const ImgIcon = styled.img`
    width: 40px;
    height: 40px;
    margin: 10px;
    box-shadow: 0 0 10px #000000;
    border-radius: 50%;
`;

const ImgListBackground = styled.div`
    overflow: auto;
    max-height: 200px;
`;

export default function ModalRegisterUser(props) {

  const [userPicture, setUserPicture] = useState('img2.ico');

  function onEnterHandler(value) {
    
    if (value.replaceAll(' ', '').split('').length < 2) {
      console.log("too short");
    } else {
      props.onRegister({
        name: value,
        picture: userPicture
      });
    }

  }

  return (
    <ModalBackground className="flexBoxAlign">
      <div style={{
        width: '280px',
        borderRadius: '20px',
        backgroundColor: '#222222'
      }}>
        <InputLayout
          className="flexBox rowDirection shadowBottom"
          onEnter={onEnterHandler}
          placeholder="User Name" />
        <ImgListBackground className="flexBoxAlign flexWrap">
          {
            imgList.map((src, index) =>
              <ImgIcon
                className="hoverGrow"
                src={require(`../icon/${src}`).default}
                key={index}
                onClick={() => { setUserPicture(src); }}/>)
          }
        </ImgListBackground>
      </div>
    </ModalBackground>
  );

}