import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { ScoreBoard } from './LeaderBoard';
import '../css/endmenu.css';
import ShowcaseLayout from './layout/ShowcaseLayout';


class EndMenu extends Component {
  render() {
    // Use props if provided, otherwise fallback to default values
    const score = this.props.score || '0';
    const combo = this.props.combo || '0';
    const highScore = this.props.highScore || '0';
    const isNewHighScore = this.props.isNewHighScore || false;

    return (
      <div className='end-menu'>
        <ShowcaseLayout showcase={
          <div className="game-results">
            <ScoreBoard
              score={score}
              combo={combo}
            />
            <div className="high-score-section">
              {isNewHighScore ? (
                <div className="new-high-score">
                  🎉 NEW HIGH SCORE! 🎉
                </div>
              ) : (
                <div className="high-score-display">
                  High Score: {highScore}
                </div>
              )}
            </div>
          </div>
        }>
          <Button name="👈" onClick={this.props.onBackButtonClick}/>
        </ShowcaseLayout>
      </div>
    );
  }
}

EndMenu.propTypes = {
  score: PropTypes.string,
  combo: PropTypes.string,
  highScore: PropTypes.string,
  isNewHighScore: PropTypes.bool,
  onBackButtonClick: PropTypes.func,
};

export default EndMenu;
