import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom'

import Home from "./containers/Home/Home";
import Movie from "./containers/Movie/Movie";
import Add from "./containers/Add/Add";
import Search from "./containers/Search"
class App extends Component{
  render(){    
    return (
      <div className='container-fluid'>
        <Switch>                        
          <Route exact path="/search" component={Search}/>
          <Route path="/addMovie" component={Add}/>
          <Route path="/:id" component={Movie}/>          
          <Route path="/" component={Home}/>
        </Switch>
      </div>
    )
  }
}


export default App;