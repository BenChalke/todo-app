// Main List Component/Page
import '../../styles/list/list.css';
import React from "react";
import ListItem from "./ListItem";
import EditListItem from "./EditListItem";

export default class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addItemOpen: false,
      editItemOpen: false,
      editId: ''
    };

    this.handleAddItem = this.handleAddItem.bind(this);
    this.openAddItem = this.openAddItem.bind(this);
    this.closeAddItem = this.closeAddItem.bind(this);
    this.openEditItem = this.openEditItem.bind(this);
    this.closeEditItem = this.closeEditItem.bind(this);
    this.sortByAlphabet = this.sortByAlphabet.bind(this);
    this.sortByPriorty = this.sortByPriorty.bind(this);
    this.toggleTaskComplete = this.toggleTaskComplete.bind(this);
  }
  closeAddItem() {
    this.setState(() => ({ addItemOpen: false }));
  }
  openAddItem() {
    this.setState(() => ({ addItemOpen: true }));
  }
  handleAddItem = (e) => {
    e.preventDefault();

    //Close the add item section here
    if(document.querySelector('.list-add-item-name').value) {
      this.setState(() => ({ addItemOpen: false }));
    }

    const item = document.querySelector('.list-add-item-name').value.trim();
    const itemPriority = document.querySelector('.list-add-item-priority').value;
    this.props.handleAddItem(item, itemPriority);

    // this.setState(() => ({ error }));

    // if (!error) {
    //   document.querySelector('.list-add-item-name').value = "";
    // }
  }
  closeEditItem() {
    this.setState(() => ({ editItemOpen: false }));
  }
  openEditItem(e) {
    window.scrollTo(0, 150);
    if(e.target.tagName !== 'BUTTON' && e.target.tagName !== 'path' && e.target.tagName !== 'svg') {
      const itemId = e.currentTarget.dataset.id;
      this.setState(() => ({ 
        editItemOpen: true,
        editId: itemId
      }));
    }
  }
  handleEditItem = (e) => {
    e.preventDefault();

    //Close the edit item section here
    if(document.querySelector('.list-edit-item-name').value) {
      this.closeEditItem();
    }

    const description = document.querySelector('.list-edit-item-name').value.trim();
    const itemPriority = document.querySelector('.list-edit-item-priority').value;

    this.props.handleEditItem(this.state.editId, description, itemPriority);
  }
  sortByAlphabet() {
    const filteredByAlphabetData = this.props.listItems.sort(
      function(a, b){
        var x = a.item.toLowerCase();
        var y = b.item.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      }
    );

    //Send the completed to the end
    const filteredByCompletedData = filteredByAlphabetData.sort(
      function(a, b){
        var x = a.completed;
        var y = b.completed;
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      }
    );

    this.props.updateListItems(filteredByCompletedData);
  }
  sortByPriorty() {
    var filteredByPriorityData = this.props.listItems.sort(function( a, b ) {
      return parseFloat(b.priority) - parseFloat(a.priority);
    });

    //Send the completed to the end
    const filteredByCompletedData = filteredByPriorityData.sort(
      function(a, b){
        var x = a.completed;
        var y = b.completed;
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      }
    );

    this.props.updateListItems(filteredByCompletedData);
  }
  toggleTaskComplete(e) {
    console.log('toggled');

    let itemId;

    if (e.target.tagName === 'path') {
      itemId = e.target.parentNode.parentNode.dataset.id;
    }

    if (e.target.tagName === 'svg') {
      itemId = e.target.parentNode.dataset.id;
    }

    console.log('i', itemId);

    this.props.toggleTaskComplete(itemId);

    // Toggle the classes
    if(document.querySelector(`.list-item[data-id="${itemId}"] .list-item-complete-btn`).classList.contains('uncomplete')){
      document.querySelector(`.list-item[data-id="${itemId}"] .list-item-complete-btn`).classList.remove("uncomplete");
      document.querySelector(`.list-item[data-id="${itemId}"]`).classList.remove("uncomplete");
      document.querySelector(`.list-item[data-id="${itemId}"] .list-item-complete-btn`).classList.add("complete");
      document.querySelector(`.list-item[data-id="${itemId}"]`).classList.add("complete");
    } else if(document.querySelector(`.list-item[data-id="${itemId}"] .list-item-complete-btn`).classList.contains('complete')){
      document.querySelector(`.list-item[data-id="${itemId}"] .list-item-complete-btn`).classList.remove("complete");
      document.querySelector(`.list-item[data-id="${itemId}"]`).classList.remove("complete");
      document.querySelector(`.list-item[data-id="${itemId}"] .list-item-complete-btn`).classList.add("uncomplete");
      document.querySelector(`.list-item[data-id="${itemId}"]`).classList.add("uncomplete");
    }
  }
  render() {
    return (
      <div className="list">
        <div className="list-container">
          <div className="list-content">
            <div className="list-content-header">
              <h2>Your List</h2>
              <div className="list-content-sort">
                <p>Sort By:</p>
                <button type="button" onClick={this.sortByAlphabet}>A-Z</button>
                <button type="button" onClick={this.sortByPriorty}>Priority</button>
              </div>
              <div className="list-content-total">
                <p>Total Tasks: {this.props.listItems.length}</p>
                <p>Completed: {this.props.completedTasks.length}</p>
              </div>
            </div>
            <div className="list-content-items">
              {this.props.listItems && this.props.listItems.length === 0 && (
                <p className="list-empty-message">Please add an item to get started!</p>
              )}
              {this.props.listItems.length > 0 && this.props.listItems.map((item, index) => (
                <ListItem
                  key={item.id}
                  id={item.id}
                  itemText={item.item}
                  priority={item.priority}
                  count={index + 1}
                  openEditItem={this.openEditItem}
                  closeEditItem={this.closeEditItem}
                  toggleTaskComplete={this.toggleTaskComplete}
                  completed={item.completed}
                />
              ))}
              {!this.state.addItemOpen && 
                <div className="list-add-new-item" onClick={this.openAddItem}>
                  <p>+ Add a new task</p>
                </div>
              }
              {this.state.addItemOpen && 
                <form className="list-add-item" onSubmit={this.handleAddItem}>
                  <div className="list-add-item-name-div">
                    <label>Task Description</label>
                    <textarea className="list-add-item-name" name="item" />
                  </div>
                  <div className="list-add-item-priority-div">
                    <label>Priority</label>
                    <select className="list-add-item-priority">
                      <option value="1">Low</option>
                      <option value="2">Medium</option>
                      <option value="3">High</option>
                    </select>
                  </div>
                  <div className="list-add-item-button-div">
                    <button type="submit" className="list-add-item-button">Add</button>
                    <button type="button" onClick={this.closeAddItem} className="list-add-item-button">Cancel</button>
                  </div>
                </form>
              }
            </div>
          </div>
        </div>
        { this.state.editItemOpen &&
          <EditListItem 
            editItemOpen={this.state.editItemOpen}
            closeEditItem={this.closeEditItem}
            handleDeleteItem={this.props.handleDeleteItem}
            editId={this.state.editId}
            listItems={this.props.listItems}
            handleEditItem={this.handleEditItem}
          />
        }
      </div>
    );
  }
}

