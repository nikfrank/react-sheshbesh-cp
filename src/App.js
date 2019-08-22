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

    turn: 'white',
    dice: [],
    selectedChip: 20,
  }

  spaceClicked = (index)=> {
    console.log(index);

    // if no dice, do nothing (wait for roll)

    // if turn is in jail
    //// if click is on valid move, this.makeMove(index) (return)

    // (implicit else)

    // if no chip selected
    //// if click is on turn's chips, select that chip (return)

    // else this is a second click
    //// if the space selected is a valid move, this.makeMove(index)
    //// if another click on the selectedChip, unselect the chip
    //// if it's a doubleClick / long press & chip can go home, makeMove(go home)
  }

  makeMove = (to)=> {
    // using this.state.selectedChip / jail as from

    // remove used die from dice

    // reduce a chip from the from
    // increase a chip in the to
    // if the to is a single opponent, move it to jail


    // if the to is home, move there, check if game is over

    // check if turn is over

    // if over, compute & set next player (blockade -> same, otherwise toggle)
  }

  roll = ()=> {
    if( this.state.dice.length ) return;

    this.setState({ dice: [ Math.random()*6 +1, Math.random()*6 +1 ].map(Math.floor) }, ()=>{
      if( this.state.dice[0] === this.state.dice[1] )
        this.setState({
          dice: [...this.state.dice, ...this.state.dice],
        });
    })
  }

  render() {
    return (
      <div className="App">
        <Board chips={this.state.chips} onClick={this.spaceClicked}
               selectedChip={this.state.selectedChip}
               whiteJail={this.state.whiteJail} whiteHome={this.state.whiteHome}
               blackJail={this.state.blackJail} blackHome={this.state.blackHome} />

        <button onClick={this.roll}>roll</button>
        {this.state.dice}
      </div>
    );
  }
}

export default App;
