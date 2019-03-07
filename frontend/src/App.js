import React, { Component } from "react";
import Card from "./components/card/card";

import './css/layout.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wod: []
    };
    this.getQuote = this.getWOD.bind(this);
  }

  componentDidMount() {
    this.getWOD();
  }

  getWOD() {
    fetch("http://localhost/api/random")
      .then(response => response.json())
      .then(data => {
        const formatWod = data.workout.replace(/\n\n\n/g, "");
        const arryWod = new Array(10).fill(formatWod);
        this.setState({
          wod: arryWod
        });
      })
      .catch(() => {
        this.setState({
          wod: "Not found"
        });
      });
  }

  render() {
    debugger;
    const cards = this.state.wod.map(workout => {
      const wodObj = { wod: workout };
      return <Card {...wodObj} />;
    });

    return <div id='workouts'>{cards}</div>;
  }
}

export default App;
