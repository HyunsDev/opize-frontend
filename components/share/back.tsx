import { cv } from 'opize-design-system';
import { CaretLeft } from 'phosphor-react';
import React from 'react';
import styled from 'styled-components';

const StyledBack = styled.a`
    display: flex;
    align-items: center;
    gap: 4px;
    color: ${cv.gray500};
    font-size: 12px;
    cursor: pointer;
    transition: 200ms;
    margin-bottom: 8px;
    text-decoration: none;
    width: fit-content;

    &:hover {
        color: ${cv.gray500};
    }
`;

export type BackProps = {
    children?: React.ReactNode;
    href?: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};
export const Back = React.forwardRef<HTMLAnchorElement, BackProps>(({ children, onClick, href, ...props }, ref) => {
    return (
        <StyledBack {...props} ref={ref} onClick={onClick} href={href}>
            <CaretLeft />
            {children}
        </StyledBack>
    );
});
Back.displayName = 'Back';
