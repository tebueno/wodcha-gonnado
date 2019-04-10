import React, { Component } from 'react';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workout: {}
        }
    }

    componentDidMount() {
        const { wodId } = this.props.match;
        // TODO: add get api for workoutID
        fetch(`http://localhost/api/wods/all`).then(resp => resp.json())
        .then(resp => {
            const workout = resp.filter(workout => workout.id === wodId)[0];
            this.setState({workout: workout});
        });
    }
    render() { 
        const { workout } = this.state;
        return ( <div>
            <div>ID: {workout._id}</div>
            <div>Link: {workout.link}</div>
            <div>Workout: {workout.workout}</div>
            </div>);
    }
}