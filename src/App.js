import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
      super();
      this.state = {
          content: [],
      };
  }

  switchTab(id) {
      chrome.tabs.update(id, {active: true});
  }

  getTabs() {
    chrome.tabs.query({}, function(tabs) {
        console.error(chrome.pageAction);
      let content = []
      for(let i = 0; i<tabs.length; i++) {
          content.push(<div><a onClick={() => this.switchTab(tabs[i].id)}>Hi! - {tabs[i].title}</a></div>);
      }

      this.setState({content: content});
    }.bind(this));

    return this.state.content;
  }

  render() {
    return (
      <div className="App">
        {this.getTabs()}
      </div>
    );
  }
}

export default App;
