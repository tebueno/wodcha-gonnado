import React from 'react';
import EllipsisIcon from '../ellipsisIcon/ellipsisIcon'
import "./card.css";

export default class Card extends React.Component {
  render() {
    const {
      wod
      //className = 'card',
    } = this.props;

    return (
      <React.Fragment>
        <div className="card">
        <EllipsisIcon />
          {wod}
        </div>
      </React.Fragment>
    );
  }
}
