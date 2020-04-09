import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import NProgress from 'nprogress';
import { deleteUser } from '../../lib/api/auth';

import withAuth from '../../lib/withAuth';
import { styleForm, styleTextField } from '../../components/SharedStyles';

// Index is a little dashboard that shows the functionality of withAuth
// withAuth passed the user object as a prop to Index

// eslint-disable-next-line react/prefer-stateless-function
class MyAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formErrors: { email: '', password: '' },
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (e) => {
    NProgress.start();
    const { email, password } = this.state;
    try {
      e.preventDefault();
      console.log('HANDLE SUBMIT');
      console.log(email + password);
      await deleteUser({ email, password });
      window.location.reload(true);
    } catch (e) {
      this.setState({ formErrors: { email: 'It didnt work!' } });
    }
  };

  handleUserInput = (e) => {
    const { target } = e;
    const { value } = target;
    const { name } = target;

    this.setState({
      [name]: value,
    });
    console.log(this.state);
  };

  render() {
    const { formErrors } = this.state;
    return (
      <div style={{ padding: '10px 45px' }}>
        <h1 id="my-account"> My Account Page </h1>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Delete Account</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <form style={styleForm} noValidate onSubmit={this.handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
                // value={email}
                onChange={this.handleUserInput}
                autoFocus
                style={styleTextField}
                error={!!formErrors.email}
                id="outlined-error-helper-text"
                helperText={formErrors.email}
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                // value={password}
                name="password"
                label="Password"
                type="password"
                onChange={this.handleUserInput}
                style={styleTextField}
                error={!!formErrors.password}
                id="outlined-error-helper-text"
                helperText={formErrors.password}
              />
              <br />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                id="delete-user-button"
                onClick={this.handleSubmit}
              >
                Delete Account
              </Button>
            </form>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withAuth(MyAccount);
