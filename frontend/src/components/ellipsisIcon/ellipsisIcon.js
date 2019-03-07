import React from "react";
import './ellipsisIcon.css';

export default class EllipsisIcon extends React.Component {
  render() {
    return (
      <React.Fragment>
    <div className = 'card__ellipsis'>
        <svg
          viewBox="0 0 24 24"
          width="24px"
          height="24px"
          x="0"
          y="0"
          preserveAspectRatio="xMinYMin meet"
          focusable="false"
        >
          <path d="M2,7H4V9H2V7ZM7,9H9V7H7V9Zm5-2V9h2V7H12Z" />
        </svg>
        </div>
      </React.Fragment>
    );
  }
}
