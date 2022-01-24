import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Homepage from "./components/HomePage";
import NotFound from "./components/NotFound";
import Header from "./components/Header";
import Users from "./components/Users";
import UsersActions from "./components/UsersActions";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/actions" exact component={UsersActions} />
          <Route Path="/users" exact component={Users} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
