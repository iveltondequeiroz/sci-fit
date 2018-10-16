var React = require('react');
var ReactDOM = require('react-dom');
var PrintTemplate = require ('react-print');
 
class ProgramPrint extends React.Component {

  
  render() {
    let mappedDays = this.props.program.weeks[0].days.map(
      (day, i) => <p>Day {i}:{day.difficulty}</p>
    ) 

    let mappedSets = this.props.program.weeks[0].days[0].sets.map(
      (set) => <p>exercise:{set.exercise}, group:{set.group}</p>
    ) 

    return (
          <PrintTemplate>
             <div>

                  <h2>{this.props.program.user}</h2>
                  <h3>{this.props.program.name}</h3>
                  <h3>Week 1</h3>
                  {mappedDays}
                  {mappedSets}
                  <p>If you need to show different data, you could grab that data
                  via AJAX on componentWill/DidMount or pass it in as props</p>
                  <p>The CSS will hide the original content and show what is in your
                  Print Template.</p>
             </div>
           </PrintTemplate>
       )
  }
}

export default ProgramPrint;