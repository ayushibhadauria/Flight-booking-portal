import { Grid , makeStyles} from '@material-ui/core'
import React from 'react'

const Success = () => {
    const useStyles = makeStyles((theme) => ({
      container: { 
        border: 'inset',
        borderRadius: 10 + 'px',
          display: "flex", flexWrap: "wrap", 
          position: "absolute",   
          justifyContent: 'center', 
          top: 100, left: 700, 
          alignItems: "center" }
    }));

    const classes = useStyles();

    return (
        <div>
           <Grid item xs={12} sm={12}>
                <img  src = "/images/original.jpg"
                style= {{width: "100%", height : "100%", objectFit: "cover", opacity: 0.5, marginTop: 0}}
                alt="error"/>
            </Grid>

            <h2 className={classes.container}>Flight has been booked Successfully!!!</h2>
         
        </div>
    )
}

export default Success
