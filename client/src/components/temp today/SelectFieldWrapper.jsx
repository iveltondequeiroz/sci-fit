import React, {Component} from 'react'
import SelectField from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


class SelectFieldWrapper extends Component {
  


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
      <SelectField {...this.props} value={3} onChange={this.onChange.bind(this)}>
          <MenuItem value={1} primaryText="Exrci" />
          <MenuItem value={2} primaryText="Every Night" />
          <MenuItem value={3} primaryText="Weeknights" />
          <MenuItem value={4} primaryText="Weekends" />
          <MenuItem value={5} primaryText="Weekly" />
      </SelectField>
    );
  }
}

export default SelectFieldWrapper