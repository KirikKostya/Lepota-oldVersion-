import React from 'react';

interface IErrorIconProps{
  width?: string
  height?: string
  margin?: string
}
const ErrorIcon: React.FC<IErrorIconProps> = (props) => {

  const {width, height, margin} = props;

  return (
    <svg viewBox='64 64 896 896' width={width || '1em'} height={height || '1em'} fill='#ff4d4f' aria-hidden='true' focusable='false' style={{margin: '0 10px'}}>
        <path d='M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z'/>
    </svg>
  )
}

export default ErrorIcon;