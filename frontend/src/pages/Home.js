import React, { Component } from "react";
import Card from '../components/card/card';
import WodPage from './Wod';
import { Route,Link } from 'react-router-dom';
import '../css/layout.css';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wods: [],
      page: 1,
      pageSize: 15,
    };

  }

  componentDidMount() {
    this.getWOD(this.state.page);

    window.addEventListener('scroll', this.handleScroll)

  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll = () => {
    let { page } = this.state;
    let container = -1 * document.querySelector('#masonry').getBoundingClientRect().top + window.innerHeight;
    let height = Math.floor(document.querySelector('#masonry').getBoundingClientRect().height);

    if (container >= height) { 
       this.setState({
         page: ++page,
       });
       this.getWOD(page);
    }
  };

  addSpanRow = () => {

    document.querySelectorAll('.card > span')
      .forEach(item => {
        let height = item.offsetHeight;
        let rowSpan = Math.ceil((height + 25) / 125); 
        item.parentElement.style.gridRowEnd = `span ${rowSpan}`;
    });

  }

  getWOD = (page) => {
    fetch(`http://localhost/api/wods/all?size=${this.state.pageSize}&page=${page}`)
      .then(response => response.json())
      .then(data => {
        let cleanData = data.map(entry => {
          return {
            id: entry._id,
            wod: entry.workout.replace(/\n\n\n|\n\n/g, '')
          };
        });

        let wodList = this.state.wods;
        cleanData = wodList.concat(cleanData);

        this.setState({
          wods: cleanData
        });
        this.addSpanRow()

      })
      .catch(() => {
        this.setState({
          wods: 'Not found'
        });
      });
  }

  handleClick = (e) => {
    const index = e.target.getAttribute('index');
    if(index !== null) {
      console.log(index);
      window.location.replace(`http://localhost/workout/${index}`);
    }
  }

  render() {
    const cards = this.state.wods.map(wod => <Card click={this.handleClick} key={wod.id} {...wod} />);
    const { wods } = this.state;

    return (
    <div id='masonry'>
    {cards}
    </div>
    
    )}
}

export default HomePage;
