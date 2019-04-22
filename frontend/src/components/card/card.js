import React from 'react';
import EllipsisIcon from '../ellipsisIcon/ellipsisIcon'
import "./card.css";
import { Link } from 'react-router-dom'; 

export default class Card extends React.Component {
  render() {
    const {
      wod,
      id,
    } = this.props;
    return (
      <React.Fragment>
      <Link to={`/workout/${id}`} className='card'> 
        <div index={id}>
        <EllipsisIcon />
          <span>{wod}</span>
        </div>
         </Link> 
      </React.Fragment>
    );
  }
}
