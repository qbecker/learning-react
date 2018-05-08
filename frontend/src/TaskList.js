import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import Modal from 'react-modal';

import Task from './Task.js'

import './react-bootstrap-table.css'
import './react-bootstrap-table-all.min.css'

Modal.setAppElement('#root');


class TaskList extends Component {
  
  constructor () {
    super();
    this.state = {
      showModal: false,
      row: {}
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
    this.onAfterDeleteRow =  this.onAfterDeleteRow.bind(this);
    
    this.selectRowProp = {
      mode: 'radio',
      //bgColor: 'green', // you should give a bgcolor, otherwise, you can't regonize which row has been selected
      hideSelectColumn: true,  // enable hide selection column.
      clickToSelect: true,  // you should enable clickToSelect, otherwise, you can't select column.
      onSelect:this.handleRowSelect
    };
  }
  handleRowSelect(row, isSelected, e) {
  console.log(isSelected)
  console.log(row)
    this.handleOpenModal(row);
  }
  async onAfterDeleteRow(row){
    console.log(row);
  }
  handleOpenModal (row) {
    
    this.setState({ showModal: true, row });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }
  
  
  render() {
    return (
      <div>
        <BootstrapTable data={this.props.data}options={this.taskTableOptions}selectRow={this.selectRowProp}>
          <TableHeaderColumn isKey dataField='task_title'>
            Task
          </TableHeaderColumn>
          <TableHeaderColumn dataField='task_state'>
            State
          </TableHeaderColumn>
          <TableHeaderColumn dataField='due_date'>
            Due Date
          </TableHeaderColumn>
        </BootstrapTable>
         <div>
        
        <Modal 
           isOpen={this.state.showModal}
           contentLabel="Task Details">
           <Task task={this.state.row} notes={this.state.row.task_notes}/>
          <button onClick={this.handleCloseModal}>Close</button>
        </Modal>
      </div>
      </div>
    );
  }
}
 
export default TaskList;






