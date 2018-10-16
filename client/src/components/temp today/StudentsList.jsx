import React from 'react'
import Paper from 'material-ui/Paper'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'

const studentsStyles = {
  height: 540,
  width: 220,
  textAlign: 'left',
  marginLeft: 0
};


const StudentsList = (props) => (
	<Paper style={studentsStyles} zDepth={2}>
		<List>
			<Subheader>Students</Subheader>
			{props.studentsList}
		</List>
	</Paper>
)

export default StudentsList;