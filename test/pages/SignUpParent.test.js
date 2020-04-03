import React from 'react';
import { mount } from 'enzyme';
import { assert } from 'chai';
import SignUpParent from '../../pages/public/SignUpParent';

describe('signUpParent page', () => {
  describe('Login Component', () => {
    it('renders the login ux', () => {
      // setup
      const router = {
        query: {
          redirectUrl: '',
        },
        asPath: '/login',
      };
      const testMessage = 'Log in';
      const wrapper = mount(<SignUpParent router={router} />);
      const text = wrapper.find('h1').text();
      assert.equal(testMessage, text, `${testMessage} equals ${text}`);
    });
  });
  describe('Signup Component', () => {
    it('renders the signup ux', () => {
      // setup
      const router = {
        query: {
          redirectUrl: '',
        },
        asPath: '/signup',
      };
      const testMessage = 'Sign Up';
      const wrapper = mount(<SignUpParent router={router} />);
      // exercise
      const text = wrapper.find('h1').text();
      // verify
      assert.equal(testMessage, text, `${testMessage} equals ${text}`);
    });
  });
});

/* it('signs in a new user', async () => {
      const thisDotState = {
        email: 'jonathan.e.white@colorado.edu',
        password: 'Go!Go!Go!123',
        firstName: 'Jonathan',
        lastName: 'White',
        formErrors: { email: '', password: '' },
        validEmail: false,
        validPassword: false,
        validForm: false,
        rememberMe: false,
      };
      const router = {
        query: {
          redirectUrl: '',
        },
        asPath: '/signup',
      };
      const wrapper = mount(<SignUpParent router={router} />);
      // wrapper.setState({ ...thisDotState });
      const firstName = wrapper.find('#firstName').find('input');

      firstName
        .at(0)
        .props()
        .onChange({ target: { value: 'Jonathan' } });
      wrapper.update();
      console.log('FIRSTNAME');
      console.log(firstName.debug());
      const wrapperState = wrapper.state();
      console.log('WRAPPER STATE');
      console.log(wrapperState);
      assert.equal(firstName.props().value, 'Jonathan');
    });
    */
