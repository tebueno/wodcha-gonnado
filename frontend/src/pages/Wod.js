import React, { Component } from 'react';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            link: '',
            workout: '',
        }
    }

    componentDidMount() {
        const { wodId } = this.props.match.params;

        fetch(`http://localhost/api/wods/${wodId}`).then(resp => resp.json())
        .then(resp => {
            console.log(resp);
            this.setState({
                id: resp._id,
                link: resp.link,
                workout: resp.workout,
            });
        });
    }

    handleChange = (e) => {
        const textValue = e.target.value;
        this.setState({
            workout: textValue,
        })
    }

    render() { 
        const { 
            workout,
            id,
            link } = this.state;
        return ( <div>
            <div>ID: {id}</div>
            <div>Link: {link}</div>
            <textarea rows='25' cols='50' onChange={this.handleChange} value={workout}/>
            </div>);
    }
}