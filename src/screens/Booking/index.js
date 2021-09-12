import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Booking() {
  const isUserLogin = useSelector(state => state)
  const classes = useStyles();
  const [getData, setState] = React.useState([])
  const [flag, setFlag] = React.useState(true)

  var arrNum = []
  React.useEffect(() => {
    for (var i = 0, len = localStorage.length; i < len; ++i) {
      console.log("THIS IS FLIGHTSS--->", JSON.parse(localStorage.getItem(`${isUserLogin?.userData?.userProfileData?.email} ${i}`)))
      arrNum.push(JSON.parse(localStorage.getItem(`${isUserLogin?.userData?.userProfileData?.email} ${i}`)))
    }
    console.log("arrNum.length", arrNum.length);
    setState(arrNum)
  }, [flag])
  console.log('getData', getData);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell >From</TableCell>
              <TableCell >To</TableCell>
              <TableCell >Date</TableCell>
              <TableCell >Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getData.length > 1 ?
              getData.map((item) => {
                if (item == null) return;
                return (<TableRow >
                  <TableCell></TableCell>
                  <TableCell>{item?.flightData?.from}</TableCell>
                  <TableCell >{item?.flightData?.to}</TableCell>
                  <TableCell >{item?.flightData?.adult}</TableCell>
                  <TableCell >{item?.flightData?.Class}</TableCell>
                  <TableCell >
                    <div onClick={() => {
                      localStorage.removeItem(`${item?.userProfileData?.email} ${item?.numberOfBooking}`)
                      setFlag(!flag)
                      alert('Deleted Successfully!')
                    }}>
                      <DeleteIcon />
                    </div>
                  </TableCell>
                </TableRow>)
              })
              :
              <TableRow >
                <TableCell > <h1>No Flights booked yet! :( </h1>
                </TableCell>
              </TableRow>

            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

