import "./app.scss";
import { BrowserRouter as Router, Routes, Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";



const App = () => {
  const user = true;
  return (
    <Router>
    <Switch>
    <Route exact path="/">
        {user ? <Home /> : <Redirect to="register" />}
      </Route>
    <Route  path="/register">
        <Register />
      </Route>
      <Route path="/login" component= {Login} />
        
          
      <Route path="/movies">
        <Home  type="movies"/>
      </Route>

      <Route path="/series" component= {Home} />
      
      <Route path="/watch">
        <Watch />
      </Route>

    </Switch>
    </Router>
  )
};

export default App;