jest.dontMock('../Example')
import React from 'react'
import ReactDOM from 'react-dom'
import {renderIntoDocument, Simulate} from 'react-addons-test-utils'

const Example = require('../Example')

describe('Example', () => {
  it('rendering', () => {
    var example = renderIntoDocument(
        <Example title="hello"/>
    )
    var exampleNode = ReactDOM.findDOMNode(example)
    var button = exampleNode.getElementsByTagName('button')[0]
    expect(exampleNode).not.toBeNull()
    Simulate.click(button)
  })
})
