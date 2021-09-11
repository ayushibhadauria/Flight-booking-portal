import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {  useDispatch } from 'react-redux'
import {Grid, Button, makeStyles, Container} from "@material-ui/core"



const Login = () => {

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            border: 'block',
            backgroundColor: 'white'
            
        },
        form: {
            border: 'inset',
            borderRadius: 10 + 'px',
            backgroundColor: 'white',
           
          
        },
      container: { display: "flex", border:  ' inset' , 
      borderRadius: 10 + 'px',flexWrap: "wrap", position: "absolute",   justifyContent: 'center', top:100, left: 700, alignItems: "center" }
  
        // radio: {
        //     color: "white"
        // },
      
    }));
    
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory();
    const { register, handleSubmit, formState: { errors } , reset} = useForm();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //const isUserLogin = useSelector(state => state)

    const handleChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    }

    const handleChangePassowrd = (e) => {
        const password = e.target.value;
        setPassword(password);
    }


    const onSubmit = (data) => {
        let User_Storage_data = JSON.parse(localStorage.getItem(`${data.email}`))
        console.log('User_Storage_data', User_Storage_data);

        if (User_Storage_data?.userProfileData != null &&
            User_Storage_data?.userProfileData.email == data.email &&
            User_Storage_data?.userProfileData.password == data.password) {

            let userData = {
                userProfileData: data,
                token: true,
                numberOfBooking: User_Storage_data.numberOfBooking,
                flightData: []
            }

            dispatch({ type: 'UPDATE_USER', payload: [true, userData, User_Storage_data.numberOfBooking] })

            if (window.confirm("Login Successfull!")) {
                localStorage.setItem(`${data.email}`, JSON.stringify(userData))
                history.replace("/")
            }
        } else {
            alert("No user exist!")
        }
        reset();
    }

    return (
        <div className={classes.root}>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container style={{minHeight: '100vh'}}>
            <Grid item xs={12} sm={12}>
                <img  src = "/images/original.jpg"
                style= {{width: "100%", height : "100%", objectFit: "cover", opacity: 0.5, marginTop: 100}}
                alt="error"/>
            </Grid>

            <Container className={classes.container} maxWidth="xs"  justify="center">
            <Grid container item 
            xs={12} sm={6} 
            style={{padding: 10}}
            alignItems="center"
            direction="column"
           
            justifyContent="space-between">
            <div/>
            <div style ={{display:"flex", flexDirection:"column" , maxWidth:400, minWidth: 300}}>
            <Grid container justify="center">
           
                </Grid>  
                <label>Email</label>
                    <input
                        name="email"
                        onChange={handleChangeEmail}
                        //value={email}
                        type="email"
                        {...register("email", {
                            required: true, pattern: /^\S+@\S+$/i
                        })}>
                    </input>
                    {errors.email && <p>This email field is required</p>}


                    <label>Password</label>
                    <input
                        name="password"
                        margin="normal"
                        //value={password}
                        onChange={handleChangePassowrd}
                        type="password"
                        {...register("password", {
                            required: true, minLength: 6
                        })}
                        >
                    </input>
                    {errors.password && <p>This email field is required</p>}


                <div style={{height:20}}/>
                <Button type ="submit" color="primary" variant="contained">Login</Button>
                <div style={{height:20}}/>
                
          

            
               

            </div>
            </Grid>

            </Container>
        </Grid>
        </form>
        </div>
    )
}

// const styles = {
//     buttonStyle: {
//       color: '#000',
//       backgroundColor: 'white',
//       marginRight: 10
//     }
//   }
export default Login;
