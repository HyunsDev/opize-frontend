import styled from 'styled-components';

const Outer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
`;

const Inner = styled.div`
    width: 320px;
    text-align: center;
`;

export function AuthPageLayout({ children }: { children: React.ReactNode }) {
    return (
        <Outer>
            <Inner>{children}</Inner>
        </Outer>
    );
}
