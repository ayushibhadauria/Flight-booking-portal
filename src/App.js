import React, { createContext } from 'react'
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './screens/Login'
import Register from './screens/Register';
import LandingPage from './screens/LandingPage';
import Booking from './screens/Booking';
import Appbar from './component/Appbar'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducer/reducer'
import Success from './component/BookFlight/success';

var loggedInUser
var userList = []
export const UserListContext = createContext()
const store = createStore(reducer)

function App() {
  const [userData, setUserData] = React.useState([])

  React.useEffect(() => {
    // localStorage.clear() 

    for (var i = 0, len = localStorage.length; i < len; ++i) {
      // console.log("App.js", localStorage.getItem(localStorage.key(i)));
      userList.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
    }
    // console.log("userList", userList);
    loggedInUser = userList.filter((item) => item.token == true)
    // console.log('loggedInUser', loggedInUser);
    setUserData(loggedInUser)
  }, [])


  return (
    <Provider store={store}>
      <UserListContext.Provider value={userData}>
        <Router >
        <Appbar />
          <Route path={"/"} strict exact component={LandingPage} />
          <Route path={"/booking"} strict exact component={Booking} />
          <Route path={"/login"} strict exact component={Login} />
          <Route path={"/register"} strict exact component={Register} />
          <Route path={"/success"} strict exact component={Success} />
        </Router>
      </UserListContext.Provider>
    </Provider>
  );
}

export default App;
