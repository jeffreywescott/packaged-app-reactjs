import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import styles from './main.scss'

export class HelloWorld extends Component {
  render() {
    return (
      <h1 className={styles.hello}>Hello, world!</h1>
    )
  }
}

export default function render() {
  ReactDOM.render(<HelloWorld />, document.getElementById('root'))
}

if (!module.parent) render()
