import { AppProvider } from "@context";
import Searcher from "@components/Searcher";
import ShoppingList from "@components/ShoppingList";

const App = () => (
  <AppProvider>
    <Searcher />
    <ShoppingList />
  </AppProvider>
);

export default App;
