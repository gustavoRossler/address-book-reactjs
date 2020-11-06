import AddressList from "./components/AddressList/AddressList";
import Navbar from "./components/Navbar/Navbar";
import AddressesContextProvider from "./contexts/AddressesContext";

function App() {
  return (
    <div className="App">
      <AddressesContextProvider>
        <Navbar />
        <AddressList />
      </AddressesContextProvider>
    </div>
  );
}

export default App;
