import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
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
        <input
          placeholder='Thruster, Box Jump...Sqaut Clean Snatch Jerk'
          type='text'
          onChange={(e) => this.props.searchMovements(e.target.value)}
        />
        <ul>{this.props.movements.map(val => <li>{val}</li>)}</ul>
        {/* <input onClick={this.handleSubmit} type='submit' value='Add Movement' /> */}
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
