import React from 'react';
import EllipsisIcon from '../ellipsisIcon/ellipsisIcon'
import "./card.css";

export default class Card extends React.Component {
  render() {
    const {
      wod,
    } = this.props;
    return (
      <React.Fragment>
        <div className="card">
        <EllipsisIcon />
          <span>{wod}</span>
        </div>
      </React.Fragment>
    );
  }
}
