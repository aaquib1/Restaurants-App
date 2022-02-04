import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from "./components/Home"
import RestaurantCreate from "./components/RestaurantCreate"
import RestaurantDetails from "./components/RestaurantDetails"
import RestaurantSearch from "./components/RestaurantSearch"
import RestaurantUpdate from "./components/RestaurantUpdate"
import RestaurantList from "./components/RestaurantList"
import Login from "./components/Login"
import Logout from './components/Logout';

function App() {
  return (
    <div className="App">
      <Router>

        <Route path="/list">
          <RestaurantList />
        </Route>
        <Route path="/create">
          <RestaurantCreate />
        </Route>
        <Route path="/search">
          <RestaurantSearch />
        </Route>
        <Route path="/details">
          <RestaurantDetails />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/update/:id"
          render={props => (
            <RestaurantUpdate {...props} />
          )}>
        </Route>
        <Route path="/login"
          render={props => (
            <Login {...props} />
          )}>
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Router>
    </div>
  );
}

export default App;
