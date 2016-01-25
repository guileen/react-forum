jest.dontMock('../Example')
import React from 'react'
import ReactDOM from 'react-dom'
import {renderIntoDocument, Simulate, findRenderedDOMComponentWithTag} from 'react-addons-test-utils'

const Example = require('../Example')

describe('Example', () => {
  it('rendering', () => {
    var example = renderIntoDocument(
        <Example title="hello"/>
    )
    var exampleNode = ReactDOM.findDOMNode(example)
    expect(exampleNode).toBeOK()
    Simulate.click(
      findRenderedDOMComponentWithTag(exampleNode, 'button')
    )
  })
})
