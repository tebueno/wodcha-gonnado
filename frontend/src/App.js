import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        wod: '',         
    }
    this.getQuote = this.getWOD.bind(this);
}

componentDidMount() {
    this.getWOD();
}

getWOD() {
  fetch('/random').then(response => response.json())
  .then((data) => {
    this.setState( 
    {
        wod: data.workout
    });
}).catch(() => {
    this.setState( 
        {
            wod: "Not found"
        });
});
}
  render() {
    return (
      <div>
      {this.state.wod}
      </div>
    );
  }
}

export default App;
