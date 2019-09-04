export const calculateBoardOutcomes = (
  chips, blackJail, whiteJail, blackHome, whiteHome
)=> {

};

export const calculateLegalMoves = (chips, dice, turn, whiteJail, blackJail)=>{

  const direction = turn === 'black' ? 1 : -1;

  if( !dice.length ) return [];

  //// if we're in Jail
  ////// calculate spaces in 0-5 or 23-18

  if( (turn === 'white') && (whiteJail > 0) ){
    // check if 23-18 are legal moves by dice
    return dice.filter(die => ( chips[ 24 - die ] <= 1 ))
               .map(die => ({ moveFrom: 'whiteJail', moveTo: 24 - die }) );

  } else if( (turn === 'black') && (blackJail > 0) ){
    // check if 0-5 are legal moves by dice
    return dice.filter(die => ( chips[ die - 1 ] >= -1 ))
               .map(die => ({ moveFrom: 'blackJail', moveTo: die - 1 }) );

  } else {
    // if all dice we have, for all the chips we have, check if it's open

    let legalMoves = [];

    for(let i = 0; i < chips.length; i++){
      if( chips[i] * direction > 0 ){

        legalMoves = [
          ...legalMoves,
          ...dice.filter(die => (
            (chips[ i + direction * die ] * direction >= -1)
          )).map(die => ({ moveFrom: i, moveTo: i + direction * die }))
        ];

      }
    }

    let furthestPiece;

    if(turn === 'white'){
      furthestPiece = 24 - chips.reverse().findIndex(chip=> chip * direction > 0);
      chips.reverse();
    } else {
      furthestPiece = 24 - chips.findIndex(chip=> chip * direction > 0);
    }

    const legalHomeMoves = (
      furthestPiece > 6
    ) ? [] : (
      turn === 'white'
    ) ? [0, 1, 2, 3, 4, 5].filter(spot=> (
      (chips[spot] < 0) && (
        (dice.filter(die => die === spot+1).length) ||
        (dice.filter(die => ((die >= furthestPiece) && (spot+1 === furthestPiece))).length)
      )
    )).map(spot => ({ moveFrom: spot, moveTo: 'whiteHome' })

    ) : [23, 22, 21, 20, 19, 18].filter(spot=> (
      (chips[spot] > 0) && (
        (dice.filter(die => die === 24-spot).length) ||
        (dice.filter(die => ((die >= furthestPiece) && (24-spot === furthestPiece))).length)
      )
    )).map(spot => ({ moveFrom: spot, moveTo: 'blackHome' }))


    return [
      ...legalMoves,
      ...legalHomeMoves,
    ];

    return chips.reduce((legalMoves, chip, i)=>
      (chip * direction <= 0) ? legalMoves : [
        ...legalMoves,
        ...dice.filter(die => (
          chips[ i + direction * die ] * direction >= -1
        )).map(die => ({ moveFrom: i, moveTo: i + direction * die }))
      ], []);


    // if all pieces are near home, calculate also moves to home
  }


};
