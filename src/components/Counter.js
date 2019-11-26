import React, {useState, useRef} from "react";
import "reset-css";
import styled from "styled-components";

const Root = styled.div`
  height: 100vh;
  background-color: #dbdbdb;
  display: flex;
  flex-direction: column;
`;

const NumberBoard = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const NumberSpan = styled.span`
  display: flex;
  flex: 1;
  font-size: 100px;
  font-weight: 600;
  color: rgb(0,125,100);
  align-items: center;
  justify-content: center;
`;

const InputBoard = styled.div`
  display: flex;
  flex: 0.5;
  align-items: center;
  justify-content: space-around;
`;

const Input = styled.input`
  flex: 0.4;
  font-size: 30px;
  text-align: center;
  border-radius: 20px;
`;

const ButtonBoard = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const CircleButton = styled.button`
  color: white;
  background-color: ${props => (props.disabled ? "gray" : "rgb(255,50,50)")};
  height: 100px;
  width: 100px;
  border-radius: 50%;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  border: 0px;
  outline: none;
  margin-left: 10px;
  font-size: 25px;
  &:hover {
    opacity: ${props => (props.disabled ? 1 : 0.5)};
  }
  &:first-child {
    margin: 0;
  }
`;

const Counter = ({number, canUndo, canRedo, handleUndo, handleRedo, handleIncrease, handleDecrease}) => {
  const [form, setForm] = useState({
    input:'',
  })
  const [isFormNaN, setFormNaN] = useState({
    input:true,
  })
  const {input} = form
  const inputRef = useRef()

  const handleChange = e => {
    setFormNaN({
      ...isFormNaN,
      [e.target.name]:isNaN(e.target.value),
    })
    setForm({
      ...form,
      [e.target.name]:e.target.value,
    })
  }

  const removeAndFocusOnInput = () => {
    inputRef.current.focus()
    setFormNaN({
      ...isFormNaN,
      input:true,
    })
    setForm({
      ...form,
      input:'',
    })
  }

  const _handleIncrease = () => {
    handleIncrease(parseInt(input))
    removeAndFocusOnInput()
  }

  const _handleDecrease = () => {
    handleDecrease(parseInt(input))
    removeAndFocusOnInput()
  }

  const _handleUndo = () => {
    handleUndo()
    inputRef.current.focus()
  }

  const _handleRedo = () => {
    handleRedo()
    inputRef.current.focus()
  }

  return (
    <Root>
      <NumberBoard>
        <NumberSpan>{number}</NumberSpan>
      </NumberBoard>
      <InputBoard>
        <Input 
          ref={inputRef}
          name='input'
          value={input}
          onChange={handleChange}
          placeholder='숫자를 입력하세요'/>
      </InputBoard>
      <ButtonBoard>
        <CircleButton onClick={_handleUndo} disabled={!canUndo}>Undo</CircleButton>
        <CircleButton onClick={_handleIncrease} disabled={isFormNaN.input}>+</CircleButton>
        <CircleButton onClick={_handleDecrease} disabled={isFormNaN.input}>-</CircleButton>
        <CircleButton onClick={_handleRedo} disabled={!canRedo}>Redo</CircleButton>
      </ButtonBoard>
    </Root>
  )
};

export default Counter;