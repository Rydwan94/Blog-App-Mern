import {BrowserRouter} from 'react-router-dom'
import Pages from './Layouts/Pages';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <main>
        <Pages/>
        
      </main>
    </BrowserRouter>
  );
}

export default App;
