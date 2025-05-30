import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/threecontainer.css';

class ThreeContainer extends Component {
  constructor(props) {
    super(props);
    this.manager = this.props.manager;
    this.isSceneEndHandled = false;
    this.animate = this.animate.bind(this);
    this.handleMouseClick = this.handleMouseClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.updateScoreDisplay = this.updateScoreDisplay.bind(this);
  }

  componentDidMount() {
    if (this.manager !== null) {
      const mountPoint = this.mountPoint;
      mountPoint.appendChild(this.manager.renderer.domElement);
      window.addEventListener('resize', this.manager.handleWindowResize, false);
      this.animate();
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.manager === null) {
      if (nextProps.manager !== null) {
        return true;
      }
      return false;
    }

    const mountPoint = this.mountPoint;
    const nextManager = nextProps.manager;
    const currManager = this.manager;
    const currRenderer = currManager.renderer;
    if (nextProps.manager === null || currManager.name !== nextManager.name) {
      cancelAnimationFrame(this.frameId);
      mountPoint.removeChild(currRenderer.domElement);
      window.removeEventListener('resize', currManager.handleWindowResize);
      return true;
    }

    return false;
  }

  componentDidUpdate() {
    const mountPoint = this.mountPoint;
    const manager = this.props.manager;
    if (manager !== null) {
      const renderer = manager.renderer;
      this.isSceneEndHandled = false;
      this.manager = manager;
      mountPoint.appendChild(renderer.domElement);
      window.addEventListener('resize', this.manager.handleWindowResize, false);
      this.animate();
    }
  }

  componentWillUnmount() {
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
    }
    if (this.manager !== null) {
      this.mountPoint.removeChild(this.manager.renderer.domElement);
    }
  }

  animate() {
    if (this.isSceneEndHandled) {
      this.frameId = requestAnimationFrame(this.animate);
      this.manager.update();
      this.updateScoreDisplay();
    } else {
      this.frameId = requestAnimationFrame(this.animate);
      this.manager.update();
      this.updateScoreDisplay();
      if (this.manager.state.isTerminated) {
        this.props.onSceneEnd(this.manager.state);
        this.isSceneEndHandled = true;
      }
    }
  }

  updateScoreDisplay() {
    if (this.scoreDisplay) {
      this.scoreDisplay.textContent = this.manager.state.score;
    }
  }

  handleKeyDown(event) {
    if (event.key === ' ' || event.key === 'Enter') {
      this.handleMouseClick();
    }
  }

  handleMouseClick() {
    this.manager.handleMouseClick();
  }

  render() {
    return (
      <button
        className="three-container"
        ref={(el) => { this.mountPoint = el; }}
        onClick={this.handleMouseClick}
        onKeyDown={this.handleKeyDown}
        type="button"
        aria-label="Game canvas - click or press space to drop block"
      >
        <div
          className="three-container-score"
          ref={(el) => { this.scoreDisplay = el; }}
        />
      </button>
    );
  }
}

ThreeContainer.propTypes = {
  manager: PropTypes.object,
  onSceneEnd: PropTypes.func,
  handleWindowResize: PropTypes.func,
};

ThreeContainer.defaultProps = {
  manager: null,
  onSceneEnd: null,
};

export default ThreeContainer;
