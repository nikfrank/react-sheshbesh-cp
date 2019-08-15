import React from 'react';
import './App.css';

import Board from './Board';

class App extends React.Component {

  state = {
    chips: [
      2, 0, 0, 0, 0, -5,
      0, -3, 0, 0, 0, 5,
      -5, 0, 0, 0, 3, 0,
      5, 0, 0, 0, 0, -2,
    ],
    whiteHome: 0,
    whiteJail: 0,
    blackHome: 0,
    blackJail: 0,
  }

  spaceClicked = (index)=> {
    console.log(index);
  }

  render() {
    return (
      <div className="App">
        <Board chips={this.state.chips} onClick={this.spaceClicked} />
      </div>
    );
  }
}

export default App;
