import './App.css';
import AutoComplete from './components/autoComplete';

function App() {

  const staticData = [
    "apple",
    "banana",
    "orange",
    "mellon",
    "guava",
    "pears",
    "berry"
  ]

  const url="https://dummyjson.com/recipes/search?q=";
  
  const fetchSuggestions = async (query) => {
    const response = await fetch(`${url}${query}`);
    if(!response.ok) {
      throw new Error("Network call is not ok")
    }
    const result = await response.json();
    return result.recipes;
  }

  return (
    <div>Welcome to Auto Complete component

      <AutoComplete 
        placeholder={"Enter Recipes"}
        // staticData={staticData}
        fetchSuggestions={fetchSuggestions}
        dataKey={"name"}
        customLoader={<>Loading Recipes.. </>}
        onSelect={(res) => {console.log(res)}}
        
        onChange={(input) => {}}
        onBlur={(e) => {}}
        onFocus={(e) => {}}
        customStyles={{}}

      />

    </div>

  )
}

export default App
