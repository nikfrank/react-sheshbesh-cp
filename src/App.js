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
    whiteHome: 15,
    whiteJail: 4,
    blackHome: 15,
    blackJail: 4,
  }

  spaceClicked = (index)=> {
    console.log(index);
  }

  render() {
    return (
      <div className="App">
        <Board chips={this.state.chips} onClick={this.spaceClicked}
               whiteJail={this.state.whiteJail} whiteHome={this.state.whiteHome}
               blackJail={this.state.blackJail} blackHome={this.state.blackHome} />
      </div>
    );
  }
}

export default App;
