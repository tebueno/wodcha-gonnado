import React, { Component } from 'react';
import Card from 'components/card/card';
import 'css/layout.css';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { Link } from 'react-router-dom'; 

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.masonry = React.createRef();
  }

componentDidMount() {
  this.page = 1;
  this.props.fetchWods(this.page);
  window.addEventListener('scroll', this.handleScroll);
}

componentWillUnmount() {
  window.removeEventListener('scroll', this.handleScroll);
}

handleScroll = () => {
  const { current: masonryElm } = this.masonry; 
  let container = -1 * masonryElm.getBoundingClientRect().top + window.innerHeight;
  let height = Math.floor(masonryElm.getBoundingClientRect().height);

  if (container >= height) { 
      this.page++;
      this.props.fetchWods(this.page);
  }
};

setRowSpan = (elm) => {
  if(elm) {
    const span = elm.querySelector('span');
    const height = span.offsetHeight;
    const rowSpan = Math.ceil((height + 25) / 125);
    elm.parentElement.style.gridRowEnd = `span ${rowSpan}`;
  }
}

render() {
  const cards = this.props.wods.map(wod => {
    return (
      <Card key={wod.id} {...wod}>
        <div ref={span => this.setRowSpan(span)}>
          <Link to={`/workout/${wod.id}`}>
            <div>
              <span>{wod.wod}</span>
            </div>
          </Link>
        </div>
      </Card>
    );
  });

  return (
    <div id='masonry' ref={this.masonry}>
    {cards}
    </div>
  )
}
}

const mapStateToProps = (state) => { 
  return { wods: state.wods }
}

export default connect(mapStateToProps, actions)(HomePage);
