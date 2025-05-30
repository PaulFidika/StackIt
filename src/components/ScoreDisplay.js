import React from 'react';
import PropTypes from 'prop-types';
import '../css/scoredisplay.css';

function ScoreDisplay({ score }) {
  return (
    <div className="score-display">
      {score}
    </div>
  );
}

ScoreDisplay.propTypes = {
  score: PropTypes.number.isRequired,
};

export default ScoreDisplay;
