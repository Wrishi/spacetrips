import styled from 'styled-components';
import { breakpoint, darkgrey, grey, lightgrey, white } from '../../utilities/style.def';
import rocketIcon from "../../assets/icons/Rocket@2x.svg"

const Wrapper = styled.div`
.list {
    padding: 20px;
    height: 900px;
    overflow: auto;
    position: relative;

    @media only screen and (max-width: ${breakpoint}) {
        height: 270px;
        white-space: nowrap;
        overflow: hidden;
        overflow-x: auto;
    }
    
    .item {
        box-shadow: 1px 2px 5px ${grey};
        transition: 0.2s;
        margin-bottom: 30px;
        position: relative;

        @media only screen and (max-width: ${breakpoint}) {
            display: inline-block;
            margin-right: 20px;
            width: 440px;
            vertical-align: top;
        }
        

        &:hover {
            box-shadow: 1px 5px 15px ${grey};
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
                float: right;
            }
        }

        &.focus {
            box-shadow: 1px 5px 15px ${grey};
            header {
                .icon {
                    animation: animateIcon 0.25s 12 cubic-bezier(0.075, 0.82, 0.165, 1) alternate;
                }

                @keyframes animateIcon {
                    from {
                        transform: translate(-5px, 5px);
                    }
                    to {
                        transform: translate(5px, -5px);
                    }
                }
            }
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