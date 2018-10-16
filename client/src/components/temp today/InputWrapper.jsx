import React, {Component} from 'react'
import SelectField from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


class InputWrapper extends Component {


  onChange(evt, index, value) {
      console.log(this.props)
      if (this.props.onChange) {
        this.props.onChange(value);
      }
  
      console.log("index", index)
      console.log("value", value)
    
  }
  
  render() {
    return (
      
    );
  }
}

export default InputWrapper