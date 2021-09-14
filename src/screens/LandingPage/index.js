import React, { useState, useEffect } from 'react';
import { TextField, RadioGroup, Radio, Button, Container, makeStyles, FormControl } from "@material-ui/core"
import { Grid } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useForm, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from 'react-redux'
import ReactDatePicker from 'react-datepicker'
import './page.css'
import '../../component/BookFlight/Count'
import Incredecre from '../../component/BookFlight/Count';
import { useHistory } from "react-router-dom";
import Adultcount from '../../component/BookFlight/Adultcount';
import { watchUpdateUser } from '../../sagas/saga'

export default function LandingPage(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      border: 'block',
      backgroundColor: 'black'
    },
    form: {

      backgroundColor: 'white'
    },
    container: {
      border: 'inset',
      borderRadius: 10 + 'px', display: "flex", flexWrap: "wrap", position: "absolute",
      justifyContent: 'center', top: 100, left: 650, alignItems: "center"
    }

  }));
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cities, setCities] = useState([]);
  const [selectedValue, setSelectedValue] = React.useState();
  const [startDate, setStartDate] = React.useState()
  const [endDate, setEndDate] = React.useState()

  const { register, control, handleSubmit, formState: { errors }, reset } = useForm();
  const [localData, setLocalData] = useState([]);
  const isUserLogin = useSelector(state => state)
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch()

  useEffect(() => {
    setLocalData(JSON.parse(localStorage.getItem(`${isUserLogin?.userData?.userProfileData?.email}`)))
  }, [])

  const onSubmit = (data) => {
    let objGenerator = watchUpdateUser()
    console.log("GEnereator console:-->", objGenerator.next())
    console.log("GEnereator console2222:-->", objGenerator.next('shobha'))
    return;
    // if (isUserLogin.login === true) {
    //   let userData = {
    //     userProfileData: isUserLogin.userData.userProfileData,
    //     token: true,
    //     numberOfBooking: isUserLogin.Num_of_Booking + 1,
    //     flightData: data
    //   }
    //   dispatch({ type: 'UPDATE_USER', payload: [true, userData, isUserLogin.Num_of_Booking + 1] })
     
    //   localStorage.setItem(`${isUserLogin.userData.userProfileData.email} ${isUserLogin.Num_of_Booking + 1}`, JSON.stringify(userData))
    //   //alert("Flight data saved!!!!")
    //   history.push('/success')
    // } else {
    //   alert("please login first!")
    //   history.push('/login')
    // }
    // reset();
  }

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/nshntarora/Indian-Cities-JSON/master/cities.json")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCities(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        })
  }, [])



  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className={classes.root} >
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container style={{ minHeight: '100vh' }}>
            <Grid item xs={12} sm={12}>
              <img src="/images/original.jpg"
                style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5, marginTop: 100 }}
                alt="error" />
            </Grid>

            <Container className={classes.container} maxWidth="sm"  >
              <FormControl component="fieldset">

                <Controller
                  rules={{ required: true }}
                  control={control}
                  //defaultValue="business"
                  name="promoting2"
                  render={({ field }) => {
                    const { name, onBlur, onChange, value } = field;
                    return (
                      <RadioGroup row
                        value={value}
                        onBlur={onBlur}
                        onChange={(e) => {
                          onChange(e);
                          console.log(e.target.value);
                        }}
                      >
                        <FormControlLabel
                          checked={selectedValue === 'One-way'}
                          onChange={(e) => setSelectedValue(e.target.value)}
                          //defaultValue="One-way"
                          value="One-way"
                          name="trip"
                          label="One-way"
                          required={true}
                          control={<Radio />} />
                        <FormControlLabel
                          checked={selectedValue === 'Round-trip'}
                          onChange={(e) => setSelectedValue(e.target.value)}
                          value="Round-trip"
                          name="trip"
                          label="Round-trip"
                          control={<Radio />} />
                        {errors.promoting2 && <p>This field is required</p>}
                      </RadioGroup>
                    );
                  }}
                />
              </FormControl>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Autocomplete
                    id="from"
                    options={cities}
                    getOptionLabel={(option) => option.name}
                    style={{ maxWidth: '400px', margin: '0 auto', display: "flex" }}
                    renderInput={(params) => <TextField {...params} label="From" variant="outlined" name="from" />}
                    {...register("from", {
                      required: true
                    })} />
                  {errors.from && <p>This field is required</p>}
                </Grid>

                <Grid item xs={6}>
                  <Autocomplete
                    id="to"
                    options={cities}
                    getOptionLabel={(option) => option.name}
                    style={{ maxWidth: '400px', margin: '0 auto', display: "flex" }}
                    renderInput={(params) => <TextField {...params} label="To" variant="outlined" name="to" />}
                    {...register("to", {
                      required: true
                    })} />
                  {errors.to && <p>This field is required</p>}
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <label >Depart on</label>
                  <Controller
                    control={control}
                    name="ReactDatepicker"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <ReactDatePicker
                        required
                        //onChange={onChange}
                        onChange={(date) => setStartDate(date)}
                        startDate={startDate}
                        endDate={endDate}
                        onBlur={onBlur}
                        selected={startDate}
                        minDate={new Date()}
                        dateFormat='dd/MM/yyyy'
                        filterDate={date => date.getDay() !== 6 && date.getDay() !== 0} />)} />
                </Grid>

                <Grid item xs={6}>
                  <label >Return on  </label>
                  <Controller
                    control={control}
                    name="ReactDatepicker"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <ReactDatePicker
                        required
                        //onChange={onChange}
                        onBlur={onBlur}
                        disabled={selectedValue !== "Round-trip"}
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        //  minDate={startdate}
                        dateFormat='dd/MM/yyyy'
                        filterDate={date => date.getDay() !== 6 && date.getDay() !== 0} />)} />
                </Grid>
              </Grid>


              <Grid container spacing={2}>

                <Grid item xs={6} style={{ marginTop: 20 }}>
                  <label >Adult count</label>
                  <Adultcount />

                  <label >Children count</label>
                  <Incredecre />

                  <label >Infant count</label>
                  <Incredecre />
                </Grid>

                <Grid item xs={6}>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Control
                      style={{ width: 232, padding: 10, marginTop: 20 }}
                      as="select"
                      name="Class">
                      <option>Economy</option>
                      <option>Premium Economy</option>
                      <option>Bussiness</option>
                    </Form.Control>
                  </Form.Group>
                </Grid>
              </Grid>

              <Grid container spacing={6}>
                <Grid item xs={12} >
                  <Button fullWidth variant="contained" color="default"
                    style={{ maxWidth: '300px', margin: '0 auto', display: "flex", marginBottom: '10px' }}
                    type="submit" > Book </Button>
                </Grid>
              </Grid>

            </Container>

          </Grid>
        </form>
      </div >
    );
  }
}
