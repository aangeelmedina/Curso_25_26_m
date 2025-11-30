import createApp from './App';
import './style.css'
document.addEventListener("DOMContentLoaded",() =>{
  const appContainer = document.getElementById("app");
  const app = createApp()
  appContainer.appendChild(app)
  console.log('✅ Aplicacion iniciada correctamente ...')
})