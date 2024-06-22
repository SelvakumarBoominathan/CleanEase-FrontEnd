import "./App.css";
import Header from "./_components/_Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Searchfield from "./_components/_Header/_Searchfield/Searchfield";

function App() {
  return (
    <>
      <div>
        <Header />
        <Searchfield />
      </div>
    </>
  );
}

export default App;
