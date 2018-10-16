import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import {List, ListItem} from 'material-ui/List'
import {Grid, Row, Col, Clearfix, Image} from 'react-bootstrap'
import Subheader from 'material-ui/Subheader'
import FitnessCenter from 'material-ui/svg-icons/places/fitness-center'
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import KeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import KeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import Visibility from 'material-ui/svg-icons/action/visibility';
import DoneAll from 'material-ui/svg-icons/action/done-all';
import Divider from 'material-ui/Divider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


import {indigo500, indigoA400, blue50, lightBlue900} from 'material-ui/styles/colors'

const chipStyles = {
  marginRight: 10,
  marginTop: 10
};


const loginStyle = {
  width: 340
};

const studentsStyles = {
  height: 540,
  width: 220,
  textAlign: 'left',
  marginLeft: 0
};

const exercisesStyles = {
  height: 540,
  width: 300,
  marginLeft: 0,
  textAlign: 'left'
};

const programStyles = {
  height: 540,
  width: 600,
  marginLeft: 0,
  textAlign: 'left'
};

const weekChipStyles = {
  marginLeft: 60,
};

const buttonStyles = {
  marginLeft: 240,
  marginTop: 14
};

const LayoutForm = ({
    onSubmit,
    onChange,
    errors,
    user
  }) => (
    <Grid>
      <Row className="show-grid">
        <Col xs={12} md={12} lg={2}>
          <Paper style={studentsStyles} zDepth={2}>
            <List>
              <Subheader>Students</Subheader>
              <ListItem
                primaryText="Chris Smith"
                leftAvatar={<Avatar src='images/c0.png' />}
              />
              <ListItem
                primaryText="Grace Ng"
                leftAvatar={<Avatar src="images/c2.png" />}
              />
              <ListItem
                primaryText="Eric Hoffman"
                leftAvatar={<Avatar src="images/c3.jpg" />}
              />
              <ListItem
                primaryText="Kerem Suer"
                leftAvatar={<Avatar src="images/c4.png" />}
              />
              <ListItem
                primaryText="Raquel Parrado"
                leftAvatar={<Avatar src="images/aisha.jpg" />}
              />
            </List>
          </Paper>
        </Col>
        <Col xs={12} md={12} lg={3}>
          <Paper style={exercisesStyles} zDepth={4}>
            <List>
              <Subheader>Exercises List</Subheader>
              <ListItem
                primaryText="Squat"
                leftIcon={<FitnessCenter />}
                initiallyOpen={false}
                primaryTogglesNestedList={true}
                nestedItems={[
                  <ListItem
                    key={1}
                    primaryText="Front Squat (Barbell)"
                    rightIcon={<AddCircleOutline />}
                  />,
                  <ListItem
                    key={2}
                    primaryText="Leg Press"
                    rightIcon={<AddCircleOutline />}
                  />,
                  <ListItem
                    key={3}
                    primaryText="Smith Machine Squat"
                    rightIcon={<AddCircleOutline />}
                  />,
                  <ListItem
                    key={4}
                    primaryText="Hack Squat (Machine)"
                    rightIcon={<AddCircleOutline />}
                  />,
                ]}
              />
              <ListItem
                primaryText="Triceps"
                leftIcon={<FitnessCenter />}
                initiallyOpen={false}
                primaryTogglesNestedList={true}
                nestedItems={[
                  <ListItem
                    key={1}
                    primaryText="Tricep Straight Bar Pushdowns (Cable Machine)"
                    rightIcon={<AddCircleOutline />}
                  />,
                  <ListItem
                    key={2}
                    primaryText="Tricep Rope Pulldowns (Cable Machine)"
                    rightIcon={<AddCircleOutline />}
                  />,
                  <ListItem
                    key={3}
                    primaryText="Tricep Skull Crushers (Curl Bar)"
                    rightIcon={<AddCircleOutline />}
                  />,
                ]}
              />
              <ListItem
                primaryText="Biceps"
                leftIcon={<FitnessCenter />}
                initiallyOpen={false}
                primaryTogglesNestedList={true}
                nestedItems={[
                  <ListItem
                    key={1}
                    primaryText="Tricep Straight Bar Pushdowns (Cable Machine)"
                    rightIcon={<AddCircleOutline />}
                  />,
                  <ListItem
                    key={2}
                    primaryText="Tricep Rope Pulldowns (Cable Machine)"
                    rightIcon={<AddCircleOutline />}
                  />,
                  <ListItem
                    key={3}
                    primaryText="Tricep Skull Crushers (Curl Bar)"
                    rightIcon={<AddCircleOutline />}
                  />,
                ]}
              />
              <ListItem
                primaryText="Quadricep Compound"
                leftIcon={<FitnessCenter />}
                initiallyOpen={false}
                primaryTogglesNestedList={true}
                nestedItems={[
                  <ListItem
                    key={1}
                    primaryText="Tricep Straight Bar Pushdowns (Cable Machine)"
                    rightIcon={<AddCircleOutline />}
                  />,
                  <ListItem
                    key={2}
                    primaryText="Tricep Rope Pulldowns (Cable Machine)"
                    rightIcon={<AddCircleOutline />}
                  />,
                  <ListItem
                    key={3}
                    primaryText="Tricep Skull Crushers (Curl Bar)"
                    rightIcon={<AddCircleOutline />}
                  />,
                ]}
              />
              <ListItem
                primaryText="Quadricep Isolation"
                leftIcon={<FitnessCenter />}
                initiallyOpen={false}
                primaryTogglesNestedList={true}
                nestedItems={[
                  <ListItem
                    key={1}
                    primaryText="Tricep Straight Bar Pushdowns (Cable Machine)"
                    rightIcon={<AddCircleOutline />}
                  />,
                  <ListItem
                    key={2}
                    primaryText="Tricep Rope Pulldowns (Cable Machine)"
                    rightIcon={<AddCircleOutline />}
                  />,
                  <ListItem
                    key={3}
                    primaryText="Tricep Skull Crushers (Curl Bar)"
                    rightIcon={<AddCircleOutline />}
                  />,
                ]}
              />
              <ListItem
                primaryText="Glutes"
                leftIcon={<FitnessCenter />}
                initiallyOpen={false}
                primaryTogglesNestedList={true}
                nestedItems={[
                  <ListItem
                    key={1}
                    primaryText="Tricep Straight Bar Pushdowns (Cable Machine)"
                    rightIcon={<AddCircleOutline />}
                  />,
                  <ListItem
                    key={2}
                    primaryText="Tricep Rope Pulldowns (Cable Machine)"
                    rightIcon={<AddCircleOutline />}
                  />,
                  <ListItem
                    key={3}
                    primaryText="Tricep Skull Crushers (Curl Bar)"
                    rightIcon={<AddCircleOutline />}
                  />,
                ]}
              />  
            </List>
          </Paper>  
        </Col>
        <Col xs={12} md={12} lg={7}>
          <Paper style={programStyles} zDepth={2}>
            <div>
            <Chip style={weekChipStyles}>
              Raquel Parrado's Program -  Week 1, Day 2 
              <FlatButton labelPosition="before" primary={true} icon={<KeyboardArrowLeft />}/>
              Jan 5, 2017
              <FlatButton labelPosition="before" primary={true} icon={<KeyboardArrowRight />}/>  
            </Chip>
            <Divider/>
            <Table allRowsSelected={false}>
              <TableHeader enableSelectAll={false} displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow selectable={false}>
                  <TableHeaderColumn>EXERCISES</TableHeaderColumn>
                  <TableHeaderColumn>SETS</TableHeaderColumn>
                  <TableHeaderColumn>REPS</TableHeaderColumn>
                  <TableHeaderColumn>PRESCRIBED WEIGHT</TableHeaderColumn>
                  <TableHeaderColumn>ACTION</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody stripedRows={false} showRowHover={true} displayRowCheckbox={false}>
                <TableRow>
                  <TableRowColumn>Squat</TableRowColumn>
                  <TableRowColumn>3</TableRowColumn>
                  <TableRowColumn>6-9</TableRowColumn>
                  <TableRowColumn>0</TableRowColumn>
                  <TableRowColumn><FlatButton label="View" labelPosition="before" primary={true} icon={<Visibility />}/></TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>Bench Press</TableRowColumn>
                  <TableRowColumn>3</TableRowColumn>
                  <TableRowColumn>8-10</TableRowColumn>
                  <TableRowColumn>0</TableRowColumn>
                  <TableRowColumn><FlatButton label="View" labelPosition="before" primary={true} icon={<Visibility />}/></TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>Lat Pulldown</TableRowColumn>
                  <TableRowColumn>3</TableRowColumn>
                  <TableRowColumn>8-10</TableRowColumn>
                  <TableRowColumn>0</TableRowColumn>
                  <TableRowColumn><FlatButton label="View" labelPosition="before" primary={true} icon={<Visibility />}/></TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>Shoulder Press</TableRowColumn>
                  <TableRowColumn>3</TableRowColumn>
                  <TableRowColumn>8-10</TableRowColumn>
                  <TableRowColumn>0</TableRowColumn>
                  <TableRowColumn><FlatButton label="View" labelPosition="before" primary={true} icon={<Visibility />}/></TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
            <Divider/>
            <br/>
            <RaisedButton style={buttonStyles} label="SAVE PROGRAM" primary={true} labelPosition="before" disabled={false} icon={<DoneAll />}/>    
          </div>
          </Paper>
        </Col>
      </Row>
    </Grid>
);

LayoutForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default LayoutForm;