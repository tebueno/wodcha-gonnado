import React, { Component } from "react";
import Card from "./components/card/card";

import "./css/layout.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wod: [],
      page: 1,
    };

  }

  componentDidMount() {
    this.getWOD(this.state.page);

    window.addEventListener('scroll', () => {
      let { page } = this.state;
      let container = -1 * document.querySelector('#masonry').getBoundingClientRect().top + window.innerHeight;
      let height = Math.floor(document.querySelector('#masonry').getBoundingClientRect().height);

      if (container >= height) { 
         this.setState({
           page: ++page,
         });
         this.getWOD(page);
      }
    });

  }

  componentWillUnmount() {
    window.removeEventListener('scroll');
  }

  addSpanRow = () => {

    document.querySelectorAll('.card > span')
      .forEach(item => {
        let height = item.offsetHeight;
        let rowSpan = Math.ceil((height + 25) / 125); 
        item.parentElement.style.gridRowEnd = `span ${rowSpan}`;
    });

  }

  getWOD = (page) => {
    fetch(`http://localhost/api/wods/all?size=15&page=${page}`)
      .then(response => response.json())
      .then(data => {
        let cleanData = data.map(entry => {
          return {
            id: entry._id,
            wod: entry.workout.replace(/\n\n\n|\n\n/g, "")
          };
        });

        let wodList = this.state.wod;
        cleanData = wodList.concat(cleanData);

        this.setState({
          wod: cleanData
        });
        this.addSpanRow()

      })
      .catch(() => {
        this.setState({
          wod: "Not found"
        });
      });
  }

  render() {
    const cards = this.state.wod.map(workout => <Card key={workout.id} {...workout} />);

    return <div id='masonry'>{cards}</div>;
  }
}

export default App;
