import styled from 'styled-components';
import { darkgrey, grey, lightgrey, white, yellow } from '../../utilities/style.def';
import arrowIcon from '../../assets/icons/Arrow.svg'

const Wrapper = styled.div`
.search-bar {
    display: flex;
    justify-content: space-between;
    height: 88px;
    align-items: center;
    background-color: ${darkgrey};
    box-shadow: 1px 3px 10px ${lightgrey};
    color: ${white};
    padding-left: 60px;
    
    & > div{ 
        position: relative;
        &:last-child {
            height: 100%;
            
            button {
                background-color: ${yellow};
                height: 100%;
                width: 100%;
                min-width: 100px;
                background-image: url(${arrowIcon});
                background-position: center;
                background-repeat: no-repeat;
                border: none;
            }
        }

        input {
            background-color: transparent;
            border: none;
            font-size: 16px;
            border-bottom: 1px solid ${grey};
            outline: none;
            color: ${white};
        }
        input:focus {
            border-bottom: 1px solid ${white};
        }

        .react-autosuggest__suggestions-container, 
        .react-autosuggest__suggestions-container--open {
            position: absolute;
            background-color: ${white};
            color: ${darkgrey};
            z-index: 1;
            max-height: 160px;
            overflow: auto;

            ul{
                list-style: none;
                padding: 0;
                margin: 0;
                li {
                    padding: 5px 10px;
                    border-bottom: 1px solid ${lightgrey};
 
                    &:hover,
                    &.react-autosuggest__suggestion--highlighted {
                        font-weight: bold;
                        cursor: pointer;
                    }
                }
            }
        }

    }

    select {
        background: transparent;
        color: ${white};
        border: none;
        border-bottom: 1px solid ${white};

        &:focus{
            border: none;
        }

        option {
            color: ${darkgrey}
        }
    }
}
`
export default Wrapper;