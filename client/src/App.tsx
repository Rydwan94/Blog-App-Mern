import { BrowserRouter } from "react-router-dom";
import Pages from "./Layouts/Pages";
import Header from "./components/Header";
import FooterComponent from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Header />
      <main className="min-h-screen">
        <Pages />
      </main>
      <FooterComponent/>
    </BrowserRouter>
  );
}

export default App;
