import React, { createContext } from 'react'

// Global state management
const MyGlobalStateContext = createContext({ show: false, setShow: () => {} })
export { MyGlobalStateContext }
