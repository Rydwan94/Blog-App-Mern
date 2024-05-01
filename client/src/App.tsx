import { BrowserRouter } from "react-router-dom";
import Pages from "./Layouts/Pages";
import Header from "./components/Header";
import FooterComponent from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="min-h-screen">
        <Pages />
      </main>
      <FooterComponent/>
    </BrowserRouter>
  );
}

export default App;
