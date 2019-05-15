import React from 'react';
import EllipsisIcon from '../ellipsisIcon/ellipsisIcon'
import "./card.css";
export default class Card extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { children: content } = this.props;
    return (
      <div className='card'>
        <EllipsisIcon />
          {content}
      </div>
    );
  }
}
