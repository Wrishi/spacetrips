import { ApolloProvider } from "@apollo/client";
import algoliasearch from "algoliasearch";
import { Configure, InstantSearch } from "react-instantsearch-dom"
import App from "../../src/App";
import List from "../../src/components/list/List"
import Map from "../../src/components/map/Map."
import SearchBar from "../../src/components/searchbar/SearchBar";
import { client } from "../../src/utilities/apollo.helper";
import { MAX_HITS, SEARCH_CLIENT, SEARCH_CONFIG_FILTER } from "../../src/utilities/constants"

/* 
* Checks if Search bar communicates with List and Map
* Does the Map and List have same Spacecenters for random map boundaries
*/
const mapBoundaries = {
  "_sw": {
    "lng": -29.086433389440515,
    "lat": 19.703307195214848
  },
  "_ne": {
    "lng": 39.20231898437885,
    "lat": 57.03418799586751
  }
}
describe('List.cy.js', () => {
  it('Check if search bar works by default', () => {
    cy.mount(
      <InstantSearch
        indexName={process.env.REACT_APP_SEARCH_INDEX}
        searchClient={SEARCH_CLIENT}>
        <Configure hitsPerPage={MAX_HITS}
          filters={SEARCH_CONFIG_FILTER}
          insideBoundingBox={`${mapBoundaries._ne.lat},${mapBoundaries._ne.lng},${mapBoundaries._sw.lat},${mapBoundaries._sw.lng}`} />
        <SearchBar />
      </InstantSearch>
    )
    /* Find input and type a string */
    cy.get('input[type="text"]').type("ha")
    /* Expect autosuggestions to show suggestions */
    cy.get('[role="listbox"]').find("li").its('length').should('be.gte', 0)
    /* Expect suggestions to have the substring string that has been typed */
    cy.get('[role="listbox"]').find("li").contains(/Ha/i)
  }),
    it('Check if map shows markers by default', () => {
      cy.mount(
        <InstantSearch
          indexName={process.env.REACT_APP_SEARCH_INDEX}
          searchClient={SEARCH_CLIENT}>
          <Configure hitsPerPage={MAX_HITS}
            filters={SEARCH_CONFIG_FILTER}
            insideBoundingBox={`${mapBoundaries._ne.lat},${mapBoundaries._ne.lng},${mapBoundaries._sw.lat},${mapBoundaries._sw.lng}`} />
          <Map setMapBoundaries={() => { }} />
        </InstantSearch>
      )
      /* Expect map to have markers on load of the page */
      cy.get('[data-testid="marker"]').its('length').should('be.gte', 0)
    }),
    it('Check if list shows items by default', () => {
      cy.mount(
        <ApolloProvider client={client}>
          <InstantSearch
            indexName={process.env.REACT_APP_SEARCH_INDEX}
            searchClient={SEARCH_CLIENT}>
            <Configure hitsPerPage={MAX_HITS}
              filters={SEARCH_CONFIG_FILTER}
              insideBoundingBox={`${mapBoundaries._ne.lat},${mapBoundaries._ne.lng},${mapBoundaries._sw.lat},${mapBoundaries._sw.lng}`} />
            <List />
          </InstantSearch>
        </ApolloProvider>
      )
      /* Expect map to have markers on load of the page */
      cy.get('[data-testid="item"]').its('length').should('be.gte', 0)
    }),
    it('Check if search bar and map communicate with each other', () => {
      cy.viewport(1232, 984)
      cy.mount(
        <InstantSearch
          indexName={process.env.REACT_APP_SEARCH_INDEX}
          searchClient={SEARCH_CLIENT}>
          <Configure hitsPerPage={MAX_HITS}
            filters={SEARCH_CONFIG_FILTER}
            insideBoundingBox={`${mapBoundaries._ne.lat},${mapBoundaries._ne.lng},${mapBoundaries._sw.lat},${mapBoundaries._sw.lng}`} />
          <SearchBar />
          <Map setMapBoundaries={() => { }} />
        </InstantSearch>
      )
      /* Find input and type a string */
      cy.get('input[type="text"]').type("ha")
      /* Check if the number of auto suggestions and are the same */
      cy.get('[role="listbox"]').find("li").its('length').then(l => {
        cy.get('[data-testid="marker"]').its('length').should('eq', l)
      })
    }),
    it('Check if search bar and list communicate with each other', () => {
      cy.mount(
        <ApolloProvider client={client}>
          <InstantSearch
            indexName={process.env.REACT_APP_SEARCH_INDEX}
            searchClient={SEARCH_CLIENT}>
            <Configure hitsPerPage={MAX_HITS}
              filters={SEARCH_CONFIG_FILTER}
              insideBoundingBox={`${mapBoundaries._ne.lat},${mapBoundaries._ne.lng},${mapBoundaries._sw.lat},${mapBoundaries._sw.lng}`} />
            <SearchBar />
            <List hoverSpaceCenter={() => { }} />
          </InstantSearch>
        </ApolloProvider>
      )
      /* Find input and type a string */
      cy.get('input[type="text"]').type("ha")
      /* Check if the number of auto suggestions and are the same */
      cy.get('[role="listbox"]').find("li").its('length').then(l => {
        cy.get('[data-testid="item"]').its('length').should('eq', l)
      })
      /* Check if the text in autosuggestions and item headers are same */
      cy.get('[role="listbox"]').find("li").each(suggestion => {
        cy.get('[data-testid="item"]').find('header').contains(suggestion.text())
      })
    }),
    it('Check if clicking on a marker on a map shows pop up and selects list item', () => {
      cy.viewport(1848, 984)
      cy.mount(
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      )
      /* Click a marker */
      cy.get('[data-testid="marker"]').eq(11).click()
      /* Marker appears */
      cy.get('.marker-card')
      /* A focused item from list appears */
      cy.get('.item.focus')
      /* Marker and focused item have the same name */
      cy.get('.marker-card').find('.title').then(title => {
        cy.get('.item.focus').find('header').contains(title.text())
      })
    })
})