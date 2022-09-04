import { gql } from "@apollo/client"

// Returns all planets with spacestations
export const GET_SPACESTATIONS_FOR_PLANET = gql`
  query getSpaceStations {
    planets {
      id,
      name,
      code,
      spaceCenters {
        id,
        uid,
        name,
        description,
        latitude,
        longitude,
        planet {
          name
        }
      }
    }
  }
`

export const GET_SPACESTATIONS = gql`
  query getSpaceStations($page: Int!, $pageSize: Int!) {
    spaceCenters(page: $page, pageSize: $pageSize) {
    nodes {
      id,
      uid,
      name,
      description,
      latitude,
      longitude,
      planet {
        id,
        name,
        code
      }
    }
  }
}
`

export const GET_FLIGHTS_FOR_SPACESTATIONS = gql`
  query getSpaceStations($from: ID!, $departureDay: GraphQLDate!) {
    flights(from: $from, departureDay: $departureDay, pageSize: 1000) {
        nodes {
            id,
            code,
            launchSite {
                id,
                name,
                planet {
                  id,
                  name
                }
            }
            landingSite {
                id,
                name,
                planet {
                  id,
                  name
                }
            },
            departureAt,
            seatCount,
            availableSeats
        }
    }
}
`