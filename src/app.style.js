import styled from 'styled-components';
import { lightgrey, translucent, white } from './utilities/style.def';
import markerCardBackground from './assets/images/space_center_bg.png'

const Wrapper = styled.div`
.app {

    .logo {
        padding: 26px;
        font-size: 30px;
        font-weight: bold;
        letter-spacing: 7px;
        box-shadow: 1px 3px 10px ${lightgrey};
    }
    .row {
        position: relative;
    }
    .row::after {
        content: "";
        clear: both;
        display: table;
    }

    [class*="col-"] {
        float: left;
    }

    .col-1 {width: 8.33%;}
    .col-2 {width: 16.66%;}
    .col-3 {width: 25%;}
    .col-4 {width: 33.33%;}
    .col-5 {width: 41.66%;}
    .col-6 {width: 50%;}
    .col-7 {width: 58.33%;}
    .col-8 {width: 66.66%;}
    .col-9 {width: 75%;}
    .col-10 {width: 83.33%;}
    .col-11 {width: 91.66%;}
    .col-12 {width: 100%;}

    .marker-btn {
        background-color: transparent;
        border: none;
    }

    .alert {
        position: absolute;
        z-index: 1;
        padding: 20px;
        /* width: 100%; */
        color: ${white};
        min-width: 300px;
        left: 50%;
        transform: translate(-50%, 10px);
        text-align: center;

        &.error {
            background-color: rgba(${translucent.red});
        }
        &.info {
            background-color: rgba(${translucent.yellow});
        }
    }

    .marker-card {
        .details {
            background-image: url(${markerCardBackground});
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            padding: 20px;
            color: ${white};
        }
        .title {
            padding: 20px;
        }
    }

    // Overrides
    .mapboxgl-popup {
        top: -40px;
    }
    .mapboxgl-popup-content {
        padding: 0;
    }
    .mapboxgl-popup-close-button {
        color: ${white};
    }

    .shame {
        
    }
}
`
export default Wrapper;