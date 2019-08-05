// This is NOT super optimal or close to Redux conventions but it clearly shows oAuth flow in a single component #forLearning

import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  state = { isSignedIn: null };

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '887693445090-vgg4nhvdvfcgqvkv462rmk73i5ch4oc5.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
        this.auth.isSignedIn.listen(this._onAuthChange);
      });
    });
  }

  // Arrow func because it's used in a callback and we want to maintain context
  _onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn();
    } else {
      this.props.signOut();
    }
  };

  _onSignInClick = () => {
    this.auth.signIn();
  };

  _onSignOutClick = () => {
    this.auth.signOut();
  };

  _renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <button onClick={this._onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this._onSignInClick} className="ui green google button">
          <i className="google icon" />
          Sign In
        </button>
      );
    }
  }

  render() {
    return (
    <div>
      {this._renderAuthButton()}
    </div>
    );
  }
}

export default connect(null, { signIn, signOut })(GoogleAuth);