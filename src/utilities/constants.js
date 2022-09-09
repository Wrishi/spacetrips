import { topBarHeight } from "./style.def"
import algoliasearch from 'algoliasearch/lite';

export const PLANET = {
    earth: {
        code: "EAR",
        id: "3"
    }
}

export const SEARCH_CLIENT = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APPID,
    process.env.REACT_APP_ALGOLIA_APIKEY
);
export const SEARCH_CONFIG_FILTER = `planet_code:${PLANET.earth.code}`

export const DEFAULT_MAPBOX_CONFIG = {
    viewState: {
        latitude: 41.579606918652054,
        longitude: 4.244298260567439,
        zoom: 3.5
    },
    style: {
        width: '100%',
        height: window.innerHeight - topBarHeight // 900 
    }
}
export const MAPBOX_MIN_ZOOM = 3

// Ideally to be derived from new date()
export const TODAY = "2019-09-23" // new Date().toISOString().slice(0, 10)
export const TIME_FORMAT = "HH:mm"
export const DATE_FORMAT = "YYYY-MM-DD"
export const FLIGHT_TIME_DIFF_RANGE = 300 /* In minutes */

export const MAX_HITS = 20