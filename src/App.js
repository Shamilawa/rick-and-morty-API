
//context and hooks
import { FocusCardContextProvider } from "./context/FocusCardContext"
import { FavCharsContextProvider } from "./context/FavCharsContext"

// Components and Pages
import CharacterFeed from "./pages/CharacterFeed";

function App() {
  return (
    <FocusCardContextProvider>
      <FavCharsContextProvider>
        <div className="App">
          <CharacterFeed />
        </div>
      </FavCharsContextProvider>
    </FocusCardContextProvider>
  );
}

export default App;
