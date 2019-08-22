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
    selectedChip: null,
  }

  spaceClicked = (index)=> {
    const direction = this.state.turn === 'black' ? 1 : -1;

    // if no dice, do nothing (wait for roll)
    if( !this.state.dice.length ) return;

    // if turn is in jail
    if( this.state[ this.state.turn + 'Jail' ] ){
      //// if click is on valid move, this.makeMove(index) (return)
      if( (this.state.turn === 'black') && (index > 5) ) return;
      if( (this.state.turn === 'white') && (index < 18) ) return;
      if( (this.state.turn === 'black') && !this.state.dice.includes(index+1) ) return;
      if( (this.state.turn === 'white') && !this.state.dice.includes(24-index) ) return;

      if( (this.state.chips[index] * direction >= 0) ||
           (Math.abs(this.state.chips[index]) === 1) ){

        this.makeMove(index);
      }

      return;
    }

    // (implicit else)

    // if no chip selected
    if( this.state.selectedChip === null ){
      //// if click is on turn's chips, select that chip (return)
      if( ((this.state.chips[index] > 0) && (this.state.turn === 'black')) ||
          ((this.state.chips[index] < 0) && (this.state.turn === 'white')) ){
        this.setState({ selectedChip: index });
      }

    } else {
      // else this is a second click
      //// if the space selected is a valid move, this.makeMove(index)
      if( this.state.dice.includes(direction * (index - this.state.selectedChip)) ){
        if( (this.state.chips[index] * direction >= 0) ||
             Math.abs(this.state.chips[index]) === 1 ){
          this.makeMove(index);
        }
      }

      //// if another click on the selectedChip, unselect the chip
      if( index === this.state.selectedChip ){
        this.setState({ selectedChip: null });
      }

      //// if it's a doubleClick / long press & chip can go home, makeMove(go home)
    }
  }

  makeMove = (to)=> {
    const direction = this.state.turn === 'black' ? 1 : -1;

    // using this.state.selectedChip / jail as from

    // remove used die from dice
    const usedDie = (this.state.selectedChip !== null) ?
      direction * (to - this.state.selectedChip) :
      this.state.turn === 'white' ? 24 - to : to + 1;

    let nextDice = [
      ...this.state.dice.slice( 0, this.state.dice.indexOf(usedDie) ),
      ...this.state.dice.slice( this.state.dice.indexOf(usedDie) + 1)
    ];

    let nextChips = [...this.state.chips];
    let nextWhiteJail = this.state.whiteJail;
    let nextBlackJail = this.state.blackJail;

    // reduce a chip from the from
    if( this.state.selectedChip !== null) nextChips[ this.state.selectedChip ] -= direction;
    else {
      if( this.state.turn === 'black' ) nextBlackJail--;
      if( this.state.turn === 'white' ) nextWhiteJail--;
    }

    // if the to is a single opponent, move it to jail
    if( this.state.chips[to] === -direction ){
      nextChips[to] = direction;
      if( this.state.turn === 'black' ) nextWhiteJail++;
      if( this.state.turn === 'white' ) nextBlackJail++;

    } else {
      // increase a chip in the to
      nextChips[to] += direction;
    }

    // if the to is home, move there, check if game is over

    // check if turn is over
    let nextTurn = this.state.turn;

    if( !nextDice.length ) nextTurn = ({ black: 'white', white: 'black' })[this.state.turn];

    // also need to check if no more legal moves
    //// if we're in Jail
    ////// if all dice we have lead to blocked spaces (nextTurn = other)
    //// else
    ////// if all dice we have, for all the chips we have lead to blocked spaces

    // if over, compute & set next player (blockade -> same, otherwise toggle)

    this.setState({
      dice: nextDice,
      turn: nextTurn,
      chips: nextChips,
      whiteJail: nextWhiteJail,
      blackJail: nextBlackJail,
      selectedChip: null,
    });
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
