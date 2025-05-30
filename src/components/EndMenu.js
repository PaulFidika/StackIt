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
      highScore: 0,
    };
  }

  componentDidMount() {
    const storedHigh = Number.parseInt(localStorage.getItem('highestScore') || '0', 10);
    const { score } = this.props;
    const newHigh = score > storedHigh
      ? score
      : storedHigh;
    if (newHigh !== storedHigh) {
      localStorage.setItem('highestScore', newHigh.toString());
    }
    this.setState({ highScore: newHigh });
  }

  render() {
    return (
      <div className="end-menu">
        <ShowcaseLayout
          showcase={(
            <ScoreBoard
              score={this.props.score.toString()}
              highScore={this.state.highScore.toString()}
            />
          )}
        >
          <Button name="👈" onClick={this.props.onBackButtonClick} />
        </ShowcaseLayout>
      </div>
    );
  }
}

EndMenu.propTypes = {
  score: PropTypes.number.isRequired,
  onBackButtonClick: PropTypes.func,
};

export default EndMenu;
