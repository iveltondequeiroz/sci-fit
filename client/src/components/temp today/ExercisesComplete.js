import React from 'react'
import Paper from 'material-ui/Paper'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import DropDownMenu from 'material-ui/DropDownMenu';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {TableFooter} from 'material-ui/Table';
import DoneAll from 'material-ui/svg-icons/action/done-all';
import FlatButton from 'material-ui/FlatButton'



const groupStyles = {
  height: 540,
  width: 400,
  textAlign: 'left',
  marginLeft: 0
};

const ExercisesComplete = (props) => (
	<div>
		<table style={{border:'1px'}}>
			<thead>
			<tr>
				<th>Exercise</th>
				<th>Sets</th>
				<th>Reps</th>
				<th>Prescribed Weight</th>
				<th>Weight 1</th>
				<th>Rep 1</th>
				<th>Weight 2</th>
				<th>Rep 2</th>
				<th>Weight 3</th>
				<th>Rep 3</th>
				<th>Weight 4</th>
				<th>Rep 4</th>
				<th>Weight 5</th>
				<th>Rep 5</th>
				<th>Weight 6</th>
				<th>Rep 6</th>
				<th>Weight 7</th>
				<th>Rep 7</th>
			</tr>
			</thead>	
			<tbody>
				{props.lista}
			</tbody>
		</table>	
    </div>			
)

export default ExercisesComplete;