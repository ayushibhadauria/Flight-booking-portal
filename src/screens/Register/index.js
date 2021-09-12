import React, { useRef } from 'react'
import { useForm } from "react-hook-form";
import { RadioGroup, FormControlLabel, Radio, Grid, Container, makeStyles, Button, TextField } from '@material-ui/core';
import {useDispatch } from 'react-redux'

const Register = () => {
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
      container: { 
          display: "flex", flexWrap: "wrap", 
          position: "absolute",   
          justifyContent: 'center', 
          top: 100, left: 700, 
          alignItems: "center" }
    }));

    const classes = useStyles();
    const dispatch = useDispatch()
    const [gender, setGender] = React.useState('female');
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const password = useRef();
    password.current = watch("password");

    const handleChange = (e) => {
        const gender = e.target.value;
        setGender(gender);
    }

    const onSubmit = (data) => {
        let userData = {
            userProfileData: data,
            token: false,
            numberOfBooking: 0,
            flightData: []
        }
        localStorage.setItem(`${data?.email}`, JSON.stringify(userData))
        alert("Registered Successfully !")
        reset();
    }

    return (
        <div className={classes.root} >
            <form  onSubmit={handleSubmit(onSubmit)}>
            <Grid container style={{minHeight: '100vh'}}>
            <Grid item xs={12} sm={12}>
                <img  src = "/images/original.jpg"
                style= {{width: "100%", height : "100%", objectFit: "cover", opacity: 0.5, marginTop: 100}}
                alt="error"/>
            </Grid>

                <Container className={classes.container} maxWidth="xs"  justify="center">
                    <Grid container spacing={2} >
                        <Grid item xs={6}>
                            <Grid item xs={12}>
                                <label >First Name</label>
                            </Grid>
                            <Grid item xs={12}>
                                <input
                                    name="fname" type="text"
                                    {...register("fname", {
                                        required: true,
                                    })}>
                                </input>
                                {errors.fname && <p>This field is required</p>}
                            </Grid>
                        </Grid>

                        <Grid item xs={6}>
                            <Grid item xs={12}>
                                <label>Last Name</label>
                            </Grid>
                            <Grid item xs={12}>
                                <input
                                    name="lname" type="text"
                                    {...register("lname", {
                                        required: true,
                                    })}>
                                </input>
                                {errors.lname && <p>This field is required</p>}
                            </Grid>
                        </Grid>
                    </Grid>


                    <Grid container spacing={1} >
                        <Grid item xs={12}>
                            <label>Gender</label>
                        </Grid>
                        <Grid item xs={12}>
                            <RadioGroup color="default" row aria-label="gender" name="gender1"
                                value={gender} onChange={handleChange}>
                                <Grid item xs={3} >
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                </Grid>
                                <Grid item xs={3} >
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                </Grid>
                                <Grid item xs={3} >
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                </Grid>
                            </RadioGroup>
                            {errors.gender1 && <p>This field is required</p>}
                        </Grid>
                    </Grid>


                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <label >Email</label>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                name="email"
                                type="email"
                                {...register("email", {
                                    required: true, pattern: /^\S+@\S+$/i
                                })}>
                            </TextField>
                            {errors.email && <p>This email field is required</p>}
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <label >Password</label>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                name="password"
                                type="password"
                                {...register("password", {
                                    required: true, minLength: 6
                                })}>
                            </TextField>
                            {errors.password && errors.password.type === "required"
                                && <p> This field is required</p>}
                            {errors.password && errors.password.type === "minLength"
                                && <p> Password must have at least 6 characters</p>}
                        </Grid>
                    </Grid>


                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <label >Confirm Password</label>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                name="confirmpassword"
                                type="password"
                                size="small"
                               // variant= 'standard'
                                //style ={{ backgroundColor:"white"}}
                                {...register("confirmpassword", {
                                    required: true,
                                    validate: (value) =>
                                        value === password.current
                                })}
                                >
                            </TextField>
                            {errors.confirmpassword && errors.confirmpassword.type === "required"
                                && <p> This password confirm field is required</p>}
                            {errors.confirmpassword && errors.confirmpassword.type === "validate"
                                && <p>The passwords do not match</p>}
                        </Grid>
                    </Grid>

                    <Grid container spacing={6}>
                        <Grid item xs={12} >
                            <Button fullWidth variant="contained" color="primary"
                                style={{ maxWidth: '400px', margin: '0 auto', display: "flex" , marginTop: 12}}
                                type="submit" >Register  </Button>
                        </Grid>
                    </Grid>
                </Container>
                </Grid>
            </form>
        </div>
    )
}
export default Register;


