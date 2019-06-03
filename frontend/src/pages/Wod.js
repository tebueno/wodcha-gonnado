import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import Typehead from '../components/typehead/typehead';
class Wod extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { wodId } = this.props.match.params;
    this.props.fetchWodById(wodId);
  }

  handleSubmit = e => {
    let movements = [...this.state.movements];
    movements.push(this.state.movement);
    this.setState({ movements: movements });
  };

  render() {
    const { workout, _id: id, link, movements = [] } = this.props.wodObj;

    return (
      <div>
        <div>ID: {id}</div>
        <div>
          Link: <a href={link}>{link}</a>
        </div>
        <textarea
          rows='25'
          cols='50'
          onChange={(event) => this.props.changeWorkoutTxt(event.target.value)}
          value={workout}
        />
        <h2>Movements</h2>
        <label>Add a Movement:</label>
        <Typehead
          filteredData={this.props.movements}
          onChange={this.props.searchMovements}
        />
        <ul>
          {movements.map(movement => (
            <li onClick={() => this.props.removeMovement(movement)}>{movement}</li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    wodObj: state.wodObj,
    movements: state.movements,
  }
}

export default connect(mapStateToProps, actions)(Wod);
