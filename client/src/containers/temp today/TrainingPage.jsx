import React, { PropTypes } from 'react';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Grid, Row, Col, Clearfix, Image} from 'react-bootstrap'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import ExercisesComplete from '../components/ExercisesComplete.js'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'
import DoneAll from 'material-ui/svg-icons/action/done-all'
import Home from 'material-ui/svg-icons/action/home'
import Print from 'material-ui/svg-icons/action/print'
import Settings from 'material-ui/svg-icons/action/settings'
import SettingsPower from 'material-ui/svg-icons/action/settings-power'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'
import CropLandscape from 'material-ui/svg-icons/image/crop-landscape'


import TextField from 'material-ui/TextField'

import Drawer from 'material-ui/Drawer'
import Menu from 'material-ui/svg-icons/navigation/menu'


import FitnessCenter from 'material-ui/svg-icons/places/fitness-center'
import ContentPaste from 'material-ui/svg-icons/content/content-paste'

import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import {lightBlueA100, lightBlueA200, red500, indigo500, indigoA400, blue50, lightBlue900} from 'material-ui/styles/colors'


import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import { Link, IndexLink } from 'react-router';
import Save from 'material-ui/svg-icons/content/save'




import {connect} from 'react-redux'

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

import ProgramPrint from '../components/ProgramPrint'



@connect((store) => {
  return {
    exercises:store.exercises.exercises,
    groups: store.exercises.groups,
    drops:store.drops,
    exsets:store.program.exsets,
    program: store.program
  }
})  



class TrainingPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      program:'none',
      userName: 'none',
      studentName:'none',
      currentDay: 0,
      selWeek: 0,
      programs:[],
      students:[],
      difficulty:'hard',
      menuopen: false,
      saveProgram:false,
      studentchange:false, 
      programsLoaded:false,
      selectedStudent:0,
      chooseRIR:[
        {id:0, name:"0 (Max effort)"},
        {id:1, name:"0.5 (Maybe 1 more)"},
        {id:2, name:"1 (Definitely 1 more)"},
        {id:3, name:"1.5 (Maybe 2 more)"},
        {id:4, name:"2 (Definitely 2 more)"},
        {id:5, name:"2.5 (Maybe 3 more)"},
        {id:6, name:"3 (Definitely 3 more)"},
        {id:7, name:"3.5 (Maybe 4 more)"},
        {id:8, name:"4 (Definitely 4 more)"}
      ],
      prescribedRIR:[
        {id:0, name:"0 Reps left - (Go To Failure)"},
        {id:1, name:"0.5 (Just shy of failure)"},
        {id:2, name:"1 (Stop 1 rep short of failure)"},
        {id:3, name:"1.5 (Stop 1.5 reps short of failure)"},
        {id:4, name:"2 (Stop 2 reps short of failure)"},
        {id:5, name:"2.5 (Stop 2.5 reps short of failure)"},
        {id:6, name:"3 (Stop 3 reps short of failure)"},
        {id:7, name:"3.5 (Stop 3.5 reps short of failure)"},
        {id:8, name:"4 (Stop 4 reps short of failure)"}
      ],
      groups:[
        {id:1, name:'Triceps'},
        {id:2, name:'Biceps'},
        {id:3, name:'Quadricep Compound'},
        {id:4, name:'Quadricep Isolation'},
        {id:5, name:'Hamstring Compound'},
        {id:6, name:'Hamstring Isolation'},
        {id:7, name:'Glutes'},
        {id:8, name:'Calves'},
        {id:9, name:'Chest Compound'},
        {id:10, name:'Chest Isolation'},
        {id:11, name:'Shoulder'},
        {id:12, name:'Lateral Deltoid'},
        {id:13, name:'Posterior Deltoid'},
        {id:14, name:'Back'},
        {id:15, name:'Abdominals'},
        {id:16, name:'Squat'},
        {id:17, name:'Dead Lift'},
        {id:18, name:'Bench Press'}
      ],
      exercises:[ 
        {id:1, group:"Triceps", name:"Tricep Straight Bar Pushdowns (Cable Machine)", progression:"double" },
        {id:2, group:"Triceps", name:"Tricep Rope Pulldowns (Cable Machine)", progression:"double"},
        {id:3, group:"Triceps", name:"Tricep Skull Crushers (Curl Bar)", progression:"double"},
        {id:4, group:"Triceps", name:"Tricep Close Grip Bench Press (Barbell)", progression:"linear"},
        {id:5, group:"Triceps", name:"Tricep Kickback (Dumbbell)", progression:"double"},
        {id:6, group:"Biceps", name:"Bicep Concentration Curl (Dumbbell)", progression:"double"},
        {id:7, group:"Biceps", name:"Bicep Seated Curl (Dumbbell)", progression:"double"},
        {id:8, group:"Biceps", name:"Bicep Preacher Curl (Curl Bar)", progression:"double"},
        {id:9, group:"Biceps", name:"Bicep Curl (Barbell)", progression:"double"},
        {id:10, group:"Quadricep Compound", name:"Hack Squat (Machine)", progression:"linear"},
        {id:11, group:"Quadricep Compound", name:"Front Squat (Barbell)", progression:"linear"},
        {id:12, group:"Quadricep Compound", name:"Leg Press", progression:"linear"},
        {id:13, group:"Quadricep Isolation", name:"Leg Extensions", progression:"double"},
        {id:14, group:"Quadricep Isolation", name:"Leg Extensions (Single Leg)", progression:"double"},
        {id:15, group:"Quadricep Isolation", name:"Static Lunge (Dumbbell)", progression:"double"},
        {id:16, group:"Quadricep Isolation", name:"Rear Foot Elevated Lunge", progression:"double"},
        {id:17, group:"Hamstring Compound", name:"Stiff Legged Deadlift (Barbell)", progression:"linear"},
        {id:18, group:"Hamstring Isolation", name:"Hamstring Curls (Machine)", progression:"double"},
        {id:19, group:"Hamstring Isolation", name:"Single Hamstring Curls (Machine)", progression:"double"},
        {id:20, group:"Glutes", name:"Glute Bridge (Barbell)", progression:"linear"},
        {id:21, group:"Calves", name:"Standing Calf Raise (Machine)", progression:"double"},
        {id:22, group:"Calves", name:"Seated Calf Raise (Machine)", progression:"double"},
        {id:23, group:"Chest Compound", name:"Decline Chest Press (Dumbbell)", progression:"double"},
        {id:24, group:"Chest Compound", name:"Decline Chest Press (Barbell)", progression:"linear"},
        {id:25, group:"Chest Compound", name:"Flat Chest Press (Dumbbell)", progression:"double"},
        {id:26, group:"Chest Compound", name:"Chest Press Machine", progression:"double"},
        {id:27, group:"Chest Isolation", name:"Chest Cable Fly (Machine)", progression:"double"},
        {id:28, group:"Chest Isolation", name:"Decline Fly (Dumbbell)", progression:"double"},
        {id:29, group:"Chest Isolation", name:"Flat Bench Fly (Dumbbell)", progression:"double"},
        {id:30, group:"Shoulder", name:"Standing Shoulder Press (Barbell)", progression:"linear"},
        {id:31, group:"Shoulder", name:"Seated Shoulder Press (Barbell)", progression:"linear"},
        {id:32, group:"Shoulder", name:"Seated Shoulder Press (Dumbbell)", progression:"double"},
        {id:33, group:"Shoulder", name:"Machine Shoulder Press", progression:"double"},
        {id:34, group:"Lateral Deltoid", name:"Shoulder Side Lateral Raise (Dumbbell)", progression:"double"},
        {id:35, group:"Lateral Deltoid", name:"Upright Row", progression:"double"}, 
        {id:36, group:"Posterior Deltoid", name:"Shoulder Reverse Fly (Machine)", progression:"double"},
        {id:37, group:"Posterior Deltoid", name:"Shoulder Reverse Fly - Chest Supported (Dumbbell)", progression:"double"}, 
        {id:38, group:"Back", name:"Lat Pulldown (Underhand + Narrow Grip)", progression:"double"}, 
        {id:39, group:"Back", name:"Lat Pulldown (Regular Overhand Grip)", progression:"double"}, 
        {id:40, group:"Back", name:"Single Arm Row (Dumbbell)", progression:"double"},  
        {id:41, group:"Back", name:"Bent Over Row (Barbell)", progression:"linear"},  
        {id:42, group:"Back", name:"Chin up (Underhand Grip)", progression:"double"}, 
        {id:43, group:"Back", name:"Chin up (Overhand Grip)", progression:"double"},  
        {id:44, group:"Back", name:"Chest Supported Row (Dumbbell)", progression:"double"}, 
        {id:45, group:"Back", name:"Seated Cable Row", progression:"double"}, 
        {id:46, group:"Back", name:"Machine Back Row (Machine of choice with a chest support)", progression:"double"},  
        {id:47, group:"Back", name:"Close Grip Attachment Pulldown", progression:"double"},
        {id:48, group:"Abdominals", name:"Crunch With Arms Extended", progression:"double"},  
        {id:49, group:"Abdominals", name:"Hanging Leg Raises", progression:"double"}, 
        {id:50, group:"Abdominals", name:"Lying Leg Raises", progression:"double"}, 
        {id:51, group:"Abdominals", name:"Oblique Side Bends (Dumbbell)", progression:"double"},
        {id:52, group:"Squat", name:"Front Squat (Barbell)", progression:"linear"},  
        {id:53, group:"Squat", name:"Leg Press", progression:"linear"},  
        {id:54, group:"Squat", name:"Smith Machine Squat", progression:"linear"},
        {id:55, group:"Squat", name:"Hack Squat (Machine)", progression:"linear"},    
        {id:56, group:"Dead Lift", name:"Rack Pulls (Barbell)", progression:"linear"},    
        {id:57, group:"Dead Lift", name:"Sumo Dumbbell Dead Lift", progression:"linear"},   
        {id:58, group:"Dead Lift", name:"Sitff Legged Dead Lift", progression:"linear"},    
        {id:59, group:"Bench Press", name:"Decline Chest Press (Barbell)", progression:"linear"},
        {id:60, group:"Bench Press", name:"Flat Chest Press (Dumbbell)", progression:"double"},
        {id:61, group:"Bench Press", name:"Machine Chest Press", progression:"double"},
      ]
    }
  }

  handleToggle = () => this.setState({menuopen: !this.state.menuopen});

  handleClose = () => this.setState({menuopen: false});

  componentDidMount(){
    let dbstudents = this.studentsGet()
    console.log("END DIDMOUNT")    
  }  



  calcProgress(weight, reps, model){
    console.log("[[[[[[calcProgress]", weight, reps, model)
     
      let percent=0;
      if(model=="linear") {
        switch(reps) {
          case 0:
            percent=0
            break;  
          case 1:
          case 2:
          case 3:
            percent=0.025
            break;
          case 4:
          case 5:
            percent=0.05
            break;
          case 6:
          case 7:
            percent=0.075
            break;
          default:
            percent=0.1
        }
    } else {
      console.log("double")
    }
    console.log("calcProgress=", reps, percent, "w*p+w=", weight*percent+weight)
    return percent
  }

  saveProgram(){
    //this.calcProgress(60, 10, "linear");
    
    console.log("$ave program")
    console.log(this.state.program) 

    fetch('/upsertprogram', {
                method: 'POST',
                  headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(
                  {program:this.state.program, user:this.state.studentName}
                )
              })
    console.log("program saved")
    this.setState({
      saveProgram:false
    })
  }

  setInputWeight(evt){
    console.log("setInputWeight")
    console.log(evt.nativeEvent.target)
    
    let val = evt.nativeEvent.target.value
    let row = evt.target.dataset.row;
    console.log("val", val)
    console.log("row", row)
    console.log("current week", this.state.selWeek)
    console.log("current day", this.state.currentDay)
      
    let wset = this.state.program.weeks[this.state.selWeek].days[this.state.currentDay].sets[row]
    
    console.log(wset)
    
    console.log("evt.target.dataset.field")
    console.log(evt.target.dataset.field)
    
    switch(evt.target.dataset.field) {
      case "w1":
        wset.w1 = val
        break;
      case "w2":
        wset.w2 = val
        break;
      case "w3":
        wset.w3 = val
        break;
      case "w4":
        wset.w4 = val
        break;
      case "w5":
        wset.w5 = val
        break;
      case "w6":
        wset.w6 = val
        break;  
    }
    
    this.setState({
      wset,
      saveProgram:true
    });

  }

  setInputRep(evt){
    console.log(evt.nativeEvent.target)
    
    let val = evt.nativeEvent.target.value
    let row = evt.target.dataset.row;

    let rset = this.state.program.weeks[this.state.selWeek].days[this.state.currentDay].sets[row]
    switch(evt.target.dataset.field) {
      case "r1":
        rset.r1 = val
        break;
      case "r2":
        rset.r2 = val
        break;
      case "r3":
        rset.r3 = val
        break;
      case "r4":
        rset.r4 = val
        break; 
      case "r5":
        rset.r5 = val
        break; 
      case "r6":
        rset.r6 = val
        break; 
    }
    
    this.setState({
      rset,
      saveProgram:true
    });

  }

  setInputNote(evt){
    console.log("setInputNote")
    let val = evt.nativeEvent.target.value
    let row = evt.target.dataset.row;
    let nset = this.state.program.weeks[this.state.selWeek].days[this.state.currentDay].sets[row]
    //console.log(val)    
    nset.note = val
    this.setState({
      nset,
      saveProgram:true
    });
  }

  setSets(evt){
    let val = evt.nativeEvent.target.value
    let day = evt.target.dataset.tableday;
    let row = evt.target.dataset.row;
    console.log("VAL",val)
    console.log("DAY",day)
    console.log("ROW",row)

    
    const items = this.state.programs[0].weeks[this.state.selWeek].days;
    items[day-1].sets[row].sets=val;
      
    this.setState({
        items,
        programClean:false
      });
  }

  

  findGroup(id){
    let grupo = this.state.groups.filter((grp) => grp.id==id)
    return grupo[0].name
  }


  findExercise(idex){
    //if(typeof idex == 'undefined') return "nodef"
    //console.log("FIND EXERCISE>FIND EXERCISE>FIND EXERCISE>FIND EXERCISE>") 
    //console.log("IDEX>", idex)
    //console.log("idex-1.name")
    //console.log(this.state.exercises[idex-1].name);

    //console.log(idex)
    //console.log("group")
    //console.log(groupid)
    
    //console.log("this.state.exercises")
    //console.log(this.state.exercises)

    //let groupname = this.findGroup(idgroup)
    //let mappedExs = this.state.exercises.filter((ex) => ex.group==groupname)
    //console.log("mappedExs")
    //console.log(mappedExs)
    //if(typeof idex !='undefined') {
      //console.log(mappedExs[idex-1].name)
      //return mappedExs[idex-1].name
      //return this.state.exercises[idex-1].name; //mappedExs[idex].name  
    //} else {
      //return "none"
    //}
    return this.state.exercises[idex-1].name;
        
  }


  

  programsGet(){
    console.log("programsGet()")
    fetch('/getprograms') 
      .then(res => res.json())
            .then(data => {
                console.log("after FETCH programsGet")
                console.log(data)
                if(this.state.studentName!=='none'){
                  let filteredProgs = data.filter((prog) => prog.user == this.state.studentName && (prog.endcycle != true))
                  if(filteredProgs.length==0) {
                    this.setState({
                      programs: filteredProgs,
                      programsLoaded:true
                    })  
                    return
                  }                  

                  
                  let currentProg = filteredProgs[0]
                  let weeks = currentProg.weeks 
                  let curweek=0
                  let curday=0
                  let breakouter=false;
                  for(let w=0;w<weeks.length;w++){
                    curweek=w
                    console.log("w",w)
                    console.log("weeks", weeks[w])
                    for(let d=0;d<weeks[w].days.length;d++) {
                      curday=d
                      if(weeks[w].days[d].workoutComplete==false){
                        breakouter=true
                        break
                      }
                    } 
                    if(breakouter) { break }
                  }
                  console.log("curweek", curweek)
                  console.log("curday", curday)
                  
                  this.setState({
                    programs: filteredProgs,
                    program:currentProg,
                    programsLoaded:true,
                    selWeek:curweek,
                    currentDay:curday
                  }, function(){
                    /*console.log("STATE OK")
                    console.log(this.state)
                    console.log("current program,selWeek, currentDay..............")
                    console.log(this.state.program)
                    console.log(this.state.selWeek)
                    console.log(this.state.currentDay)
                    */
                  })
                }
            //}
        })
  }

  buttonSelected(evt, val){
    console.log(evt)
    console.log(val)
    let day = this.state.program.weeks[this.state.selWeek].days[this.state.currentDay]
    day.difficulty=val
    this.setState({
      day,
      difficulty:val,
      saveProgram:true
    })
  } 

  printProgram(){
    console.log("print program")
    print()
    
  }

  setFSI(evt){
    //console.log("setGroup")
  //  console.log("setFIS")

//console.log("VALLLLLL")

    
      let val = evt.nativeEvent.target.value
      let day = this.state.currentDay;
      let row = evt.target.dataset.row;

//console.log(val)
//console.log(day)
//console.log(row)
//console.log("this.state.selWeek")
//console.log(this.state.selWeek)


      this.setState({
        fsival:val,
        saveProgram:true
      })
      

      const items = this.state.program.weeks[this.state.selWeek].days;
      items[day].sets[row].fsival=parseInt(val);
      this.setState({
        items,
          programClean:false
      });
          
  }


  setStudent(evt){
    console.log("setStudent")
    let val = evt.nativeEvent.target.value
    let studentname = evt.nativeEvent.target[val].text
    console.log("studentname==>", studentname)

    this.setState({
      studentName:studentname, 
      selectedStudent:parseInt(val),
      programsLoaded:false
    }, function(){
      this.programsGet()
      this.setState({
        studentchange:true
      })
    })
  }

  studentsGet(){
    //console.log("studentsGet()")

    fetch('/getstudents') 
      .then(res => res.json())
            .then(data => {
              if(data.length!=0) {
              this.setState({
                  students:data,
                  studentchange:true
              })

              console.log("studentsGet() data")
              console.log(data)
            }
        })
  }


  fsiText(fsidrop, fsival) {
    let fsitext='none'
    if(fsidrop==1) {
      fsitext=this.state.prescribedRIR[fsival].name
    } else if(fsidrop==2) {
      fsitext=this.state.chooseRIR[fsival].name
    } else {
      fsitext="Go to Failure On Final Set"
    }
    return fsitext
  }

  finalWeight(w){
    // increment 2.5kg, for weight equal less 10, 1 kg
    //console.log("input weight", w)

    let mod = w%10
    if(mod==0) { 
      console.log("final=", w)
      return w
    } 
    let unidade = Math.floor(w/10)
    let inc=0;
    if(mod<=2.5){
      inc=2.5
    } else if(mod<=5) {
      inc=5
    } else if(mod<=7.5) {
      inc=7.5
    } else {
      inc= 10
    }

    let soma = unidade + (inc/10)
    let final = soma*10
    //console.log("mod "+w+"=", mod)
    //console.log("unidade "+w+"=", unidade)
    //console.log("inc =", inc)
    //console.log("soma =", soma)
    console.log("final=", w, final)

    
    
    //let inc = 2.5
    //if(w<=1) { inc=-1.5}

    //let result=w%100;
    return final
  }


  findProgressModel(idex){
    console.log("findProgressModel", this.state.exercises[idex-1].progression)
    return this.state.exercises[idex-1].progression;
  }

  applyAmrapDouble(){
    console.log("[applyAmrap DOUBLE]")
    let sets = this.state.program.weeks[this.state.selWeek].days[this.state.currentDay].sets
    let weeks = this.state.program.weeks

    //console.log("sets",sets)
    let numsets = sets.length
    //console.log("numsets",numsets)

    for(let s=0;s<numsets;s++){
      
      let set = sets[s]
      let progression= this.findProgressModel(set.exercise)
      //console.log("PROGRESSION progressionPROGRESSIONPROGRESSIONPROGRESSIONPROGRESSIONPROGRESSIONPROGRESSION", progression)
      ///console.log("progression", progression)
      //console.log("set.amrap==true", set.amrap==true)
      //console.log("set", set)
      
      if(progression == 'linear') {
        console.log("skipping linear")
        continue
      }

      if(progression=="double" && set.amrap==true) {
        console.log("progression==double && set.amrap==true PROGRESSION")

        if(this.state.selWeek<=weeks.length-2) {
          console.log("tem semanas a frente")
          let nxtweek = this.state.program.weeks[this.state.selWeek+1]
          let nxtdays = nxtweek.days
          let searchid = set.id
          console.log("nxtdays---------------------------------------------")
          console.log(nxtdays)
          for(let d=0;d<nxtdays.length;d++) {
            // check exercise id
            let nxtsets = nxtweek.days[d].sets
            for(let n=0; n<nxtsets.length; n++) {
              let nxtset = nxtsets[n]
              console.log ("next set>>>>>", nxtset)
              if(nxtset.amrap==true && nxtset.id==searchid) {
                  console.log ("<<<<<achou amrap double>>>>>", n)
                  console.log("rep range>", set.reps)
                  let reprange = set.reps.toString()

                  if(reprange.indexOf("-")==-1){
                    console.log("NAAPO TEMMrep range>", set.reps)
                    break;
                  }
                  let res = set.reps.split("-")
                  let highend = res[1]
                  let morereps = false
                  console.log("set sets > ", set.sets)
                  console.log("highend", highend)
                  switch(parseInt(set.sets)){
                    case 1: { morereps =(set.r1<highend); console.log("case1"); break }
                    case 2: { morereps =(set.r1<highend || set.r2 <highend); console.log("case2"); break }
                    case 3: { morereps =(set.r1<highend || set.r2 <highend || set.r3 <highend); console.log("case3"); break }
                    case 4: { morereps =(set.r1<highend || set.r2 <highend || set.r3 <highend || set.r4 <highend); console.log("case4"); break }
                    case 5: { morereps =(set.r1<highend || set.r2 <highend || set.r3 <highend || set.r4 <highend || set.r5 <highend); console.log("case5"); break }
                    case 6: { morereps =(set.r1<highend || set.r2 <highend || set.r3 <highend || set.r4 <highend || set.r5 <highend || set.r6 <highend); console.log("case6"); break }
                  }
                  if(morereps==true) {
                    nxtset.amrapmsg='r'  
                  } else {
                    nxtset.amrapmsg='w'
                  }
                  
              //    console.log("MOOOOORE REPS=", morereps)
              }
            }  
          } 
        }  
      }
    } 
  }  
  
  applyAmrapLinear(){
    
    let sets = this.state.program.weeks[this.state.selWeek].days[this.state.currentDay].sets
    let weeks = this.state.program.weeks

    //console.log("sets",sets)
    let numsets = sets.length
    //console.log("numsets",numsets)

    for(let s=0;s<numsets;s++){
      let set = sets[s]
      let progression= this.findProgressModel(set.exercise)
      console.log("PROGRESSION progressionPROGRESSIONPROGRESSIONPROGRESSIONPROGRESSIONPROGRESSIONPROGRESSION", progression)
      ///console.log("progression", progression)
      //console.log("set.amrap==true", set.amrap==true)
      //console.log("set", set)
      
      if(progression=='double') {
        console.log("skiping double")
        continue;
      }
        
      if(set.amrap==true && s!=0) {
        let searchid = set.id
        let model = this.findProgressModel(set.exercise)
        let amrap = this.finalWeight((sets[s-1].weight)*this.calcProgress(sets[s-1].weight, parseInt(sets[s-1].reps), model)+parseInt(set.w1))
        console.log("SET ID :"+searchid)
        console.log("amrap",amrap)
        console.log("weeks.length",weeks.length)
        if(this.state.selWeek<=weeks.length-2) {
        console.log("tem semanas a frente")
          let nxtweek = this.state.program.weeks[this.state.selWeek+1]
          let nxtdays = nxtweek.days
          console.log("nxtdays---------------------------------------------")
          console.log(nxtdays)
          for(let d=0;d<nxtdays.length;d++) {
            // check exercise id
            let nxtsets = nxtweek.days[d].sets
            for(let n=0; n<nxtsets.length; n++) {
                let nxtset = nxtsets[n]
                console.log ("next set>>>>>", nxtset)
                if(nxtset.amrap==true && nxtset.id==searchid) {
                  console.log ("<<<<<achou amrap>>>>>", n)
                  if(n>0){
                    let prevset = nxtsets[n-1]
                    prevset.weight= amrap
                    nxtset.weight= amrap
                    break;
                  } 
                }
            }  
            console.log("nxtsets---------------------------------------------")
            console.log(nxtsets)
            console.log("nxtweek---------------------------------------------")
            console.log(nxtweek)
          }  
        }
        // find next week exercise

        
         //let amrap = this.finalWeight((setsdays.sets[0].weight)*this.calcProgress(setsdays.sets[0].weight, parseInt(setsdays.sets[0].reps), this.findProgressModel(set.exercise))+parseInt(set.w1)))
      }         
    }
  }  

  applyAmrap(){
    console.log("[applyAmrap]")
    this.applyAmrapDouble()
    //this.applyAmrapLinear()
    
  }

  workoutComplete(){
    console.log("workoutCompleteworkoutComplete")
    // find amrap and apply calc weight on next week exercise
    this.applyAmrap()
    console.log("back to workoutCompleteworkoutComplete")
    console.log(this.state.program)
    //console.log(this.state.program.weeks[this.state.selWeek].days)
    let numweeks = this.state.program.weeks.length
    let numdays = this.state.program.weeks[this.state.selWeek].days.length
//    console.log(this.state.selWeek)
//    console.log("numdays",numdays)
//    console.log("this.state.currentDay", this.state.currentDay)

    
    
      this.state.program.weeks[this.state.selWeek].days[this.state.currentDay].workoutComplete = true;
    console.log("this.state.program.weeks", this.state.program.weeks[this.state.selWeek].days[this.state.currentDay].workoutComplete )
    
    let newprog=this.state.program
    
    console.log("newprog",newprog)

    this.setState({
        program:newprog
    }, function(){
        this.saveProgram()
        console.log("workoutComplete end")  
    })

    if(numdays>1 && this.state.currentDay!=numdays-1){
      console.log("IF IFI FIIFIFIFIIFIIFIIFIIFIF")
      console.log("this.state.currentDay", this.state.currentDay)
      console.log("numdays", numdays)
      
      let nextday = this.state.currentDay+1

      this.setState({
        currentDay:nextday    
      }, function(){
        console.log("currentDay>>>>>>>>>>>>>>>>>>>>>", this.state.currentDay)
      })
    
    } else {
      console.log("ELSE")
      console.log("this.state.selWeek")
      console.log(this.state.selWeek)
      console.log("numweeks")
      console.log(numweeks)
      
      
      if(this.state.currentDay==numdays-1){
        console.log("if this.state.currentDay==numdays-1")
        if(this.state.selWeek!=numweeks-1){
          console.log("if this.state.selWeek!=numweeks")
          console.log(this.state.selWeek!=numweeks)
          let nxtweek = this.state.selWeek+1
          this.setState({
            selWeek:nxtweek,
            currentDay:0  
          }, function(){
            console.log("selWeek........................", this.state.selWeek)
            console.log("currentDay.....................", this.state.currentDay)
          })
        } 
      }
    }   
  }


 
  /**
   * Render the component.
   */
  render() {
    if(this.state.studentchange==false) {
      console.log("RETURNIG")
      return (<span></span>)
    }
    const gridStyle = {
      marginLeft  : 10,
      marginRight : 10,
    };

    const profileStyles = {
      height: 40,
      width: 1200,
      textAlign: 'left',
      marginLeft: 0,
      marginBottom: 20
    };

    const toolbarStyles = {
      margin: 10,
      backgroundColor: '#283593'
    };

    const menuStyles = {
      color: '#FFFFFF'
    };

    
    const colWidth = {
      width:'200px' 
    } 

    const menuTitleStyles = {
      color: '#FFFFFF',
      backgroundColor: '#283593',
      marginLeft: 10,
    };

    const styles = {
      block: {
        maxWidth: 250,
      },
      radioButton: {
        marginBottom: 6,
        marginLeft: 10,

      },

      largeIcon: {
        width: 120,
        height: 120,
      }

    };

    const colStyle = {
       fontSize: 14,
       width:180
    }


    
    //console.log("this.state.studentName");
    //console.log(this.state.studentName);
    //console.log(this.state);
    if(this.state.studentName=='none'){ 
      console.log("NONE NONE NONE NONE NONE NONE")
      let mappedStudents =  this.state.students.map(
          student => 
            <option value={student.id} key={student.id}>
              {student.name} 
            </option>
      )
      console.log("PROGRAM")
      return(

      <div>
        <div className="notprint">
          <Toolbar style={toolbarStyles}>
            <IconButton  onTouchTap={this.handleToggle}>
              <Menu color={blue50}/>
            </IconButton>

            <Drawer
              docked={false}
              open={this.state.menuopen}
              onRequestChange={(open) => this.setState({menuopen})}
            >
                  
              <MenuItem containerElement={<Link to="/layout" />} leftIcon={<ContentPaste />} onTouchTap={this.handleClose}>Program Layout Maker</MenuItem>
              <MenuItem containerElement={<Link to="/training" />} leftIcon={<FitnessCenter />} onTouchTap={this.handleClose}>Training Sheet Outcome</MenuItem>
              <MenuItem containerElement={<Link to="/admin" />} leftIcon={<AccountCircle />} onTouchTap={this.handleClose}>Users</MenuItem>
              <MenuItem containerElement={<Link to="/" />} leftIcon={<Home />} onTouchTap={this.handleClose}>Home Page</MenuItem>
              <MenuItem leftIcon={<Settings />} onTouchTap={this.handleClose}>Admin Tools</MenuItem>
            </Drawer>

              <ToolbarGroup firstChild={true} style={{color:blue50}}>
                <ToolbarTitle text="Training Sheet Outcome" style={menuTitleStyles} />
              </ToolbarGroup>
             
              <ToolbarGroup>
                <ToolbarSeparator color={blue50}/>
                  <Chip>
                    <Avatar src="images/avatar64m.png" />
                       Nigel
                  </Chip>
                    <MenuItem style={menuStyles}
                    containerElement={<Link to="/homepage" />}
                    leftIcon={<SettingsPower color={blue50}/>}
                  />
                </ToolbarGroup>
              </Toolbar>
        </div>
        


        <div className="container-fluid"> 
          <Grid fluid={true}>
            <Row className="show-grid">
                  <Col xs={12} md={12} lg={16}>
                       <span>
                        Student&nbsp;&nbsp;
                          <select default={this.state.selectedStudent} onChange={this.setStudent.bind(this)}>
                            {mappedStudents}  
                          </select>
                        </span>  
                </Col>
            </Row>        
          </Grid>
        </div>
      </div>  
      )
    }

    if(!this.state.programsLoaded) {
      console.log("not loaded >>>>>>>>>>>>>>");
      return(<span></span>)
    }

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    //console.log(this.state)



  if(this.state.programs.length==0){ 
      console.log("NO PROGRAMS AVAILABLE")
      let mappedStudents =  this.state.students.map(
          student => 
            <option value={student.id} key={student.id}>
              {student.name} 
            </option>
      )
      return(

      <div>
        <div className="notprint">
          <Toolbar style={toolbarStyles}>
            <IconButton  onTouchTap={this.handleToggle}>
              <Menu color={blue50}/>
            </IconButton>

            <Drawer
              docked={false}
              open={this.state.menuopen}
              onRequestChange={(open) => this.setState({menuopen})}
            >
                  
              <MenuItem containerElement={<Link to="/layout" />} leftIcon={<ContentPaste />} onTouchTap={this.handleClose}>Program Layout Maker</MenuItem>
              <MenuItem containerElement={<Link to="/training" />} leftIcon={<FitnessCenter />} onTouchTap={this.handleClose}>Training Sheet Outcome</MenuItem>
              <MenuItem containerElement={<Link to="/admin" />} leftIcon={<AccountCircle />} onTouchTap={this.handleClose}>Users</MenuItem>
              <MenuItem containerElement={<Link to="/" />} leftIcon={<Home />} onTouchTap={this.handleClose}>Home Page</MenuItem>
              <MenuItem leftIcon={<Settings />} onTouchTap={this.handleClose}>Admin Tools</MenuItem>
            </Drawer>

              <ToolbarGroup firstChild={true} style={{color:blue50}}>
                <ToolbarTitle text="Training Sheet Outcome" style={menuTitleStyles} />
              </ToolbarGroup>
             
              <ToolbarGroup>
                <ToolbarSeparator color={blue50}/>
                  <Chip>
                    <Avatar src="images/avatar64m.png" />
                       Nigel
                  </Chip>
                    <MenuItem style={menuStyles}
                    containerElement={<Link to="/homepage" />}
                    leftIcon={<SettingsPower color={blue50}/>}
                  />
                </ToolbarGroup>
              </Toolbar>
        </div>
        


        <div className="container-fluid"> 
          <Grid fluid={true}>
            <Row className="show-grid">
                  <Col xs={12} md={12} lg={16}>
                      <span>
                          Student&nbsp;&nbsp;
                          <select default={this.state.selectedStudent} onChange={this.setStudent.bind(this)}>
                            {mappedStudents}  
                          </select>
                      </span>
                      <span>
                          <h3>No Programs Avaible for {this.state.studentName}</h3>
                      </span>  
                </Col>
            </Row>        
          </Grid>
        </div>
      </div>  
      )
    }


    let prescribedSets = this.state.prescribedRIR.map(
      rir =>
        <option value={rir.id}>{rir.name}</option> 
    )  

    let chooseSets = this.state.chooseRIR.map(
          rir =>
            <option value={rir.id} id={rir.id}>{rir.name}</option> 
        ) 

    const gotofailure ="Go to Failure On Final Set"
    
    console.log("setsweeks")
    console.log("this.state.program")
    console.log(this.state.program)
    
    const setsweeks =  this.state.program.weeks;//.days[currentDay].sets;
    console.log("setsweeks")
    console.log(setsweeks)
    console.log("this.state.selWeek", this.state.selWeek);
    console.log("this.state.currentDay", this.state.currentDay);
    
    const setsdays = setsweeks[this.state.selWeek].days[this.state.currentDay]
    console.log("setsdays");
    console.log(setsdays);

    console.log("this.state.program.weeks[this.state.selWeek].days[this.state.currentDay].workoutComplete")
    console.log(this.state.program.weeks[this.state.selWeek].days[this.state.currentDay].workoutComplete)

    let sets = setsdays.sets.map(
      (set,i) =>
        <TableRow>
          <TableRowColumn>{set.order}</TableRowColumn>
          <TableRowColumn>{set.manualex==''?this.findExercise(set.exercise):set.manualex}</TableRowColumn>
          <TableRowColumn>{set.sets}</TableRowColumn>
          <TableRowColumn>{set.reps}</TableRowColumn>
          <TableRowColumn>{set.weight}</TableRowColumn>
          <TableRowColumn>
            {set.fsidrop!=2?(set.fsidrop==3?gotofailure:this.state.prescribedRIR[set.fsival].name):<select value={set.fsival} onChange={this.setFSI.bind(this)} data-row={i}>{chooseSets}</select>}
          </TableRowColumn>
          <TableRowColumn>{(set.amrapmsg=='n'?'':set.amrapmsg=='r'?'Increase Reps':'Increase Weight')}</TableRowColumn>
          
          <TableRowColumn style={{backgroundColor:lightBlueA100}}><input value={set.w1} data-field ="w1" hidden={1<=set.sets?false:true} data-row={i} onChange={ this.setInputWeight.bind(this)} type="text" size="2"/></TableRowColumn>
          <TableRowColumn style={{backgroundColor:lightBlueA100}}><input value={set.r1} data-field ="r1" hidden={1<=set.sets?false:true} data-row={i} onChange={ this.setInputRep.bind(this)} type="text" size="2"/></TableRowColumn>
          <TableRowColumn style={{backgroundColor:lightBlueA200}}><input value={set.w2} data-field ="w2" hidden={2<=set.sets?false:true} data-row={i} onChange={ this.setInputWeight.bind(this)} type="text" size="2"/></TableRowColumn>
          <TableRowColumn style={{backgroundColor:lightBlueA200}}><input value={set.r2} data-field ="r2" hidden={2<=set.sets?false:true} data-row={i} onChange={ this.setInputRep.bind(this)} type="text" size="2"/></TableRowColumn>
          <TableRowColumn style={{backgroundColor:lightBlueA100}}><input value={set.w3} data-field ="w3" hidden={3<=set.sets?false:true} data-row={i} onChange={ this.setInputWeight.bind(this)} type="text" size="2"/></TableRowColumn>
          <TableRowColumn style={{backgroundColor:lightBlueA100}}><input value={set.r3} data-field ="r3" hidden={3<=set.sets?false:true} data-row={i} onChange={ this.setInputRep.bind(this)} type="text" size="2"/></TableRowColumn>
          <TableRowColumn style={{backgroundColor:lightBlueA200}}><input value={set.w4} data-field ="w4" hidden={4<=set.sets?false:true} data-row={i} onChange={ this.setInputWeight.bind(this)} type="text" size="2"/></TableRowColumn>
          <TableRowColumn style={{backgroundColor:lightBlueA200}}><input value={set.r4} data-field ="r4" hidden={4<=set.sets?false:true} data-row={i} onChange={ this.setInputRep.bind(this)} type="text" size="2"/></TableRowColumn>
          <TableRowColumn style={{backgroundColor:lightBlueA100}}><input value={set.w5} data-field ="w5" hidden={5<=set.sets?false:true} data-row={i} onChange={ this.setInputWeight.bind(this)} type="text" size="2"/></TableRowColumn>
          <TableRowColumn style={{backgroundColor:lightBlueA100}}><input value={set.r5} data-field ="r5" hidden={5<=set.sets?false:true} data-row={i} onChange={ this.setInputRep.bind(this)} type="text" size="2"/></TableRowColumn>
          <TableRowColumn style={{backgroundColor:lightBlueA200}}><input value={set.w6} data-field ="w6" hidden={6<=set.sets?false:true} data-row={i} onChange={ this.setInputWeight.bind(this)} type="text" size="2"/></TableRowColumn>
          <TableRowColumn style={{backgroundColor:lightBlueA200}}><input value={set.r6} data-field ="r6" hidden={6<=set.sets?false:true} data-row={i} onChange={ this.setInputRep.bind(this)} type="text" size="2"/></TableRowColumn>
          <TableRowColumn colSpan="3" style={{backgroundColor:lightBlueA100}}><input value={set.note} onChange={ this.setInputNote.bind(this)} data-row={i}/></TableRowColumn>
        </TableRow>    
    )


    const setsdays2 = setsweeks[0].days[0]

    let mappedCards=[]

    for(let d=0; d<setsweeks[0].days.length; d++) {
      mappedCards[d] = setsweeks[0].days[d].sets.map(
        (card,i) =>
            <div style={{marginLeft:10}, {marginTop:20}}>
                <p>{ (card.order.length>0?"["+card.order+"]":"") +" "+this.findExercise(card.exercise).toUpperCase() +" SETS:"+card.sets+"  -  REPS:"+card.reps+"  - WEIGHT:"+card.weight}</p>
                <table>
                <tr>
                  <td></td>
                  <td><span style={colStyle}><pre>Set 1 </pre></span></td>
                  <td><span style={colStyle}><pre>Set 2 </pre></span></td>
                  <td><span style={colStyle}><pre>Set 3 </pre></span></td>
                  <td><span style={colStyle}><pre>Set 4 </pre></span></td>
                  <td><span style={colStyle}><pre>Set 5 </pre></span></td>
                  <td><span style={colStyle}><pre>Set 6 </pre></span></td>
                  <td><span style={colStyle}><pre>Notes               </pre></span></td>
                  <td colspan="3"><span style={colStyle}><pre>{this.fsiText(card.fsidrop, card.fsival)}</pre></span></td>
                  
                </tr>
                <tr>
                  <td style={{fontSize:14}}>Weight</td>
                  <td><TextField id='1' style={{width:40}} /></td>
                  <td><TextField id='2' style={{width:40}} /></td>
                  <td><TextField id='3' style={{width:40}} /></td>
                  <td><TextField id='4' style={{width:40}} /></td>
                  <td><TextField id='5' style={{width:40}} /></td>
                  <td><TextField id='6' style={{width:40}} /></td>
                  <td></td>
                  <td></td>     
                </tr>
                <tr>
                  <td style={{fontSize:14}}>Rep</td>
                  <td><TextField id='11' style={{width:40}} /></td>
                  <td><TextField id='12' style={{width:40}} /></td>
                  <td><TextField id='13' style={{width:40}} /></td>
                  <td><TextField id='14' style={{width:40}} /></td>
                  <td><TextField id='15' style={{width:40}} /></td>
                  <td><TextField id='16' style={{width:40}} /></td>
                  <td></td>
                  <td></td>         
                </tr>
              </table>
           </div>       
        )  
    }
    
// FIX WEEK , DAY number when printing 
// FIX WEEK , DAY number when printing
// FIX WEEK , DAY number when printing
    let printCards = []
    let hrule = (
      <hr className="style1"/>
    )

    let pageBreak = (
      <div className="page-break"></div>
    )  
    

    for(let dd=0;dd<setsweeks[0].days.length;dd++) {
      let dayCard = (
        <div style={{marginLeft:10}}>
          {hrule}
          <p>{this.state.studentName}</p>
          <p>{"Program: "+this.state.program.name+", Week 1, Day "+(dd+1)}</p>
          {hrule}
        </div>        
      )
      printCards.push(dayCard)
      printCards.push(mappedCards[dd])
      if((dd+1)%4!=0 && (dd!=setsweeks[0].days.length-1)) {
        //console.log("PAGE JUMP")
        printCards.push(pageBreak)
      }
    }
    
    let mappedStudents =  this.state.students.map(
      student => 
      <option value={student.id} key={student.id}>
        {student.name} 
      </option>
    ) 

 //  console.log("this.state.program.weeks[this.state.selWeek].days[this.state.currentDay].difficulty")
//   console.log(this.state.program.weeks[this.state.selWeek].days[this.state.currentDay].difficulty)

    
    return (
    <div>
    <div className="notprint">
      <Toolbar style={toolbarStyles}>
        <IconButton  onTouchTap={this.handleToggle}>
          <Menu color={blue50}/>
        </IconButton>

        <Drawer
          docked={false}
          open={this.state.menuopen}
          onRequestChange={(open) => this.setState({menuopen})}
        >
              
          <MenuItem containerElement={<Link to="/layout" />} leftIcon={<ContentPaste />} onTouchTap={this.handleClose}>Program Layout Maker</MenuItem>
          <MenuItem containerElement={<Link to="/training" />} leftIcon={<FitnessCenter />} onTouchTap={this.handleClose}>Training Sheet Outcome</MenuItem>
          <MenuItem containerElement={<Link to="/admin" />} leftIcon={<AccountCircle />} onTouchTap={this.handleClose}>Users</MenuItem>
          <MenuItem containerElement={<Link to="/" />} leftIcon={<Home />} onTouchTap={this.handleClose}>Home Page</MenuItem>
          <MenuItem leftIcon={<Settings />} onTouchTap={this.handleClose}>Admin Tools</MenuItem>
        </Drawer>

          <ToolbarGroup firstChild={true} style={{color:blue50}}>
            <ToolbarTitle text="Training Sheet Outcome" style={menuTitleStyles} />
          </ToolbarGroup>
         
          <ToolbarGroup>
            <ToolbarSeparator color={blue50}/>
              <Chip>
                <Avatar src="images/avatar64m.png" />
                   Nigel Morgan 
              </Chip>
                <MenuItem style={menuStyles}
                containerElement={<Link to="/homepage" />}
                leftIcon={<SettingsPower color={blue50}/>}
              />
            </ToolbarGroup>
          </Toolbar>

      </div>
      
        
      <Grid fluid={true}>
        <Row className="notprint">
              <Col xs={12} md={12} lg={12}>
                    <span>
                      Student
                      <select value={this.state.selectedStudent} onChange={this.setStudent.bind(this)}>
                        {mappedStudents}  
                      </select>                          
                    </span>
              </Col>
        </Row>
        
        <Row className="notprint">
              <Col xs={12} md={12} lg={12}>
                <Card style={{marginBottom:20, marginRight:10}}>
                  <CardHeader 
                    title={this.state.studentName}
                    subtitle={"Program: "+this.state.program.name+", Week "+(parseInt(this.state.selWeek)+1)+", Day "+(parseInt(this.state.currentDay)+1)}>
                  </CardHeader>
                </Card>
              </Col>
        </Row>


        <Row className="notshow showprint">
      
          {printCards}
        
        </Row>
        <Row className="show-grid">
            <Col xs={12} md={12} lg={12}>
              <div className="notprint">
                <Table selectable={false} fixedHeader={false} style={{tableLayout: 'auto'}} bodyStyle={{overflow:'visible'}}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                          <TableHeaderColumn >ORDER</TableHeaderColumn>
                          <TableHeaderColumn style={ colWidth }>EXERCISE</TableHeaderColumn>
                          <TableHeaderColumn >SETS</TableHeaderColumn>
                          <TableHeaderColumn >REPS</TableHeaderColumn>
                          <TableHeaderColumn >WEIGHT</TableHeaderColumn>
                          <TableHeaderColumn >Final Set Intensity</TableHeaderColumn>
                          <TableHeaderColumn >AMRAP</TableHeaderColumn>
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
                          <TableHeaderColumn colSpan="3">NOTE</TableHeaderColumn>
                        </TableRow>
                      </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                      {sets}
                    </TableBody>  
                  </Table>
              </div>
          </Col>
        </Row>

        <Row className="show-grid">
          <Col xs={12} md={12} lg={12}>
          <Paper style={{marginTop:10}}>
            <div className="notprint">
              Rate difficulty 
              <RadioButtonGroup onChange={this.buttonSelected.bind(this)} valueSelected={this.state.program.weeks[this.state.selWeek].days[this.state.currentDay].difficulty} name="ratesession">
                <RadioButton
                  value="Too Hard"
                  checkedIcon={<FitnessCenter />}
                  label="Too Hard (Couldn't complete everything)"
                  style={styles.radioButton}
                />
                <RadioButton
                  value="Maximum"
                  checkedIcon={<FitnessCenter />}
                  label="Maximum (Pushed me to my maximum)"
                  style={styles.radioButton}
                />
                <RadioButton
                  value="Hard"
                  label="Hard (Pushed me hard but had a little bit more in me)"
                  checkedIcon={<FitnessCenter />}
                  style={styles.radioButton}
                />
                <RadioButton
                  value="Easy"
                  label="Easy (Wasn't very hard)"
                  checkedIcon={<FitnessCenter />}
                  style={styles.radioButton}
                />
                <RadioButton
                  value="Too Easy"
                  label="Too Easy (Felt like a deload)"
                  checkedIcon={<FitnessCenter />}
                  style={styles.radioButton}
                />
              </RadioButtonGroup>
            </div>
          </Paper>
          </Col>    
        </Row>

        <Row className="show-grid">
            <Col xs={12} md={12} lg={12}>
              <Divider/>
              <FlatButton onClick={this.saveProgram.bind(this)} disabled={!this.state.saveProgram} style={{marginTop: 10, marginRight:10, backgroundColor:'#C5E1A5'} }  ref="saveProgram"  label="SAVE"  labelPosition="before"  icon={<Save />}/>
              <FlatButton onClick={this.workoutComplete.bind(this)} disabled={this.state.program.weeks[this.state.selWeek].days[this.state.currentDay].workoutComplete} style={{marginTop: 10, marginRight:10, backgroundColor:'#C5E1A5'} }  ref="workoutComplete"  label="WORKOUT COMPLETE" primary={false} labelPosition="before" icon={<DoneAll />}/>
              <FlatButton onClick={this.printProgram.bind(this)} style={{marginTop: 10, backgroundColor:'#BBDEFB'}}  ref="printProgram"  disabled={false} label="PRINT PROGRAM"  labelPosition="before" icon={<Print />}/>
            </Col>
        </Row>
      </Grid>    
    </div>
    );
  }
}

export default TrainingPage;

//<Table selectable={false} fixedHeader={false} style={{tableLayout: 'auto'}} bodyStyle={{overflow:'visible'}}>
/*
let tablesets = setsdays.sets.map(
      (set,i) =>

        <TableRow>
          <TableRowColumn>{this.findGroup(set.group)}</TableRowColumn>
          <TableRowColumn>{this.findExercise(set.exercise)}</TableRowColumn>
          <TableRowColumn>{set.sets}</TableRowColumn>
          <TableRowColumn>{set.reps}</TableRowColumn>
          <TableRowColumn>{set.weight}</TableRowColumn>
          <TableRowColumn style={{backgroundColor:lightBlueA100}}><input value={set.w1} data-field ="w1" hidden={1<=set.sets?false:true} data-row={i} onChange={ this.setInputWeight.bind(this)} type="text" size="2"/></TableRowColumn>
          <TableRowColumn style={{backgroundColor:lightBlueA100}}><input value={set.r1} data-field ="r1" hidden={1<=set.sets?false:true} data-row={i} onChange={ this.setInputRep.bind(this)} type="text" size="2"/></TableRowColumn>
          <TableRowColumn style={{backgroundColor:lightBlueA200}}><input value={set.w2} data-field ="w2" hidden={2<=set.sets?false:true} data-row={i} onChange={ this.setInputWeight.bind(this)} type="text" size="2"/></TableRowColumn>
          <TableRowColumn style={{backgroundColor:lightBlueA200}}><input value={set.r2} data-field ="r2" hidden={2<=set.sets?false:true} data-row={i} onChange={ this.setInputRep.bind(this)} type="text" size="2"/></TableRowColumn>
          <TableRowColumn style={{backgroundColor:lightBlueA100}}><input value={set.w3} data-field ="w3" hidden={3<=set.sets?false:true} data-row={i} onChange={ this.setInputWeight.bind(this)} type="text" size="2"/></TableRowColumn>
          <TableRowColumn style={{backgroundColor:lightBlueA100}}><input value={set.r3} data-field ="r3" hidden={3<=set.sets?false:true} data-row={i} onChange={ this.setInputRep.bind(this)} type="text" size="2"/></TableRowColumn>
          <TableRowColumn style={{backgroundColor:lightBlueA200}}><input value={set.w4} data-field ="w4" hidden={4<=set.sets?false:true} data-row={i} onChange={ this.setInputWeight.bind(this)} type="text" size="2"/></TableRowColumn>
          <TableRowColumn style={{backgroundColor:lightBlueA200}}><input value={set.r4} data-field ="r4" hidden={4<=set.sets?false:true} data-row={i} onChange={ this.setInputRep.bind(this)} type="text" size="2"/></TableRowColumn>
          <TableRowColumn style={{backgroundColor:lightBlueA100}}><input value={set.w5} data-field ="w5" hidden={5<=set.sets?false:true} data-row={i} onChange={ this.setInputWeight.bind(this)} type="text" size="2"/></TableRowColumn>
          <TableRowColumn style={{backgroundColor:lightBlueA100}}><input value={set.r5} data-field ="r5" hidden={5<=set.sets?false:true} data-row={i} onChange={ this.setInputRep.bind(this)} type="text" size="2"/></TableRowColumn>
          <TableRowColumn style={{backgroundColor:lightBlueA200}}><input value={set.w6} data-field ="w6" hidden={6<=set.sets?false:true} data-row={i} onChange={ this.setInputWeight.bind(this)} type="text" size="2"/></TableRowColumn>
          <TableRowColumn style={{backgroundColor:lightBlueA200}}><input value={set.r6} data-field ="r6" hidden={6<=set.sets?false:true} data-row={i} onChange={ this.setInputRep.bind(this)} type="text" size="2"/></TableRowColumn>
          <TableRowColumn style={{backgroundColor:lightBlueA100}}><input value={set.w7} data-field ="w7" hidden={7<=set.sets?false:true} data-row={i} onChange={ this.setInputWeight.bind(this)} type="text" size="2"/></TableRowColumn>
          <TableRowColumn style={{backgroundColor:lightBlueA100}}><input value={set.r7} data-field ="r7" hidden={7<=set.sets?false:true} data-row={i} onChange={ this.setInputRep.bind(this)} type="text" size="2"/></TableRowColumn>
          <TableRowColumn style={{backgroundColor:lightBlueA200}}><input value={set.w8} data-field ="w8" hidden={8<=set.sets?false:true} data-row={i} onChange={ this.setInputWeight.bind(this)} type="text" size="2"/></TableRowColumn>
          <TableRowColumn style={{backgroundColor:lightBlueA200}}><input value={set.r8} data-field ="r8" hidden={8<=set.sets?false:true} data-row={i} onChange={ this.setInputRep.bind(this)} type="text" size="2"/></TableRowColumn>
          <TableRowColumn style={{backgroundColor:lightBlueA100}}><input value={set.w9} data-field ="w9" hidden={9<=set.sets?false:true} data-row={i} onChange={ this.setInputWeight.bind(this)} type="text" size="2"/></TableRowColumn>
          <TableRowColumn style={{backgroundColor:lightBlueA100}}><input value={set.r9} data-field ="r9" hidden={9<=set.sets?false:true} data-row={i} onChange={ this.setInputRep.bind(this)} type="text" size="2"/></TableRowColumn>
          <TableRowColumn style={{backgroundColor:lightBlueA200}}><input value={set.w10} data-field ="w10" hidden={10<=set.sets?false:true} data-row={i} onChange={ this.setInputWeight.bind(this)} type="text" size="2"/></TableRowColumn>
          <TableRowColumn style={{backgroundColor:lightBlueA200}}><input value={set.r10} data-field ="r10" hidden={10<=set.sets?false:true} data-row={i} onChange={ this.setInputRep.bind(this)} type="text" size="2"/></TableRowColumn>
        </TableRow>    
    )
*/
    
    //console.log(mappedSets)