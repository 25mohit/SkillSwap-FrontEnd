import './App.css';
import './Style.css';
import './Responsive.css';
import { BrowserRouter } from 'react-router-dom'
import RoutesContainer from './Utils/RoutesContainer';
import Notification from './Utils/Component/Notification/Notification';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <RoutesContainer />
      </BrowserRouter>
      <Notification />
    </div>
  );
}

export default App;
