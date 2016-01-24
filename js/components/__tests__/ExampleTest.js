jest.dontMock('../Example')
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

const Example = require('../Example')

describe('Example', () => {
  it('rendering', () => {
    var example = TestUtils.renderIntoDocument(
        <Example title="hello"/>
    )
    var exampleNode = ReactDOM.findDOMNode(example)
    expect(exampleNode).toBeOK()
    TestUtils.Simulate.click(
      TestUtils.findRenderedDOMComponentWithTag(exampleNode, 'button')
    )
  })
})
