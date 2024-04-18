import {BrowserRouter} from 'react-router-dom'
import Pages from './Layouts/Pages';

function App() {
  return (
    <BrowserRouter>
      <main>
        <Pages/>
      </main>
    </BrowserRouter>
  );
}

export default App;
