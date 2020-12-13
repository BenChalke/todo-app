import React from 'react';
import '../../styles/list/edit-list-item.css';

export default class EditListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listItem: []
    };
    
    this.clickOutsideEvent = this.clickOutsideEvent.bind(this);
    this.onPriorityChange = this.onPriorityChange.bind(this);
  }
  comp
  componentDidMount() {
    this.getCurrentItem();
    window.addEventListener('mouseup', this.clickOutsideEvent);
  }
  clickOutsideEvent(e) {
    var box = document.querySelector('.edit-list-item');
    if (e.target !== box && e.target.parentNode !== box && e.target.parentNode.parentNode !== box && e.target.parentNode.parentNode.parentNode !== box){
      this.props.closeEditItem();
      window.removeEventListener('mouseup', this.clickOutsideEvent);
    }
  }
  getCurrentItem() {
    const item = this.props.listItems.filter(item => item.id === this.props.editId);

    this.setState(() => ({ listItem: item }));
  }
  onPriorityChange(e) {

    const item = this.state.listItem;

    item[0].priority = e.target.value;

    this.setState(() => ({ listItem: item }));
  }
  render() {
    return (
      <div className="edit-list-item-mask">
        <div className="edit-list-item">
          <button type="button" onClick={this.props.closeEditItem} className="list-close-edit-item-button">X</button>
          <h2>Edit Task</h2>
          <form className="list-edit-item" onSubmit={this.props.handleEditItem}>
            <div className="list-edit-item-name-div">
              <label>Task Description</label>
              <textarea className="list-edit-item-name" type="text" name="item" defaultValue={this.state.listItem.length > 0 ? this.state.listItem[0].item : ''} />
            </div>
            <div className="list-edit-item-priority-div">
              <label>Priority</label>
              <select 
                className="list-edit-item-priority" 
                value={this.state.listItem.length > 0 ? this.state.listItem[0].priority : ''}
                onChange={this.onPriorityChange}
              >
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
              </select>
            </div>
            <div className="list-edit-item-button-div">
            <button
                className="list-item-delete"
                onClick={e => {
                  e.preventDefault();
                  this.props.closeEditItem();
                  this.props.handleDeleteItem(this.props.editId);
                }}
              >
                Delete task
              </button>
              <button 
                type="submit" 
                className="list-update-item-button"
              >Update</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

