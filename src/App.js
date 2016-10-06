import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class TabLink extends Component {
  switchTab(id) {
      chrome.tabs.update(id, {active: true});
  }

  render() {
      return (
          <div>
            <img width="30" height="30" src={this.props.tab.favIconUrl} />
            <a onClick={() => this.switchTab(this.props.tab.id)}>{this.props.tab.title}</a>
            </div>
      );
  }
}

class App extends Component {
  constructor() {
      super();
      this.state = {
          content: [],
      };
  }

  getTabs() {
    chrome.tabs.query({}, function(tabs) {
        console.error(chrome.pageAction);
      let content = []
      for(let i = 0; i<tabs.length; i++) {
          content.push(<TabLink tab={tabs[i]} />);
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
