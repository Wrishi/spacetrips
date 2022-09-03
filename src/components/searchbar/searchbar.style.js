import styled from 'styled-components';
import { darkgrey, lightgrey, white, yellow } from '../../utilities/style.def';
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