import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import Destination from './components/Destination/Destination';
import DestinationTimeline from './components/DestinationTimeline/DestinationTimeline';
import Blog from './components/Blog/Blog';
import Contact from './components/Contact/Contact';
import NotFound from './components/NotFound/NotFound';
import Login from './components/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser,setLoggedInUser]  = useState({});
  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
    <Router>
      <Header />
      <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <PrivateRoute path="/destination">
            <Destination />
          </PrivateRoute>
          {/* <PrivateRoute path="/destinationtimeline">
            <DestinationTimeline />
          </PrivateRoute> */}
          <Route path='/destinationtimeline'>
            <DestinationTimeline />
          </Route>
          <Route path='/blog'>
            <Blog />
          </Route>
          <Route path='/contact'>
            <Contact />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
    </Router>
    </UserContext.Provider>
  )
}

export default App;
