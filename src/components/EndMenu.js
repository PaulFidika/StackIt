import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { ScoreBoard } from './LeaderBoard';
import '../css/endmenu.css';
import ShowcaseLayout from './layout/ShowcaseLayout';


class EndMenu extends Component {

  render() {
    return (
      <div className='end-menu'>
        <ShowcaseLayout showcase={
          (<ScoreBoard
            score={this.props.score.toString()}
            highscore={this.props.highScore.toString()}
          />)
        }>
          <Button name="👈" onClick={this.props.onBackButtonClick}/>
        </ShowcaseLayout>
      </div>
    );
  }
}

EndMenu.propTypes = {
  score: PropTypes.string,
  highScore: PropTypes.string,
  onBackButtonClick: PropTypes.func,
};

export default EndMenu;
