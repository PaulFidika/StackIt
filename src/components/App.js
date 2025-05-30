import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { userSignInBatch, userAuth } from '../redux/actions/user';
import { appSwitchSection, appSetFirebaseAvailable } from '../redux/actions/app';
import StartMenu from './StartMenu';
import AliasForm from './AliasForm';
import Avatar from './Avatar';
import NavBar from './NavBar';
import InfoBoard from './InfoBoard';
import EndMenu from './EndMenu';
import ThreeContainer from './ThreeContainer';
import MenuScene from './three/menuScene';
import GameScene from './three/GameScene';
import '../css/animation.css';
import '../css/app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threeSceneManager: new MenuScene(),
      gameResults: {
        score: 0,
        combo: 0,
      },
      highScore: App.getHighScore(),
    };
  }

  static getHighScore() {
    const stored = localStorage.getItem('stackit-highscore');
    return stored ? Number.parseInt(stored, 10) : 0;
  }

  saveHighScore(score) {
    const currentHigh = App.getHighScore();
    if (score > currentHigh) {
      localStorage.setItem('stackit-highscore', score.toString());
      this.setState({ highScore: score });
      return true; // New high score
    }
    return false; // Not a new high score
  }

  componentDidMount() {
    // initialize firebase only if we have valid configuration
    const { firebaseConfig } = this.props;

    // Check if we have a valid Firebase configuration
    const hasValidFirebaseConfig = firebaseConfig?.projectId
      && firebaseConfig.projectId !== 'your-project-id'
      && firebaseConfig.projectId !== 'not-configured'
      && firebaseConfig?.apiKey
      && firebaseConfig.apiKey !== 'your-api-key-here'
      && firebaseConfig.apiKey !== 'not-configured';

    // Dispatch Firebase availability to Redux store
    this.props.appSetFirebaseAvailable(hasValidFirebaseConfig);

    if (hasValidFirebaseConfig) {
      try {
        firebase.initializeApp(firebaseConfig);
        // Remove deprecated timestampsInSnapshots setting
        // No need to call settings() anymore - timestamps in snapshots is now default

        // if user already logged in, fetch user info
        this.props.userSignInBatch(this.props.userAuth);
      } catch (error) {
        console.warn('Firebase initialization failed:', error);
        console.log('Running in offline mode without Firebase features');
        this.props.appSetFirebaseAvailable(false);
      }
    } else {
      console.log('Firebase not configured - running in offline mode');
      console.log('To enable authentication, set up your Firebase configuration');
    }
  }

  navigateToSection(section) {
    this.props.appSwitchSection(section);
    if (section === 'start') {
      this.setState({
        threeSceneManager: new MenuScene(),
      });
    } else if (section === 'game') {
      this.setState({
        threeSceneManager: new GameScene(),
      });
    }
  }

  handleSceneEnd() {
    // Capture game results before navigating to end screen
    if (this.state.threeSceneManager?.state) {
      const finalScore = this.state.threeSceneManager.state.score || 0;
      const finalCombo = this.state.threeSceneManager.state.maxCombo || 0;
      
      // Save high score
      const isNewHighScore = this.saveHighScore(finalScore);
      
      this.setState({
        gameResults: {
          score: finalScore,
          combo: finalCombo,
          isNewHighScore,
        },
      });
    }
    this.navigateToSection('end');
  }

  resolveAppSectionView() {
    const section = this.props.currentSection;
    switch (section) {
      case 'start':
        return (<StartMenu onGameStart={() => this.navigateToSection('game')}/>);
      case 'end':
        return (<EndMenu
          score={this.state.gameResults.score.toString()}
          combo={this.state.gameResults.combo.toString()}
          highScore={this.state.highScore.toString()}
          isNewHighScore={this.state.gameResults.isNewHighScore}
          onBackButtonClick={() => this.navigateToSection('start')}
        />);
      case 'form':
        return (<AliasForm onFinish={() => this.navigateToSection('start')}/>);
      case 'game':
        return null;
      default:
        return null;
    }
  }

  render() {
    const section = this.props.currentSection;
    const userData = this.props.userData.data;
    const userInfo = this.props.userInfo.data;
    const currentScore = this.state.threeSceneManager?.state?.score || 0;
    const currentCombo = this.state.threeSceneManager?.state?.combo || 0;
    const currentHue = this.state.threeSceneManager?.currentHue || 0;

    // Calculate contrasting background gradient
    const contrastHue1 = (currentHue + 180) % 360;
    const contrastHue2 = (currentHue + 210) % 360;
    const gradientStyle = section === 'game' ? {
      background: `linear-gradient(to bottom, 
        hsl(${contrastHue1}, 20%, 15%) 0%, 
        hsl(${contrastHue2}, 25%, 8%) 100%)`
    } : {};

    return (
      <div className="app">
        {section === 'game' && (
          <div className="game-background" style={gradientStyle}>
            <div className="stars-container">
              {[...Array(50)].map((_, i) => (
                <div
                  key={`star-${i}-${Math.random()}`}
                  className="star"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
        <div className="three-container-style-wrapper"
              style={section === 'game' ? null : { filter: 'blur(5px) brightness(90%)' }}>
          <ThreeContainer manager={this.state.threeSceneManager}
                          onSceneEnd={() => this.handleSceneEnd()}/>
        </div>
        {section === 'game' && (
          <>
            <div className="game-score-overlay">
              <div className="current-score">
                Score: {currentScore}
              </div>
              {currentCombo > 0 && (
                <div className="combo-display">
                  Combo: {currentCombo}
                </div>
              )}
            </div>
            {currentCombo > 0 && (
              <div className="ripple-effect">
                <div className="ripple-square" />
              </div>
            )}
            {currentCombo >= 3 && (
              <div className="fireworks-container">
                <div className="firework firework-1" />
                <div className="firework firework-2" />
                <div className="firework firework-3" />
              </div>
            )}
          </>
        )}
        {section !== 'game' && (
          <>
            <NavBar />
            <InfoBoard title='Stack.io'>
              {
                (this.props.userRegistered && this.props.aliasRegistered)
                  ? (
                    <Avatar name={userData.alias} src={userInfo.photoURL}/>
                  ) : (
                    '- A WebGL game built on THREE.js -'
                  )
              }
            </InfoBoard>
          </>)
        }
        {
          this.resolveAppSectionView()
        }
        {section !== 'game' && (
          <footer className="app-footer">
            - designed and created by Yifu Chen -
          </footer>)
        }
      </div>
    );
  }
}

App.propTypes = {
  firebaseConfig: PropTypes.object,
  userAuth: PropTypes.func,
  userSignInBatch: PropTypes.func,
  appSwitchSection: PropTypes.func,
  aliasRegistered: PropTypes.bool,
  userRegistered: PropTypes.bool,
  currentSection: PropTypes.string,
  userInfo: PropTypes.object,
  userData: PropTypes.object,
  appSetFirebaseAvailable: PropTypes.func,
};

// connect component to redux store
function mapStateToProps(state) {
  const {
    appState, userInfo, userData,
  } = state;
  return {
    aliasRegistered: appState.aliasRegistered,
    userRegistered: appState.userRegistered,
    currentSection: appState.currentSection.app,
    userInfo,
    userData,
  };
}

const mapDispatchToProps = {
  userAuth,
  userSignInBatch,
  appSwitchSection,
  appSetFirebaseAvailable,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
