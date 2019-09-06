import React from 'react';
import axios from 'axios';

const server='http://localhost:1000/';
class App extends React.Component{
  componentDidMount(){       
    axios.get(server+'movies')      
      .then(({data})=>console.log(data));
    axios.get(server+'actors')      
      .then(({data})=>console.log(data));
    axios.get(server+'producers')      
      .then(({data})=>console.log(data));
  };
  
  render(){
    return(
      <h1>Hi</h1>
      
    )
  }
}

export default App;