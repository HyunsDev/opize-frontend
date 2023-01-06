import { cv } from 'opize-design-system';
import styled from 'styled-components';

const Div = styled.div`
    width: 100%;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    text-align: center;
    font-weight: ${cv.fontWeightSemiBold};
`;

export function IndexBottomText({ children }: { children: React.ReactNode }) {
    return <Div>{children}</Div>;
}
