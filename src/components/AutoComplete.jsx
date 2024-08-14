import { useCallback, useEffect, useState } from "react";
import "./styles.css";
import SuggestionsList from "./SuggestionsList";
import debounce  from "lodash/debounce";


const AutoComplete = ({
    placeholder="",
    staticData,
    fetchSuggestions,
    customLoader="Loading...",
    dataKey="",
    onSelect=() => {},
    onChange=() => {},
    onBlur=() => {},
    onFocus=() => {},
    customStyles={}
}) => {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    console.log(suggestions)

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        onChange(event.target.value)
    };

    const getSuggestions = async(query) => {
        setError(null);
        setLoading(false);

        try {
            let result;
            if(staticData) {
                result = staticData.filter((item) => {
                   return item.toLowerCase().include(query.toLowerCase())
                });
            } else if (fetchSuggestions) {
                result = await fetchSuggestions(query);
            }
            setSuggestions(result)
        } catch (error) {
            setError("Failed to load suggestions");
            setSuggestions([]);
        } finally {
            setLoading(false);
        }

    }
    
    const getSuggestionsDebounce = useCallback(debounce(getSuggestions, 300), []); 

    useEffect(() => {
        if(inputValue.length > 1) {
            getSuggestionsDebounce(inputValue)
        } else {
            setSuggestions([])
        }
    }, [inputValue])

    const handleSuggestionClick = (suggestion) => {
        setInputValue(dataKey ? suggestion[dataKey] : dataKey);
        onSelect(suggestion);
        setSuggestions([]);
    }
    
  return (
    <div className="container">
        <input 
        type="text"
        value={inputValue}
        placeholder={placeholder}
        style={customStyles}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={handleInputChange}
        />
        {
        (SuggestionsList.length > 0 || loading || error) && <ul className="suggestion-list">
            {error && <div className="error">{error}</div>}
            {loading && <div className="loading">{customLoader}</div>}
            <SuggestionsList dataKey={dataKey} highlight={inputValue} suggestions={suggestions} onSuggestionClick={handleSuggestionClick}/>
        </ul>

        }
            
    </div>
  )
}

export default AutoComplete