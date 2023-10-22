import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './components/store/store.js'
import { BrowserRouter } from 'react-router-dom'
import {NextUIProvider} from '@nextui-org/react'
import { Toaster } from 'react-hot-toast';
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <NextUIProvider>
    <BrowserRouter>
    <App />
    <Toaster />
    </BrowserRouter>
    </NextUIProvider>
  </Provider>
 
)
