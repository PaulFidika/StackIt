import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { userSignInBatch, userAuth } from '../redux/actions/user';
import { appSwitchSection } from '../redux/actions/app';
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
    const { firebaseConfig } = props;
    // Determine if we have a usable Firebase configuration
    const firebaseEnabled = firebaseConfig?.projectId
      && firebaseConfig.projectId !== 'not-configured'
      && firebaseConfig.projectId !== 'your-project-id'
      && firebaseConfig?.apiKey
      && firebaseConfig.apiKey !== 'not-configured';

    this.state = {
      threeSceneManager: new MenuScene(),
      firebaseEnabled,
      endGameStats: null,
    };
  }

  componentDidMount() {
    // initialize firebase only if we have valid configuration
    const { firebaseConfig } = this.props;

    // Check if we have a valid Firebase configuration
    const hasValidFirebaseConfig = firebaseConfig?.projectId
      && firebaseConfig.projectId !== 'your-project-id'
      && firebaseConfig?.apiKey
      && firebaseConfig.apiKey !== 'your-api-key-here';

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
      }
    } else {
      console.log('Firebase not configured - running in offline mode');
      console.log('To enable authentication, set up your Firebase configuration');
    }
  }

  navigateToSection(section, stats = null) {
    this.props.appSwitchSection(section);
    if (section === 'start') {
      this.setState({
        threeSceneManager: new MenuScene(),
        endGameStats: null,
      });
    } else if (section === 'game') {
      this.setState({
        threeSceneManager: new GameScene(),
      });
    } else if (section === 'end') {
      this.setState({ endGameStats: stats });
    }
  }

  resolveAppSectionView() {
    const section = this.props.currentSection;
    switch (section) {
      case 'start':
        return (<StartMenu
                  firebaseEnabled={this.state.firebaseEnabled}
                  onGameStart={() => this.navigateToSection('game')}
                />);
      case 'end':
        return (
          <EndMenu
            score={this.state.endGameStats ? this.state.endGameStats.score : 0}
            onBackButtonClick={() => this.navigateToSection('start')}
          />
        );
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
    return (
      <div className="app">
        <div className="three-container-style-wrapper"
              style={section === 'game' ? null : { filter: 'blur(5px) brightness(90%)' }}>
          <ThreeContainer manager={this.state.threeSceneManager}
                          onSceneEnd={stats => this.navigateToSection('end', stats)}/>
        </div>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
