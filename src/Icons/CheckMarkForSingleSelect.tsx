import React from 'react'

interface IProps{
  className: string
}

const CheckMarkForSingleSelect: React.FC<IProps> = (props) => {
  
  const { className } = props;

  return (
    <svg
        width="12"
        height="8"
        viewBox="1 1 12 8"
        fill="none"
      >
        <path
          d="M1 4L4.5 7.5L11 1"
          stroke="#5A9DFF"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        />
      </svg>
  )
}

export default CheckMarkForSingleSelect;
