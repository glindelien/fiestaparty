import React from 'react';

function Progress({ progress, limit }) {

  let supplies = [
    'Tequila',
    'Limes',
    'Cerveza',
    'Piñata',
    'Guacamole',
    'Tacos',
    'Playlist',
    'Balloons',
    'Confetti',
    'Friends'
  ];

  return (
    <div>
      <div>
        <span id="status">Fiesta Supplies Acquired: {progress}/{limit}</span>
      </div>
      <div id="progressBar">
        {supplies.map((item, index) => {
          if (index < progress) {
            return <div id="itemAcquired" key={index}><img id="img" src="logo.png"></img></div>;
          } else {
            return <div id="item" key={index}>{item}</div>;
          }
        })}
      </div>
    </div>
  );

}

export default Progress;

// check mark in HTML &#10003;
// refactor to make progressbar its own component
