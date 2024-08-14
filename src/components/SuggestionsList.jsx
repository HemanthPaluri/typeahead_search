import "./styles.css"

const SuggestionsList = ({
    suggestions=[],
    highlight,
    dataKey,
    onSuggestionClick
}) => {
    const getHighLightedText = (text, highlit) => {
        const parts = text.split(new RegExp(`(${highlit})`, "gi"));
        return (
            <span>
                {parts.map((part, index) => {
                    return part.toLowerCase() === highlit.toLowerCase() ? (<b key={index}>{part}</b>) : (part)
                })}
            </span>
        )
    }
  return (
    <>
        {suggestions.map((suggestion, index) => {
            const currentSuggestion = dataKey ? suggestion[dataKey] : suggestion;
            return (
                <li key={index} onClick={() => onSuggestionClick(suggestion)} className='suggestion-item'>{getHighLightedText(currentSuggestion, highlight)}</li>
            )
        })}
    </>
  )
}

export default SuggestionsList