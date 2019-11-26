// custom hooks인데 사용하지 않습니다. 지우려다 혹시 몰라서 일단 남겨뒀습니다.
import {useState} from 'react';

const useUndo = (obj) => {
  const [state, setState] = useState({
    current:obj,
    undoList:[],
    redoList:[],
  })
  const actions = {
    set:(newObj) => {
      state.undoList.push(state.current)
      setState({
        ...state,
        current:newObj,
        redoList:[],
      })
    },
    reset:()=>{
      setState({
        ...state,
        current:obj,
        undoList:[],
        redoList:[],
      })
    },
    undo:()=>{
      if (state.undoList.length === 0) return
      state.redoList.push(state.current)
      let current = state.undoList.pop()
      setState({
        ...state,
        current:current,
      })
    },
    redo:()=>{
      if (state.redoList.length === 0) return
      state.undoList.push(state.current)
      let current = state.redoList.pop()
      setState({
        ...state,
        current:current,
      })
    },
    canUndo:state.undoList.length===0?false:true,
    canRedo:state.redoList.length===0?false:true,
  }

  return [state.current, actions]; 
};

export default useUndo;