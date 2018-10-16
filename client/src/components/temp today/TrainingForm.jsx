import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

import {indigo500, indigoA400, blue50, lightBlue900} from 'material-ui/styles/colors';



const loginStyle = {
  width: 340
};

const TrainingForm = ({
  onSubmit,
  onChange,
  errors,
  user
}) => (
  <Paper className="container" style={loginStyle} zDepth={5}>
    <form action="/" onSubmit={onSubmit}>
      <h4 className="card-heading">TRAINING SHEET</h4>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="Email"
          name="email"
          errorText={errors.email}
          onChange={onChange}
          value={user.email}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={onChange}
          errorText={errors.password}
          value={user.password}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Log in" primary />
      </div>

      <CardText>Training Sheet</CardText>
    </form>
  </Paper>
);

TrainingForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default TrainingForm;