import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const Loading = styled.div`
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const Container = styled.div`
    max-width: 700px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    padding: 30px;
    margin: 80px auto;
`;

export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;


    img{
        width: 150px;
        border-radius: 20%;
        margin: 20px 0;
    }

    h1{
        font-size: 30px;
        color: #0D2636;
    }

    p{
        margin-top: 5px;
        font-size: 14px;
        color: #000;
        text-align: center;
        line-height: 1.4;
        max-width: 400px;
    }

`;


export const BackButton = styled(Link)`
    border: 0;
    outline: 0;
    background: transparent;
`;

export const Top = styled.div`
display: flex;
justify-content: space-between;
`;


export const Language = styled.div`
    display: flex;
    align-items: center;
    font-size: 12px;

    span{
        margin-left: 10px;
        cursor: default;
    }
`;

export const IssuesList = styled.ul`
    margin-top: 10px;
    padding-top: 30px;
    border-top: 1px solid #eee;
    list-style: none;

    li{
        display: flex;
        padding: 15px 10px;

        & + li{
            margin-top: 12px;
            border-top: 1px solid #eee;
        }

        img{
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 2px solid #0D2636;
        }

        div{
            flex: 1;
            margin: 8px 5px;
        }

        p{
            display: flex;
            align-items: center;
            margin-top: 10px;
            font-size: 12px;
            font-weight: 500;
            color: #000;

            svg{
                margin-right: 5px;
            }
        }

        strong{
            font-size: 15px;
            display: flex;
            flex-direction: column;
            a{
                text-decoration: none;
                color: #222;
                transition: 0.3s;

                &:hover{
                    color: #0071db;
                }
            }

            span{
                display: inline-block;
                margin-top: 5px;
                margin-left: 10px;
                padding: 5px 7px;
                background: #222;
                color: #fff;
                border-radius: 10px;
                font-weight: 600;
                font-size: 12px;
            }
        }
    }

`;

export const PageActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    button{
        outline: 0;
        border: 0;
        background: #222;
        color: #fff;
        padding: 5px 10px;
        border-radius: 4px;
        
        &:disabled{
            cursor: not-allowed;
            opacity: 0.5;
        }
    }
`;


export const FilterList = styled.div`
    margin-top: 40px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    div{
        margin-top: 6px;
    }


    button{
        outline: 0;
        border: 0;
        border-radius: 4px;
        margin: 0 3px;
        width: 100px;
        height: 20px;
        font-size: 14px;

        /*props.active passa 0 então 0+1 = 1 e essa é a posição do index */
        &:nth-child(${props => props.active + 1})
        {
            background: #0071db;
            color: #fff;
        }
    }

`;
