import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Icon, CardActions, Button, IconButton, CardMenu, Card, CardTitle, CardText } from 'react-mdl';
import { Grid, Row, Col } from 'react-bootstrap';

class TabLink extends Component {
  switchTab(id) {
    chrome.tabs.update(id, {active: true});
  }

  closeTab(id) {
    chrome.tabs.remove(id, () => {this.props.gathertabs()})
  }

  render() {
    return (
      <Col md={3} style={{padding: '10px'}}>
        <Card shadow={2} style={{width: '275px', height: '200px', margin: 'auto'}}>
          <CardTitle expand style={{background: 'url(' +this.props.tab.favIconUrl+ ') bottom right no-repeat #46B6AC', height: '176px', color: '#fff'}}>{this.props.tab.title}</CardTitle>
          <CardActions border>
            <Button onClick={() => this.switchTab(this.props.tab.id)}><Icon name="open_in_browser" />Goto</Button>
            <Button onClick={() => this.closeTab(this.props.tab.id)}><Icon name="close" />Close</Button>
          </CardActions>
        </Card>
      </Col>
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

  chunks(arr, size) {
    if (!Array.isArray(arr)) {
      throw new TypeError('Input should be Array');
    }

    if (typeof size !== 'number') {
      throw new TypeError('Size should be a Number');
    }

    var result = [];
    for (var i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, size + i));
    }

    return result;
  };

  gatherTabs() {
    let content = [];
    chrome.tabs.query({}, (tabs) => {
      for(let i = 0; i<tabs.length; i++) {
        content.push(<TabLink gathertabs={this.gatherTabs.bind(this)} tab={tabs[i]} number={i+1} />);
      }
      this.setState({content: content});
    });
  }

  componentDidMount() {
    this.gatherTabs();

    chrome.tabs.onCreated.addListener( (tab) => {
      this.gatherTabs();
    });

    chrome.tabs.onRemoved.addListener( (tab, info) => {
      this.gatherTabs();
    });

    chrome.tabs.onUpdated.addListener( (tabId, info, tab) => {
      this.gatherTabs();
    });
  }

  getTabs() {
    const rows = this.chunks(this.state.content, 4);
    var layout =
      rows.map((row) => (
        (
          <Row>
            {
              row.map((col) => (
                (
                  col
                )
              ))
            }
          </Row>
        )
      ));

    return layout;
  }

  render() {
    return (
      <Grid>
        {this.getTabs()}
      </Grid>
    );
  }
}

export default App;
