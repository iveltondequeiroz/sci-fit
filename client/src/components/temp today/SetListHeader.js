import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {lightBlueA100, lightBlueA200} from 'material-ui/styles/colors'

const SetListHeader = props => 
	<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn >GROUP</TableHeaderColumn>
        <TableHeaderColumn >EXERCISE</TableHeaderColumn>
        <TableHeaderColumn >SETS</TableHeaderColumn>
        <TableHeaderColumn >REPS</TableHeaderColumn>
        <TableHeaderColumn >WEIGHT</TableHeaderColumn>
        <TableHeaderColumn >DEL</TableHeaderColumn>
        <TableHeaderColumn >Weight 1</TableHeaderColumn>
        <TableHeaderColumn >Rep 1 </TableHeaderColumn>
        <TableHeaderColumn >Weight 2</TableHeaderColumn>
        <TableHeaderColumn >Rep 2</TableHeaderColumn>
        <TableHeaderColumn >Weight 3</TableHeaderColumn>
        <TableHeaderColumn >Rep 3</TableHeaderColumn>
        <TableHeaderColumn >Weight 4</TableHeaderColumn>
        <TableHeaderColumn >Rep 4</TableHeaderColumn>
        <TableHeaderColumn >Weight 5</TableHeaderColumn>
        <TableHeaderColumn >Rep 5</TableHeaderColumn>
        <TableHeaderColumn >Weight 6</TableHeaderColumn>
        <TableHeaderColumn >Rep 6</TableHeaderColumn>
        <TableHeaderColumn >Weight 7</TableHeaderColumn>
        <TableHeaderColumn >Rep 7</TableHeaderColumn>
        <TableHeaderColumn >Weight 8</TableHeaderColumn>
        <TableHeaderColumn >Rep 8</TableHeaderColumn>
        <TableHeaderColumn >Weight 9</TableHeaderColumn>
        <TableHeaderColumn >Rep 9</TableHeaderColumn>
        <TableHeaderColumn >Weight 10</TableHeaderColumn>
        <TableHeaderColumn >Rep 10</TableHeaderColumn>
      </TableRow>
    </TableHeader>	
			    	
export default SetListHeader;