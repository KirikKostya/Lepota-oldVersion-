import React from 'react';

const NagativeIconActivation: React.FC = () => {

  return (
    <svg width="60" 
         height="60" 
         viewBox="0 0 24 24" 
         strokeWidth="2" 
         stroke="black" 
         fill="none" 
         strokeLinecap="round" 
         strokeLinejoin="round"> 
        <path stroke="none" 
              d="M0 0h24v24H0z" 
              fill="none"/> 
        <path d="M4 8v-2a2 2 0 0 1 2 -2h2" /> 
        <path d="M4 16v2a2 2 0 0 0 2 2h2" /> 
        <path d="M16 4h2a2 2 0 0 1 2 2v2" /> 
        <path d="M16 20h2a2 2 0 0 0 2 -2v-2" /> 
        <path d="M9 10h.01" /> 
        <path d="M15 10h.01" /> 
        <path d="M9.5 15.05a3.5 3.5 0 0 1 5 0" /> 
    </svg>
  )
}

export default NagativeIconActivation;