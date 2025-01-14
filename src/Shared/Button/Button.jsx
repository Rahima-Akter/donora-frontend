import React from 'react';

const Button = ({buttonText}) => {
    return (
        <div className="wet-paint-container">
  <div className="wet-paint-button">
   {buttonText}
  </div>
  <div className="dripping-paint">
    <span className="paint"></span>
    <span className="paint"></span>
    <span className="paint"></span>
    <span className="paint"></span>
  </div>
</div>

    );
};

export default Button;