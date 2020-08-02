import React from 'react';

export default function DefaultInput({label, children, error,  ...props}){
  return(
    <div className="default-input">
      <label>{label}</label>
      {!children && <input {...props}/>}
      {children}
      {error && <span>{error}</span>}
    </div>
  )
}