let undoList = []
let redoList = []

const SET = 'useUndo/SET'
const UNDO = 'useUndo/UNDO'
const REDO = 'useUndo/REDO'
const RESET = 'useUndo/RESET'

export const set = (obj) => ({type:SET, obj:obj})
export const undo = () => ({type:UNDO})
export const redo = () => ({type:REDO})
export const reset = () => ({type:RESET})


const initialState = {
  current:0,
  canUndo:false,
  canRedo:false,
}

function useUndo(state = initialState, action) {
    let current
    switch (action.type) {
        case SET:
            undoList.push(state.current)
            redoList=[]
            return {
              ...state,
              current:action.obj,
              canUndo:undoList.length===0?false:true,
              canRedo:false,
            }
        case UNDO:
            if (undoList.length === 0) return state
            redoList.push(state.current)
            current = undoList.pop()
            return {
              ...state,
              current:current,
              canUndo:undoList.length===0?false:true,
              canRedo:redoList.length===0?false:true,
            }
        case REDO:
            if (redoList.length === 0) return state  
            undoList.push(state.current)
            current = redoList.pop()
            return {
              ...state,
              current:current,
              canUndo:undoList.length===0?false:true,
              canRedo:redoList.length===0?false:true,
            } 
        case RESET:
          undoList = []
          redoList = []
          return {
            ...state,
            current:0,
            canUndo:false,
            canRedo:false,
          }
        default:
            return state
    }
}

export default useUndo
