import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';
import FirebaseFacebookSignIn from './container/FirebaseFacebookSignIn';
import FirebaseGoogleSignIn from './container/FirebaseGoogleSignIn';
import FirebaseLogout from './container/FirebaseLogout';
import TutorialBoard from './TutorialBoard';
import ShowcaseLayout from './layout/ShowcaseLayout';
import ListLayout from './layout/ListLayout';
import '../css/startmenu.css';

class StartMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSection: 'main',
    };
  }

  navigateToSection(section) {
    this.setState({
      currentSection: section,
    });
  }

  resolveMenuSectionView() {
    const section = this.state.currentSection;
    switch (section) {
      case 'main':
        return (
          <div key='main-section' className='main-section'>
            <ListLayout>
              <Button name="start" onClick={this.props.onGameStart}/>
              <Button name="tutorial" onClick={() => this.navigateToSection('tutorial')}/>
              {this.props.firebaseAvailable && (
                this.props.userRegistered ? (
                  <FirebaseLogout />
                ) : (
                  <Button name="login" onClick={() => this.navigateToSection('login')}/>
                )
              )}
            </ListLayout>
          </div>);
      case 'tutorial':
        return (
          <div key='tutorial-section' className='tutorial-section'>
            <ShowcaseLayout showcase={<TutorialBoard title="🎲 RULES" />}>
              <Button name="👈" onClick={() => this.navigateToSection('main')}/>
            </ShowcaseLayout>
          </div>
        );
      case 'login':
        return this.props.firebaseAvailable ? (
          <div key='login-section' className='login-section'>
            <ListLayout>
              <Button name="👈" onClick={() => this.navigateToSection('main')}/>
              <FirebaseGoogleSignIn />
              <FirebaseFacebookSignIn />
            </ListLayout>
          </div>
        ) : null;
      default:
        return null;
    }
  }

  render() {
    return (
      <div className='start-menu'>
        {this.resolveMenuSectionView()}
      </div>
    );
  }
}

StartMenu.propTypes = {
  userRegistered: PropTypes.bool,
  onGameStart: PropTypes.func,
  firebaseAvailable: PropTypes.bool,
};


function mapStateToProps(state) {
  const { appState } = state;
  return {
    userRegistered: appState.userRegistered,
    firebaseAvailable: appState.firebaseAvailable,
  };
}

export default connect(mapStateToProps, null)(StartMenu);
