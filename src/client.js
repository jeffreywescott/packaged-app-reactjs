import React, { Component } from 'react'
import { render as reactRender } from 'react-dom'
import { renderToString as reactRenderToString } from 'react-dom/server'

import styles from './main.scss'

export class HelloWorld extends Component {
  render() {
    return (
      <h1 className={styles.hello}>Hello, world!</h1>
    )
  }
}

export function render(elementId = 'root') {
  if (typeof document === 'undefined') {
    return reactRenderToString(<HelloWorld />)
  } else {
    reactRender(<HelloWorld />, document.getElementById(elementId))
  }
}
