import app from './app'
import './style.css'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Hello closure</h1>
  </div>
`

app();
