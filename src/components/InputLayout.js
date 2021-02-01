import { useState } from "react";
import styled from "styled-components";
import sendButton from '../icon/send.png';

const Input = styled.input`
  width: calc(100% - 70px);
  color: #DDDDDD;
  border: none;
  margin: 20px;
  outline: none;
  padding: 10px;
  font-size: 18px;
  border-radius: 10px;
  background-color: #333333;
`;

const SendButton = styled.img`
  width: 50px;
  height: 50px;
  border: none;
  margin: 20px 20px 20px 0px;
  outline: none;
  min-width: 50px;
  min-height: 50px;
  box-shadow: 0 0 10px #000000;
  border-radius: 50%;
`;

export default function InputLayout(props) {

  const [inputValue, setInputValue] = useState('');

  let inputElement = null;

  function keyHandler(eventProps) {

    inputElement = eventProps.nativeEvent.target;

    if (eventProps.key == "Enter"
      && props.onEnter) {
      setInputValue('');
      props.onEnter(inputValue);
    }

  }

  function onChangeHandler(eventProps) {

    setInputValue(eventProps.nativeEvent.target.value);

    if (props.onChange) {
      props.onChange(eventProps);
    }

  }

  return (
    <div className={props.className ? props.className : "flexBox rowDirection"}
      style={{marginTop: '-5px'}}>

      <Input
        placeholder={props.placeholder}
        onKeyUp={keyHandler}
        onChange={onChangeHandler}
        value={inputValue} />

      <SendButton
        className="hoverGrow"
        src={sendButton}
        onClick={() => {
            if (props.onEnter) {
              props.onEnter(inputValue);
              setInputValue('');
              inputElement?.focus();
            }
          }
        } />
    </div>
  );

}