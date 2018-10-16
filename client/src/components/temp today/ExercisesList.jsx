import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


const ExercisesList = props => 
	<div>
		<Table onCellClick={props.funcao} style={{tableLayout: 'auto'}} >
		    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
		      <TableRow>
		        <TableHeaderColumn style={{width:'46%'}}>EXERCISE</TableHeaderColumn>
		        <TableHeaderColumn style={{width:'14%'}}>SETS</TableHeaderColumn>
		        <TableHeaderColumn style={{width:'14%'}}>REPS</TableHeaderColumn>
		        <TableHeaderColumn style={{width:'14%'}}>PRESCRIBED WEIGHT</TableHeaderColumn>
		        <TableHeaderColumn style={{width:'14%'}}>DEL</TableHeaderColumn>
		      </TableRow>
		    </TableHeader>
			<TableBody stripedRows={true} displayRowCheckbox={false}>
				{props.lista}
			</TableBody>
		</Table>	
    </div>			

export default ExercisesList;