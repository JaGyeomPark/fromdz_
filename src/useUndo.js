// use-undo와 비슷하게 동작하는 친구

import {useState} from 'react';

const useUndo = (obj) => {
    const [state, setState] = useState({
      obj:obj,
      current:0,
      list:[obj],
      canUndo:false,
      canRedo:false,
    })

    const actions = {
      // set함수는 비동기 함수이기 때문에 값이 바뀌길 기대하면 안된다.
      set:(newObj) => {
        const newList = state.list.slice(0, state.current+1)
        newList.push(newObj)
        setState({
          ...state,
          obj:newObj,
          current:state.current+1,
          list:newList,
          canUndo:true,
          canRedo:false,
        })
      },
      reset:()=>{
        setState({
          ...state,
          obj:obj,
          current:0,
          list:[obj],
          canUndo:false,
          canRedo:false,
        })
      },
      undo:()=>{
        let canUndo = true
        if (state.current-1 === 0) canUndo = false
        setState({
          ...state,
          obj:state.list[state.current-1],
          current:state.current-1,
          canUndo:canUndo,
          canRedo:true,
        })
      },
      redo:()=>{
        let canRedo = true
        if (state.list.length-1 <= state.current+1) canRedo = false
        setState({
          ...state,
          obj:state.list[state.current+1],
          current:state.current+1,
          canUndo:true,
          canRedo:canRedo,
        })
      },
      canUndo:state.canUndo,
      canRedo:state.canRedo,
    }
    return [state.obj, actions]; 
};

export default useUndo;