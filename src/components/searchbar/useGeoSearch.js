import { connectGeoSearch } from 'react-instantsearch-dom';
import { useConnector } from 'react-instantsearch-hooks-web';

export const useGeoSearch = (props) => {
    return useConnector(connectGeoSearch, props)
}