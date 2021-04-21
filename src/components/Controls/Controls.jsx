import React from 'react';
import PropTypes from 'prop-types';
import './Controls.scss';

export const Controls = ({ status, start, reset, wait }) => {

  return (
    <div className='Controls'>
      <button className='button' onClick={start}>
        {status !== 'running' ? 'Start' : 'Stop'}
      </button>
      <button className='button' onClick={reset}>Reset</button>
      <button className='button' onClick={wait}>Wait</button>
    </div>
  )
};

Controls.propTypes = {
  status: PropTypes.string.isRequired,
  start: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  wait: PropTypes.func.isRequired,
}
