import React from 'react';

const centers = [
  1345, 1239, 1133, 1027, 921, 815, 605, 499, 393, 287, 181, 75,
  75, 181, 287, 393, 499, 605, 815, 921, 1027, 1133, 1239, 1345,
];

const Board = ({
  whiteHome,
  blackHome,
  whiteJail,
  blackJail,
  selectedChip,
  chips,
  onClick,
})=> (
  <svg viewBox='0 0 1500 1000' className='Board'>
    <rect x={0} y={0}
          height={1000} width={1500}
          fill='#fe9'
      />
    <rect x={0} y={0}
          height={1000} width={20}
          fill='#731'
      />
    <rect x={0} y={0}
          height={20} width={1500}
          fill='#731'
      />
    <rect x={0} y={980}
          height={20} width={1500}
          fill='#731'
      />
    <rect x={1400} y={0}
          height={1000} width={100}
          fill='#731'
      />
    <rect x={1410} y={20}
          height={960} width={80}
          fill='#510'
      />
    <rect x={660} y={0}
          height={1000} width={100}
          fill='#731'
      />


    {[0, 180].map(angle=> (
      <g key={angle} className={'selected-chip-'+selectedChip}
         style={{ transform: 'rotate('+angle+'deg)', transformOrigin:'47.33% 50%' }}>
        <polygon points='25,20 125,20 75,450' className='white-triangle' />
        <polygon points='131,20 231,20 181,450' className='black-triangle' />
        <polygon points='237,20 337,20 287,450' className='white-triangle' />
        <polygon points='343,20 443,20 393,450' className='black-triangle' />
        <polygon points='449,20 549,20 499,450' className='white-triangle' />
        <polygon points='555,20 655,20 605,450' className='black-triangle' />

        <polygon points='765,20 865,20 815,450' className='white-triangle' />
        <polygon points='871,20 971,20 921,450' className='black-triangle' />
        <polygon points='977,20 1077,20 1027,450' className='white-triangle' />
        <polygon points='1083,20 1183,20 1133,450' className='black-triangle' />
        <polygon points='1189,20 1289,20 1239,450' className='white-triangle' />
        <polygon points='1295,20 1395,20 1345,450' className='black-triangle' />
      </g>
    ))}

    {
      chips.map((chip, i)=> (
        <g key={i}>
          {[...Array(Math.abs(chip))].map((_, c)=> (
            <circle key={c} cx={centers[i]}
                    cy={ i < 12 ? (
                      60 + (60 - 5*Math.max(0, Math.abs(chip)-6))*c
                    ) : (
                      940 - (60 - 5*Math.max(0, Math.abs(chip)-6))*c
                    ) } r={30}
                    className={chip < 0 ? 'white-chip' : 'black-chip'}/>
          ))}

          <rect x={centers[i] - 50} width={100}
                y={ i < 12 ? 20 : 550 } height={430}
                fill='transparent' stroke='transparent'
                onClick={()=> onClick(i)} />
        </g>
      ))
    }

    {
      [...Array(whiteJail)].map((_, i)=>(
        <circle key={i} cx={710}
                cy={ 60 + 60*i } r={30}
                className='white-chip'/>
      ))
    }
    {
      [...Array(blackJail)].map((_, i)=>(
        <circle key={i} cx={710}
                cy={ 940 - 60*i } r={30}
                className='black-chip'/>
      ))
    }

    {
      [...Array(whiteHome)].map((_, i)=> (
        <rect key={i} x={1420} y={25 + 25*i} height={20} width={60} className='white-home' />
      ))
    }
    {
      [...Array(blackHome)].map((_, i)=> (
        <rect key={i} x={1420} y={955 - 25*i} height={20} width={60} className='black-home' />
      ))
    }
  </svg>
);

export default Board;
