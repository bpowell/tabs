import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Icon, CardActions, Button, IconButton, CardMenu, Card, CardTitle, CardText } from 'react-mdl';
import { Grid, Row, Col } from 'react-bootstrap';

class TabLink extends Component {
  switchTab(id) {
    chrome.tabs.update(id, {active: true});
  }

  render() {
    return (
      <Col md={3} style={{padding: '10px'}}>
        <Card shadow={2} style={{width: '275px', height: '200px', margin: 'auto'}}>
          <CardTitle expand style={{background: 'url(' +this.props.tab.favIconUrl+ ') bottom right no-repeat #46B6AC', height: '176px', color: '#fff'}}>{this.props.tab.title}</CardTitle>
          <CardActions border>
            <Button onClick={() => this.switchTab(this.props.tab.id)}><Icon name="open_in_browser" />Goto</Button>
            <Button><Icon name="close" />Close</Button>
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

  getTabs() {
    chrome.tabs.query({}, function(tabs) {
      let content = [];
      for(let i = 0; i<tabs.length; i++) {
        content.push(<TabLink tab={tabs[i]} number={i+1} />);
      }

      this.setState({content: content});
    }.bind(this));


    const rows = this.chunks(this.state.content, 4);
    let q = []
    q = rows.map(function(item, i) {
      return (
        <Row>
          {
            item.map(function(q, j) {
              return (
                q
              )
            })
          }
      </Row>
      )
    })

    return q;
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
