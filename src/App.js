import React, {Component} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Welcome from "./components/screens/Welcome";
import DeviceEditor from "./containers/screens/DeviceEditor";
import Networks from "./containers/screens/Networks";


export default class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <div>
            <Switch>
              <Route exact path="/welcome" component={Welcome} />
              <Route exact path="/edit/:networkId/:deviceId" render={
                ({match:{params:{networkId, deviceId}}}) => 
                  (<DeviceEditor networkId={networkId} deviceId={deviceId}/>)
              }/>
              <Route exact path="/networks" component={Networks}/>
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    );  
  }
}
