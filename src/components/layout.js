import React from 'react'
import './variables.css'
import './global.css'
import Seo from './seo'

import Navigation from './ui/Navigation'
import Footer from './ui/Footer'
class Template extends React.Component {
  render() {
    const { children } = this.props

    return (
      <>
        <Seo />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </>
    )
  }
}

export default Template
