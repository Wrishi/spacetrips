import styled from 'styled-components';
import { darkgrey, lightgrey, white } from '../../utilities/style.def';
import rocketIcon from "../../assets/icons/Rocket@2x.svg"

const Wrapper = styled.div`
.list {
    padding: 20px;
    height: 900px;
    overflow: auto;
    position: relative;
    
    .item {
        box-shadow: 1px 2px 5px #666;
        transition: 0.2s;
        margin-bottom: 30px;
        position: relative;

        &:hover {
            box-shadow: 1px 5px 15px #666;
        }
        header {
            padding: 20px;
            
            .title {
                display: inline-block;
                width: 80%;

                .location {
                    font-size: 14px;
                }
            }


            .icon {
                display: inline-block;
                width: 30px;
                height: 30px;
                background-image: url(${rocketIcon});
                background-position: 0px 0px;
                background-repeat: repeat-x;
                background-size: cover;
                /* animation: animatedBackground 10s linear infinite alternate; */
                float: right;
            }

            /* @keyframes animatedBackground {
                from {
                    background-position: 0 0;
                }
                to {
                    background-position: 100% 0;
                }
            } */
        }
        .details {
            padding: 20px;
        }
        footer {
            button {
                background-color: ${darkgrey};
                color: ${lightgrey};
                width: 100%;
                padding: 20px;
                border: 1px solid ${darkgrey};

                &:hover {
                    color: ${white};
                }
            }
        }
    }
}
`
export default Wrapper;