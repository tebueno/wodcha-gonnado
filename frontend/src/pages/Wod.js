import React, { Component } from 'react';
import movements from '../movements.json';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      link: '',
      workout: '',
      movements: ['Thrusters', 'Pull-ups'],
      movement: ''
    };
  }

  componentDidMount() {
    const { wodId } = this.props.match.params;
    // TODO: abstract out the api calls? at least remove hardcoding :)
    fetch(`http://localhost/api/wods/${wodId}`)
      .then(resp => resp.json())
      .then(resp => {
        this.setState({
          id: resp._id,
          link: resp.link,
          workout: resp.workout
          // movements: resp.movements || [],
        });
      });
  }

  // TODO: combine reusable code
  handleChange = text =>  this.setState({ workout: text })

  handleSubmit = e => {
    let movements = [...this.state.movements];
    movements.push(this.state.movement);
    this.setState({ movements: movements });
  };

  handleMovementChange = searchText => {
    let display = movements.filter(elm => elm.label.toLowerCase().includes(searchText.toLowerCase())).map(elm => elm.label);
    this.setState({ dropdown: display });
  };

  handleRemove = movement => {
    let { movements } = this.state;
    movements = movements.filter(item => item !== movement);
    this.setState({ movements: movements });
  };

  render() {
    const { workout, id, link, movements, dropdown = [] } = this.state;

    return (
      <div>
        <div>ID: {id}</div>
        <div>
          Link: <a href={link}>{link}</a>
        </div>
        <textarea
          rows='25'
          cols='50'
          onChange={(event) => this.handleChange(event.target.value)}
          value={workout}
        />
        <h2>Movements</h2>
        <label>Add a Movement:</label>
        <input
          placeholder='Thruster, Box Jump...Sqaut Clean Snatch Jerk'
          type='text'
          onChange={(e) => this.handleMovementChange(e.target.value)}
        />
        <ul>{dropdown.map(val => <li>{val}</li>)}</ul>
        {/* <input onClick={this.handleSubmit} type='submit' value='Add Movement' /> */}
        <ul>
          {movements.map(movement => (
            <li onClick={() => this.handleRemove(movement)}>{movement}</li>
          ))}
        </ul>
      </div>
    );
  }
}
