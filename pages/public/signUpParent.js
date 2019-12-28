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
import { signUpLocal, loginLocal } from '../../lib/api/auth';

// eslint-disable-next-line react/prefer-stateless-function
class SignUpParent extends React.Component {
  static propTypes = {
    router: PropTypes.shape({
      query: PropTypes.shape({
        redirectUrl: PropTypes.string,
      }),
      asPath: PropTypes.string,
    }),
  };

  static defaultProps = {
    router: {
      asPath: '',
    },
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
  }

  static async getInitialProps({ req, res }) {
    // initialize headers obejct, if request object has a cookie, assign it to the headers object
    const headers = {};
    if (req && req.headers && req.headers.cookie) {
      headers.cookie = req.headers.cookie;
    }
  }

  componentDidMount() {
    const { router } = this.props;
    router.prefetch('/dynamic');
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
          await loginLocal(data);
          console.log('LOGGING IN');
          window.location.reload(true);
        }
        notify('Success!');
        NProgress.done();
      } catch (err) {
        NProgress.done();
        console.log('ERROR in validateForm');
        console.log(err);
        notify(`Incorrect username or password.`);
        this.setState({ formErrors: { password: 'Incorrect username or password.' } });
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
          this.setState({ email: value, validEmail: true, formErrors: { email: '' } });
        } else {
          this.setState({
            validEmail: false,
            formErrors: { email: 'Your email is invalid' },
          });
        }
        break;
      case 'password':
        validPassword = schema.validate(value);
        if (validPassword) {
          this.setState({
            password: value,
            validPassword: true,
            formErrors: {
              password: '',
            },
          });
        } else {
          this.setState({
            validPassword: false,
            formErrors: {
              password:
                'Your password must be greater than 8 characters, have at least one uppercase and lowercase character, and at least on digit. ',
            },
          });
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
    const { router } = this.props;
    const redirectUrl = (router && router.query && router.query.redirectUrl) || '';
    console.log(router.asPath);
    if (router.asPath.substring(0, 6) === '/login') {
      return (
        <section>
          <Login
            {...this.state}
            validateField={this.validateField}
            validateForm={this.validateForm}
            redirectUrl={!redirectUrl ? null : redirectUrl}
          />
        </section>
      );
    }

    if (router.asPath.substring(0, 7) === '/signup') {
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
  }
}

export default withAuth(withRouter(SignUpParent), { logoutRequired: true });
