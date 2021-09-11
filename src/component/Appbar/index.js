import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from "@material-ui/core"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { UserListContext } from '../../App'
import { useSelector, useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();
  const isUserLogin = useSelector(state => state)
  const [login, setLogin] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()
  const value = useContext(UserListContext)
  // console.log('value in Appbarr: ', value);
  // console.log("isUserLogin", isUserLogin);
  // useEffect(() => {
  //   var username = localStorage.getItem("username");
  //   var password = localStorage.getItem("password");
  //   if (username != null && password != null) {
  //     window.location.href = "../.../menu" // Assign your url to location href
  //   } else {
  //     console.log("Don't have any key inside localStorage");
  //   }
  // }, [])

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>

        <Link to="/">
            <Button  onClick={() => Link}>{"Home"}</Button>
          </Link>

          {isUserLogin.login &&
            <Button
              onClick={() => history.push('/booking')}>
              {"Booking"}
            </Button>
          }
         
          <Grid container justify="flex-end">

          {!isUserLogin.login &&
            <Button
              style={styles.buttonStyle}
              onClick={() => history.push('/register')}
            >{"Register"}
            </Button>
          }

          {isUserLogin.login ?
            <Button align="right"
              style={{ backgroundColor: '#fff', color: '#000' }}
              onClick={() => {
                dispatch({ type: 'UPDATE_USER', payload: false })
                let userData = {
                  userProfileData: value[0]?.userProfileData,
                  token: false
                }
                localStorage.setItem(`${value[0]?.email}`, JSON.stringify(userData))
                history.replace('/')
              }}>
              {"Logout"}
            </Button>
            :
            <Button
            style={styles.buttonStyle}
              onClick={() => history.push('/login')}>
              {"Login"}
            </Button>
          }
          </Grid>

         
        </Toolbar>
      </AppBar>
    </div>
  );
}
const styles = {
  buttonStyle: {
    color: '#000',
    backgroundColor: 'white',
    marginRight: 10
  }
 ,
    button: {
      display: "flex",
      justifyContent: "flex-end"
    }
  };
