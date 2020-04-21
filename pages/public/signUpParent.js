import EmailValidator from 'email-validator';
import PasswordValidator from 'password-validator';
import React from 'react';

import PropTypes from 'prop-types';
import Error from 'next/error';
import Head from 'next/head';
import throttle from 'lodash/throttle';
import NProgress from 'nprogress';

import Link from 'next/link';
import { withRouter } from 'next/router';
import notify from '../../lib/notifier';
import styleForm from '../../components/SharedStyles.js';
import withAuth from '../../lib/withAuth';
import SignUp from '../../components/public/signInOrSignUp/signup';
import Login from '../../components/public/signInOrSignUp/login';
import { signUpLocal, loginLocal, findEmailByToken } from '../../lib/api/auth';
import getCookie from '../../lib/getCookie';

// eslint-disable-next-line react/prefer-stateless-function
class SignUpParent extends React.Component {
  static propTypes = {
    router: PropTypes.shape({
      query: PropTypes.shape({
        redirectUrl: PropTypes.string,
      }),
      asPath: PropTypes.string,
    }),
    rememberMeEmail: PropTypes.string,
    rememberMeToken: PropTypes.string,
    isFromServer: PropTypes.bool,
  };

  static defaultProps = {
    router: {
      asPath: '/login',
    },
    rememberMeEmail: '',
    rememberMeToken: '',
    isFromServer: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      formErrors: { email: '', password: '' },
      validEmail: false,
      validPassword: false,
      validForm: false,
      rememberMe: false,
    };
    this.validateField = this.validateField.bind(this);
    this.validateForm = this.validateForm.bind(this);
    // this.rememberMe = this.rememberMe.bind(this);
  }

  static async getInitialProps({ req, res }) {
    console.log('getIntial Props Running');
    console.log(req.user);
    console.log(req.headers);
    // initialize headers obejct, if request object has a cookie, assign it to the headers object
    if (!req.user) {
      console.log('NO USER');
      const headers = {};
      if (req && req.headers && req.headers.cookie) {
        headers.cookie = req.headers.cookie;
      }
      if (headers.cookie && headers.cookie.includes('remember_me')) {
        const cookieStr = headers.cookie;

        /* let rememberMeToken = cookieStr.substring(
          cookieStr.indexOf('remember_me=') + 1,
          cookieStr.indexOf(';'),
        ); */

        const rememberMeToken = getCookie('remember_me', cookieStr);

        console.log(`signUpParent.js get inital props- rememberMeToken: ${rememberMeToken}`);
        try {
          // if user - don't look for remeberMeEmail
          let rememberMeEmail = await findEmailByToken({ rememberMeToken });
          rememberMeEmail = rememberMeEmail.email;
          console.log(`signupParent rememberMe email: ${rememberMeEmail}`);
          return { rememberMeEmail, rememberMeToken };
        } catch (err) {
          console.log(`signUpParent.js - no rememberMeEmail`);
        }
      }
    }
  }

  componentDidMount() {
    const { rememberMeEmail } = this.props;
    if (rememberMeEmail) {
      this.setState({ email: rememberMeEmail, validEmail: true, rememberMe: true });
    }
  }

  validateForm = async (data) => {
    NProgress.start();
    const { validForm } = this.state;
    const { signUpOrLogin } = data;
    if (validForm) {
      try {
        if (signUpOrLogin === 'signup') {
          await signUpLocal(data);
          window.location.reload(true);
        }
        if (signUpOrLogin === 'login') {
          console.log(data);
          await loginLocal(data);

          console.log('Logged IN');
          //window.location.reload(true);
        }
        notify('Success!');
        NProgress.done();
      } catch (err) {
        NProgress.done();
        console.log('ERROR in validateForm');
        console.log(err);
        if (signUpOrLogin === 'login') {
          notify(`Incorrect email or password.`);
          this.setState({
            formErrors: {
              password: 'Incorrect email or password.',
              email: 'Incorrect email or password.',
            },
          });
        }
        if (signUpOrLogin === 'signup') {
          notify(`Email is already registered.`);
          this.setState({ formErrors: { email: 'Email is already registered.' } });
        }
      }
    } else {
      this.setState({ validForm: false });
    }
  };

  validateField(fieldName, value, checked) {
    let { validEmail, validPassword } = this.state;
    const schema = new PasswordValidator();
    schema
      .is()
      .min(8) // Minimum length 8
      .is()
      .max(100) // Maximum length 100
      .has()
      .uppercase() // Must have uppercase letters
      .has()
      .lowercase() // Must have lowercase letters
      .has()
      .digits() // Must have digits
      .has()
      .not()
      .spaces();

    // eslint-disable-next-line default-case
    switch (fieldName) {
      case 'email':
        validEmail = EmailValidator.validate(value);
        if (validEmail) {
          this.setState((prevState) => ({
            email: value,
            formErrors: {
              ...prevState.formErrors,
              email: '',
            },
            validEmail: true,
          }));
        } else {
          this.setState((prevState) => ({
            formErrors: {
              ...prevState.formErrors,
              email: 'Your email is invalid',
            },
            validEmail: false,
          }));
        }
        break;
      case 'password':
        validPassword = schema.validate(value);
        if (validPassword) {
          this.setState((prevState) => ({
            password: value,
            formErrors: {
              ...prevState.formErrors,
              password: '',
            },
            validPassword: true,
          }));
        } else {
          this.setState((prevState) => ({
            formErrors: {
              ...prevState.formErrors,
              password:
                'Your password must be greater than 8 characters, have at least one uppercase and lowercase character, and at least on digit.',
            },
            validPassword: false,
          }));
        }
        break;
      case 'firstName':
        this.setState({ firstName: value });
        break;
      case 'lastName':
        this.setState({ lastName: value });
        break;
      case 'remember':
        console.log(`VALUE START: ${checked}`);
        this.setState({ rememberMe: checked });
    }

    if (validEmail && validPassword) {
      this.setState({
        validForm: true,
      });
    }
  }

  render() {
    const { router, rememberMeEmail, rememberMeToken, isFromServer, asPath } = this.props;
    const redirectUrl = (router && router.query && router.query.redirectUrl) || '';
    // console.log('SignUpParent.js this.state: ');
    // console.log(this.state);
    // console.log('SignUpParent.js this.props: ');
    // console.log(this.props);
    if (router.asPath.substr(0, 6) === '/login') {
      return (
        <section>
          <Login
            isFromServer={isFromServer}
            rememberMeEmail={rememberMeEmail}
            rememberMeToken={rememberMeToken}
            {...this.state}
            validateField={this.validateField}
            validateForm={this.validateForm}
            redirectUrl={!redirectUrl ? null : redirectUrl}
          />
        </section>
      );
    }

    if (router.asPath.substr(0, 7) === '/signup') {
      return (
        <section>
          <SignUp
            {...this.state}
            validateField={this.validateField}
            validateForm={this.validateForm}
            submitForm={this.submitForm}
            redirectUrl={!redirectUrl ? null : redirectUrl}
          />
        </section>
      );
    }

    return (
      <section>
        <Login
          isFromServer={isFromServer}
          rememberMeEmail={rememberMeEmail}
          rememberMeToken={rememberMeToken}
          {...this.state}
          validateField={this.validateField}
          validateForm={this.validateForm}
          redirectUrl={!redirectUrl ? null : redirectUrl}
        />
      </section>
    );
  }
}

export default withAuth(withRouter(SignUpParent), { logoutRequired: true });
