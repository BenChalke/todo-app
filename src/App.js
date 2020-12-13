import React from 'react';
import './styles/app.css';
import Header from './components/Header';
import Footer from './components/Footer';
import List from './components/List/List';
import uuid from 'react-uuid';

export default class App extends React.Component {
  state = {
    listItems: [],
    completedTasks: []
  }
  handleAddItem = (item, priority) => {
    if (!item) {
      return "Enter a valid value to add item.";
    } 

    const itemObject = {
      id: uuid(),
      item,
      priority,
      completed: false
    };

    if(this.state.listItems.length > 0) {
      this.setState(prevState => ({ listItems: prevState.listItems.concat(itemObject) }));

      setInterval(() => {
        //Send the completed to the end
        const filteredByCompletedData = this.state.listItems.sort(
          function(a, b){
            var x = a.completed;
            var y = b.completed;
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
          }
        );

        this.setState(() => ({ listItems: filteredByCompletedData }));
      }, 100)

    } else {
      this.setState(() => ({ listItems: [itemObject] }));
    }
  }
  handleEditItem = (id, description, priority) => {

    const list = this.state.listItems;

    list.forEach((item) => {
      if (item.id === id) {
         item.item = description;
         item.priority = priority;
         return;
      }
    });
    
    this.setState(() => ({ listItems: list }));

  }
  handleDeleteItem = (itemToRemove) => {
    this.setState(prevState => ({
      listItems: prevState.listItems.filter(item => {
        return itemToRemove !== item.id;
      })
    }));

    // Need set interval so that the state can update before we use it
    setInterval(() => {
      this.setCompletedTasks(this.state.listItems);
    }, 100);
  }
  componentDidMount() {
    const json = localStorage.getItem("items");
    const items = JSON.parse(json);

    if (items) {
      this.setState(() => ({ listItems: items }));

      this.setCompletedTasks(items);
    }
  }
  componentDidUpdate() {
    const json = JSON.stringify(this.state.listItems);
    localStorage.setItem("items", json);
  }
  updateListItems = (newList) => {
    this.setState(() => ({ listItems: newList }));
  }
  setCompletedTasks = (list) => {

    const filteredList = list.filter((item) => {
      return item.completed === true;
    });

    this.setState(() => ({ completedTasks: filteredList }));

  }
  toggleTaskComplete = (id) => {

    const list = this.state.listItems;

    list.forEach((item) => {
      if (item.id === id) {
         item.completed = !item.completed;
         return;
      }
    });

    //Send the completed to the end
    const filteredByCompletedData = list.sort(
      function(a, b){
        var x = a.completed;
        var y = b.completed;
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      }
    );
    
    this.setState(() => ({ listItems: filteredByCompletedData }));
    this.setCompletedTasks(filteredByCompletedData);

  }
  render() {
    return (
      <div className="app">
        <Header />
        <List 
          listItems={this.state.listItems} 
          completedTasks={this.state.completedTasks} 
          handleAddItem={this.handleAddItem} 
          handleEditItem={this.handleEditItem} 
          handleDeleteItem={this.handleDeleteItem} 
          updateListItems={this.updateListItems}
          toggleTaskComplete={this.toggleTaskComplete}
        />
        <Footer />
      </div>
    );
  }
}