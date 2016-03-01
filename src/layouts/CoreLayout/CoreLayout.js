import React, { PropTypes } from 'react'
import HeaderBar from '../../components/HeaderBar'
import FooterBar from '../../components/FooterBar'
import '../../styles/core.scss'

// Note: Stateless/function components *will not* hot reload!
// react-transform *only* works on component classes.
//
// Since layouts rarely change, they are a good place to
// leverage React's new Stateless Functions:
// https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
//
// CoreLayout is a pure function of its props, so we can
// define it with a plain javascript function...
function CoreLayout ({ children }) {
  return (
    <div className='page-container'>
      <HeaderBar/>
      <div className='view-container'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 col-md-offset-2'>
              {children}
            </div>
          </div>
        </div>
      </div>
      <FooterBar/>
    </div>
  )
}

CoreLayout.propTypes = {
  children: PropTypes.element
}

export default CoreLayout
