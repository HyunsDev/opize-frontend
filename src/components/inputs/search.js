import styled from 'styled-components';
import { MagnifyingGlass } from 'phosphor-react';
import { useTranslation } from 'react-i18next';

const SearchDiv = styled.div`
    background-color: var(--grey1);
    width: 100%;
    box-sizing: border-box;
    padding: 8px;
    padding-left: 16px;
    display: flex;
    gap: 8px;
    border-radius: 8px;
    transition: 200ms;
    outline: solid 2px rgba(0,0,0,0);

    &:focus-within {
        outline: solid 2px var(--grey4);
    }
    margin-top: 8px;
`

const Input = styled.input`
    width: 100%;
    background: transparent;
    border: 0;
    
    &:focus {
        outline: 0;
    }
`

export default function Search(props) {
    const { t } = useTranslation('translation')

    return (
        <SearchDiv>
            <MagnifyingGlass size={16} weight='bold' color='#747474' />
            <Input type={'search'} value={props.value || ""} onChange={props.onChange || (() => {})} placeholder={props.placeholder || t("search_placeholder")}/>
        </SearchDiv>
    )
}