import React from 'react'

import { createDevTools } from 'redux-devtools'

// Monitors are separate packages, and you can make a custom one
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

const DevTools = createDevTools(
  // Monitors are individually adjustable with props.
  // Consult their repositories to learn about those props.
  // Here, we put LogMonitor inside a DockMonitor.
  <DockMonitor toggleVisibilityKey='ctrl-h' changePositionKey='ctrl-q' >
    <LogMonitor theme='solarized' />
  </DockMonitor>
)

export default DevTools
