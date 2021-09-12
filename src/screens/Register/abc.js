import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { useForm, Controller } from "react-hook-form";
import { Grid , Button} from "@material-ui/core";
import ReactDatePicker from "react-datepicker";

export default function BuildAd() {
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm();
  const [selectedValue, setSelectedValue] = React.useState();
  const [startDate, setStartDate] = React.useState()
  const [endDate, setEndDate] = React.useState()

  const onSubmit = (data) => alert(JSON.stringify(data, null, 2));

  return (
    <div style={{ padding: 16, maxWidth: 600 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <FormControl component="fieldset">
          <FormLabel component="legend">Gender</FormLabel>
          <Controller
            rules={{ required: true }}
            control={control}
            //defaultValue="business"
            name="promoting2"
            render={({ field }) => {
              const {  onBlur, onChange, value } = field;
              return (
                <RadioGroup
                  value={value}
                  onBlur={onBlur}
                  onChange={(e) => {
                    onChange(e);
                    console.log(e.target.value);
                  }}
                >
                  <FormControlLabel
                    checked={selectedValue === 'One-way'}
                    onChange={(e)=> setSelectedValue(e.target.value)}
                    defaultValue="One-way"
                    value="One-way"
                    name="trip"
                    label="One-way"
                    required={true}
                    control={<Radio />} />
                  <FormControlLabel
                    checked={selectedValue === 'Round-trip'}
                    onChange={(e)=> setSelectedValue(e.target.value)}
                    value="Round-trip"
                    name="trip"
                    label="Round-trip"
                    control={<Radio />} />
                   {errors.promoting2 && <p>This field is required</p>}
                </RadioGroup>
              );
            }}
          />
        </FormControl> */}

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


            <Grid container spacing={6}>
              <Grid item xs={12} >
                <Button fullWidth variant="contained" color="default"
                  style={{ maxWidth: '300px', margin: '0 auto', display: "flex" , marginBottom: '10px'}}
                  type="submit" > Book </Button>
              </Grid>
            </Grid>

      </form>
    </div>
  );
}
