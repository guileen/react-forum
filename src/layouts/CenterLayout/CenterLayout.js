import React, {PropTypes} from 'react'

function CenterLayout ({ children }) {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-8 col-md-offset-2'>
          {children}
        </div>
      </div>
    </div>
  )
}

CenterLayout.propTypes = {
  children: PropTypes.element
}

export default CenterLayout
