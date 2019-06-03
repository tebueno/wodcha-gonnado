import React from 'react';

const Typehead = ({ filteredData, onChange, ...rest }) => {
  return (
    <React.Fragment>
      <input
        placeholder='Thruster, Box Jump...Sqaut Clean Snatch Jerk'
        type='text'
        onChange={e => onChange(e.target.value)}
      />
      <ul>
        {filteredData.map(val => (
          <li>{val}</li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Typehead;
