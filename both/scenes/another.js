import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Another extends Component {
  constructor() {
    super();
  }

  render() {
    return <div>
    Title Go to: <Link to="/">Home</Link>
    </div>
  }
}
