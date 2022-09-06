import { useEffect, useState } from "react";
import Autosuggest from "react-autosuggest";
import { connectAutoComplete, Highlight } from "react-instantsearch-dom";

const Hits = (props) => {
  const [value, setValue] = useState('')
  const [hits, setHits] = useState([])

  useEffect(() => {
    if (props.hits) setHits(!value ? [] : props.hits)
  }, [props.hits, value])

  return (
    <Autosuggest
      suggestions={hits}
      multiSection={false}
      onSuggestionsFetchRequested={({ value }) => props.refine(value)}
      onSuggestionsClearRequested={() => setHits([])}
      getSuggestionValue={hit => { 
        props.selectSpaceCenter(hit.uid)
        return hit.name
      }}
      renderSuggestion={hit => (
        <div className="hit">
          <Highlight attribute="name" hit={hit} />
        </div>
      )}
      inputProps={{
        placeholder: 'Search space centers...',
        value: value,
        onChange: (event, { newValue, method }) => { setValue(newValue) },
      }}
      renderSectionTitle={section => section.index}
      getSectionSuggestions={section => section.hits}
    />
  )
}

const AutoComplete = connectAutoComplete(Hits);

export default AutoComplete
