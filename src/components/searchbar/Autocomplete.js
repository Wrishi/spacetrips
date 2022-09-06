import { useEffect, useState } from "react";
import Autosuggest from "react-autosuggest";
import { connectAutoComplete, Highlight } from "react-instantsearch-dom";

const Hits = ({ 
  /* variables */
  hits, 
  refine, 
  /* functions */
  selectSpaceCenter 
}) => {
  const [value, setValue] = useState('')
  const [spaceCenters, setSpaceCenters] = useState([])

  useEffect(() => {
    if (hits) setSpaceCenters(!value ? [] : hits)
  }, [hits, value])

  return (
    <Autosuggest
      suggestions={spaceCenters}
      multiSection={false}
      onSuggestionsFetchRequested={({ value }) => refine(value)}
      onSuggestionsClearRequested={() => { setSpaceCenters([]) }}
      getSuggestionValue={hit => { 
        selectSpaceCenter(hit)
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
        onChange: (event, { newValue, method }) => { 
          setValue(newValue) 
          refine(newValue)
        },
      }}
      renderSectionTitle={section => section.index}
      getSectionSuggestions={section => section.hits}
    />
  )
}

const AutoComplete = connectAutoComplete(Hits);

export default AutoComplete
