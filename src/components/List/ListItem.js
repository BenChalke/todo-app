import React from 'react';
import '../../styles/list/list-item.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faExclamation } from '@fortawesome/free-solid-svg-icons'

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editItemOpen: false
    };
    
    // this.handleAddItem = this.handleAddItem.bind(this);
    // this.openAddItem = this.openAddItem.bind(this);
    // this.closeAddItem = this.closeAddItem.bind(this);
  }
  componentDidMount() {
    
  }
  handlePriority = (priority) => {
    let value;
    if(priority === '1') { 
      value = 'low'; 
      return value;
    }
    if(priority === '2') { 
      value = 'medium'; 
      return value;
    }
    if(priority === '3') { 
      value = 'high'; 
      return value;
    }
  }
  render() {
    return (
      <div className={`list-item ${this.props.completed ? 'complete' : 'uncomplete'} priority-${this.props.priority}`} onClick={this.props.openEditItem} data-id={this.props.id}>
        <FontAwesomeIcon className={`list-item-complete-btn ${this.props.completed ? 'complete' : 'uncomplete'}`} onClick={this.props.toggleTaskComplete} icon={faCheckCircle} />
        <p className="list-item-name">{this.props.itemText}</p>
        <div className="list-item-priority-div">
          <p className="list-item-priority-icon"><FontAwesomeIcon icon={faExclamation} /></p>
          <p className="list-item-priority">{this.handlePriority(this.props.priority)}</p>
        </div>
      </div>
    );
  }
}

