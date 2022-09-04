export const DEFAULT_MAPBOX_CONFIG = {
    viewState: {
        latitude: 41.579606918652054,
        longitude: 4.244298260567439,
        zoom: 3.5
    },
    style: { 
        width: '100%', 
        height: 900 
    }
}
export const MAPBOX_MIN_ZOOM = 3

export const PLANET = {
    earth: {
        code: "EAR",
        id: "3"
    }
}

// Ideally to be derived from new date()
export const TODAY = "2019-09-23" // new Date().toISOString().slice(0, 10)
export const TIME_FORMAT = "HH:mm"
export const DATE_FORMAT = "YYYY-MM-DD"
export const FLIGHT_TIME_DIFF_RANGE = 120 /* In minutes */