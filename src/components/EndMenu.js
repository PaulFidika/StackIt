import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { ScoreBoard } from './LeaderBoard';
import '../css/endmenu.css';
import ShowcaseLayout from './layout/ShowcaseLayout';


class EndMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // leaderboard removed
      score: 76,
      combo: 7,
    };
  }

  render() {
    return (
      <div className='end-menu'>
        <ShowcaseLayout showcase={
          <ScoreBoard
            score={this.state.score.toString()}
            combo={this.state.combo.toString()}
          />
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
  onBackButtonClick: PropTypes.func,
};

export default EndMenu;
