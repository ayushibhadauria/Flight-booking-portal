import { useState } from 'react';
import {TextField} from "@material-ui/core"

import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";



function ButtonIncrement(props) {
  
   return (
    //  <Button style={{ marginLeft: '.5rem'}} onClick={props.onClickFunc}>
    //  +1
    //  </Button>
    <IconButton
                       onClick={props.onClickFunc}
                        aria-label="plus"
                        style={{ marginTop: 0}}
                      >
                        <AddCircleIcon fontSize="inherit" />
                      </IconButton>
   )
}
function ButtonDecrement(props) {
  
  return (
    
  

       <IconButton
                        onClick={props.onClickFunc}
                        aria-label="minus"
                        style={{ marginTop: 0}}
                      >
                        <RemoveCircleIcon fontSize="inherit" />
                      </IconButton>

      
  )
}
function Display(props) {
  return (
    <TextField
                        value={props.message}
                        id="outlined-adornment-small"
                        defaultValue="50"
                        variant="outlined"
                        size="small"
                        
                        style={{ width: 45, height: 10 ,  marginTop: 5, border: "none"}}
                        labelWidth={0}
                      />
    //<label style={{ marginLeft: '.5rem', color: "black"}} >{props.message}</label>
  )
}
function Incredecre() {
 
  const [counter, setCounter] = useState(0);
  const incrementCounter = () => setCounter(counter + 1);
  let decrementCounter = () => setCounter(counter - 1);
  if(counter<=1) {
    decrementCounter = () => setCounter(0);
  }
  return (
    <div > 
   
    
      <ButtonIncrement onClickFunc={incrementCounter}/>
      
      <Display message={counter}/> 
      
      <ButtonDecrement onClickFunc={decrementCounter}/>
      
    </div>
  );
}
export default Incredecre;