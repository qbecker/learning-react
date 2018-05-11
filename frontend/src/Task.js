import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {DropdownButton, MenuItem, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'


import Modal from 'react-modal';

import './react-bootstrap-table.css'
import './react-bootstrap-table-all.min.css'

Modal.setAppElement('#root');



class Task extends Component {
  constructor () {
    super();
    this.state = {
      task:{},
      notes:[]
    };

    this.selectRowProp = {
      mode: 'radio',
      onSelect: this.handleRowSelect
    };

    this.noteTableOptions = {
      afterInsertRow: this.handleNoteRowInsert,   // A hook for after insert rows
      mode: 'radio',
      afterDeleteRow: this.onAfterDeleteRow
    };

  }

  taskDropDownChange = async (state) => {
    console.log(state);
    this.props.task.task_state = state;
    try{
      const res = await fetch("https://django-react-work-management-qbecker.c9users.io/taskkeeper/task/" + this.props.task.id + "/",
      {
        method:'PATCH',
        body: JSON.stringify(this.props.task),
        headers:{
          'content-type': 'application/json'
        }
      });
      const tasks = await res.json();
      this.props.task = tasks;
    }catch(e){
      //TODO
      //Add a little saving spinner that warns you if it didn't save
      //Probably just going to need to check the status code that DRF throws back
      console.log(e);
    }
  }

  onAfterDeleteRow = (rowKey) => {
    this.props.task.task_notes.forEach(async function(element) {
      if (rowKey === element.note_text){
        var newNote = {
          id: element.id
        }

        try{
          const res = await fetch("https://django-react-work-management-qbecker.c9users.io/taskkeeper/note/" +element.id + "/",
          {
            method:'DELETE',
            body: JSON.stringify(newNote),
            headers:{
              'content-type': 'application/json'
            }
          });
        }catch(e){
          //TODO
          //Add a little saving spinner that warns you if it didn't save
          //Probably just going to need to check the status code that DRF throws back
        }
      }
    });
  }

  saveTask = async () => {

    try{
      const res = await fetch("https://django-react-work-management-qbecker.c9users.io/taskkeeper/task/" + this.props.task.id + "/",
      {
        method:'PATCH',
        body: JSON.stringify(this.props.task),
        headers:{
          'content-type': 'application/json'
        }
      });
      const tasks = await res.json();
      this.props.task = tasks;
    } catch(e) {
      //TODO
      //Add a little saving spinner that warns you if it didn't save
      //Probably just going to need to check the status code that DRF throws back
    }
  }

  handleDescriptionChange = (e) => {
    var temp = this.props.task;
    temp.task_description = e.target.value;
    this.setState({ task : temp})
  }

  handleNoteRowInsert = async (row) => {
    var newNote = {
      note_text: row.note_text,
      task: this.props.task.id,
    }
    try {
      const res = await fetch("https://django-react-work-management-qbecker.c9users.io/taskkeeper/notelist/", {
        method:'POST',
        body: JSON.stringify(newNote),
        headers:{
          'content-type': 'application/json'
        }
      });

      const tempNote = await res.json();

      this.props.task.task_notes.push(tempNote);
    } catch(e){
      //TODO
      //Add a little saving spinner that warns you if it didn't save
      //Probably just going to need to check the status code that DRF throws back
      console.log(e);
    }

  }


  //What is the diffrence between having this apart of the class vs having it a stand alone function?
  handleRowSelect(row){
    console.log(row);
  }

  render() {
    return (
      <div>
        <h3> {this.props.task.task_title}</h3>
        <DropdownButton
          bsSize="large"
          title={this.props.task.task_state}
          id="dropdown-size-large"
          onSelect={this.taskDropDownChange}
        >
          <MenuItem eventKey="Open">Open</MenuItem>
          <MenuItem eventKey="Closed">Closed</MenuItem>
          <MenuItem eventKey="Assistance">Assistance</MenuItem>
          <MenuItem eventKey="Complete">Complete</MenuItem>
        </DropdownButton>
        <br/>
        <br/>
        <br/>
        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Description</ControlLabel>
          <FormControl
            componentClass="textarea" value={this.props.task.task_description}
            onChange={this.handleDescriptionChange}
          />
        </FormGroup>
        <button onClick={this.saveTask}>
          Save
        </button>
        <br/>
        <br/>
        <BootstrapTable data={this.props.notes}insertRow={true}deleteRow={true}options={this.noteTableOptions}selectRow={this.selectRowProp}>
          <TableHeaderColumn isKey dataField='note_text'>
            Notes
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default Task;
