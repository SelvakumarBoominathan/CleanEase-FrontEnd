import "./App.css";
import Header from "./_components/_Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Searchfield from "./_components/_Searchfield/Searchfield";
import Body from "./_components/_Body/Body";

function App() {
  return (
    <>
      <div>
        <Header />
        <Searchfield />
        <Body />
      </div>
    </>
  );
}

export default App;
