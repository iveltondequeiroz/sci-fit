import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {lightBlueA100, lightBlueA200} from 'material-ui/styles/colors'
import {setDropGroup, setDropExercise} from '../actions/dropActions'
import {DropDownMenu, MenuItem} from 'material-ui'
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';


const SetList = props => 
	<TableRow>
		<TableRowColumn >
			<DropDownMenu value={1}>
		   		{props.mappedGroups}	
			</DropDownMenu>
		</TableRowColumn>
		
		<TableRowColumn value={1}>
			<DropDownMenu>
		   		{props.mappedExercises}
			</DropDownMenu>
		</TableRowColumn>

		<TableRowColumn >
			<input type="number" min="1" max="10"></input>
		</TableRowColumn>

		<TableRowColumn >
			<input type="number" min="1" max="10"></input>
		</TableRowColumn>
		
		<TableRowColumn >
			<input type="number" min="1" max="10"></input>
		</TableRowColumn>
		
		<TableRowColumn >
			<IconButton >
    			<Delete />
    		</IconButton >
		</TableRowColumn>


		<TableRowColumn style={{backgroundColor:lightBlueA100}}>
			<input type="number" min="1" max="10"></input>
		</TableRowColumn>
		<TableRowColumn style={{backgroundColor:lightBlueA100}}>
			<input type="number" min="1" max="10"></input>
		</TableRowColumn>
		
		<TableRowColumn style={{backgroundColor:lightBlueA200}}>
			<input type="number" min="1" max="10"></input>
		</TableRowColumn>
		<TableRowColumn style={{backgroundColor:lightBlueA200}}>
			<input type="number" min="1" max="10"></input>
		</TableRowColumn>
		
		<TableRowColumn style={{backgroundColor:lightBlueA100}}>
			<input type="number" min="1" max="10"></input>
		</TableRowColumn>
		<TableRowColumn style={{backgroundColor:lightBlueA100}}>
			<input type="number" min="1" max="10"></input>
		</TableRowColumn>
		
		<TableRowColumn style={{backgroundColor:lightBlueA200}}>
			<input type="number" min="1" max="10"></input>
		</TableRowColumn>
		<TableRowColumn style={{backgroundColor:lightBlueA200}}>
			<input type="number" min="1" max="10"></input>
		</TableRowColumn>
		
		<TableRowColumn style={{backgroundColor:lightBlueA100}}>
			<input type="number" min="1" max="10"></input>
		</TableRowColumn>
		<TableRowColumn style={{backgroundColor:lightBlueA100}}>
			<input type="number" min="1" max="10"></input>
		</TableRowColumn>
		<TableRowColumn style={{backgroundColor:lightBlueA200}}>
			<input type="number" min="1" max="10"></input>
		</TableRowColumn>
		<TableRowColumn style={{backgroundColor:lightBlueA200}}>
			<input type="number" min="1" max="10"></input>
		</TableRowColumn>
		<TableRowColumn style={{backgroundColor:lightBlueA100}}>
			<input type="number" min="1" max="10"></input>
		</TableRowColumn>
		<TableRowColumn style={{backgroundColor:lightBlueA100}}>
			<input type="number" min="1" max="10"></input>
		</TableRowColumn>
		<TableRowColumn style={{backgroundColor:lightBlueA200}}>
			<input type="number" min="1" max="10"></input>
		</TableRowColumn>
		<TableRowColumn style={{backgroundColor:lightBlueA200}}>
			<input type="number" min="1" max="10"></input>
		</TableRowColumn>
		<TableRowColumn style={{backgroundColor:lightBlueA100}}>
			<input type="number" min="1" max="10"></input>
		</TableRowColumn>
		<TableRowColumn style={{backgroundColor:lightBlueA100}}>
			<input type="number" min="1" max="10"></input>
		</TableRowColumn>
		<TableRowColumn style={{backgroundColor:lightBlueA200}}>
			<input type="number" min="1" max="10"></input>
		</TableRowColumn>
		<TableRowColumn style={{backgroundColor:lightBlueA200}}>
			<input type="number" min="1" max="10"></input>
		</TableRowColumn>
	</TableRow>
			    	
export default SetList;