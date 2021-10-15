import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './pages/1_loginPage';
import SignUp from './pages/1_signupPage';
import Loading from './pages/1_loadingPage';
import SignUpLoading from './pages/1_signuploadingPage';
<<<<<<< HEAD
import MainPage from './pages/2_mainPage';
import RoomReservationPage from './pages/u2_roomReservationPage';
import RoomCheckPage from './pages/u1_roomCheckPage';
import LoginNoti from './pages/1_loginNotificationPage';
=======
import MainPage from './pages/2a_mainPage';
import NotificationPage from './pages/3a_notificationPage';
import UserManagePage from './pages/4a_userManagePage';
>>>>>>> 11fb9eb6c2b9e4431b9f2ba9d3d4502bd80bf5aa

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/sign-in" component={Login} />
          <Route path="/loading" component={Loading} />
<<<<<<< HEAD
          <Route path="/login-noti" component={LoginNoti} />
          <Route path="/main" component={MainPage} />
          <Route path="/sign-up-loading" component={SignUpLoading} />
          <Route path="/room-reservation" component={RoomReservationPage} />
          <Route path="/room-check" component={RoomCheckPage} />
=======
          <Route path="/sign-up" component={SignUp} />
          <Route path="/sign-up-loading" component={SignUpLoading} />

          <Route path="/main" component={MainPage} />
          <Route path="/notification" component={NotificationPage} />
          <Route path="/seat-management" component={UserManagePage} />
>>>>>>> 11fb9eb6c2b9e4431b9f2ba9d3d4502bd80bf5aa
        </Switch>
      </div>
    </Router>
  );
}

export default App;
