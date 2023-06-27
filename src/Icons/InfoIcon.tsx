import React from 'react';

interface IInfoIconProps{
  width?: string
  height?: string
  margin?: string
}
const InfoIcon: React.FC<IInfoIconProps> = (props) => {

  const {width, height, margin} = props;

  return (
    <svg viewBox='64 64 896 896' width={width || '1em'} height={height || '1em'} fill='#1677ff' aria-hidden='true' focusable='false' style={{margin: `${margin || '0 10px'}`}}>
        <path d='M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z' />
    </svg>
  )
}

export default InfoIcon