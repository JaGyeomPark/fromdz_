import React from 'react';
import {connect} from 'react-redux'
import Counter from '../components/Counter'
import {set, undo, redo} from '../modules/useUndo'

const CounterContainer = ({number, canUndo, canRedo, handleSet, handleRedo, handleUndo}) => {
  return (
    <Counter 
      number={number}
      canUndo={canUndo}
      canRedo={canRedo}
      handleIncrease={(num)=>handleSet(number+num)}
      handleDecrease={(num)=>handleSet(number-num)}
      handleUndo={handleUndo}
      handleRedo={handleRedo}/>
  )
}

const mapStateToProps = state => ({
  number:state.useUndo.current,
  canUndo:state.useUndo.canUndo,
  canRedo:state.useUndo.canRedo,
})

const mapDispatchToProps = dispatch => ({
  handleUndo: ()=> {
    dispatch(undo())
  },
  handleRedo: ()=> {
    dispatch(redo())
  },
  handleSet: (number)=> {
      dispatch(set(number))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterContainer);