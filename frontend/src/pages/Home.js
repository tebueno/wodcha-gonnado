import React, { Component } from "react";
import Card from 'components/card/card';
import 'css/layout.css';
import { connect } from 'react-redux';
import * as actions from 'actions';

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.page = 1;
    this.props.fetchWods(this.page).then(() => this.addSpanRow());
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    let container = -1 * document.querySelector('#masonry').getBoundingClientRect().top + window.innerHeight;
    let height = Math.floor(document.querySelector('#masonry').getBoundingClientRect().height);

    if (container >= height) { 
       this.page++;
       this.props.fetchWods(this.page).then(() => this.addSpanRow())
    }
  };

  addSpanRow = () => {

    // TODO: make this less brittle
    document.querySelectorAll('.card > div > span ')
      .forEach(item => {
        const height = item.offsetHeight;
        const rowSpan = Math.ceil((height + 25) / 125); 
        item.parentElement.parentElement.style.gridRowEnd = `span ${rowSpan}`;
    });

  }

  render() {
    const cards = this.props.wods.map(wod => <Card key={wod.id} {...wod} />);

    return (
      <div id='masonry'>
      {cards}
      </div>
    )
  }
}

const mapStateToProps = (state) => { 
  return { wods: state.wods }
}

export default connect(mapStateToProps, actions)(HomePage);
