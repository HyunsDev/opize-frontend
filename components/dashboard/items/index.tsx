import Image from 'next/image';
import { ActionMenu, ActionMenuActionType, cv, Flex } from 'opize-design-system';
import { DotsThreeVertical } from 'phosphor-react';
import React from 'react';
import styled from 'styled-components';

export const DashboardItems = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, auto));
    gap: 20px;
    margin-top: 32px;
    margin-bottom: 32px;
`;

const ActionBtn = styled.div`
    position: absolute;
    top: 140px;
    right: 8px;
    transition: 200ms;
`;

const DashboardItemDivver = styled.div`
    position: relative;
    border-radius: 4px;
    width: 100%;
`;

const Tags = styled.div`
    position: absolute;
`;

const StyledDashboardItemTag = styled.div``;

export interface DashboardItemTagProps {
    color: string;
    backgroundColor: string;
    children: string;
}

function DashboardItemTag({ color, backgroundColor, children }: DashboardItemTagProps) {
    return <StyledDashboardItemTag>{children}</StyledDashboardItemTag>;
}

const StyledDashboardItem = styled.a`
    display: flex;
    position: relative;
    flex-direction: column;
    background-color: ${cv.bg_element1};
    box-shadow: 0px 8px 16px rgba(26, 30, 33, 0.06);
    border-radius: 4px;
    text-decoration: none;
    transition: 200ms;
    border: solid 1px ${cv.border4};

    &:hover {
        /* transform: translateY(-4px); */
        box-shadow: 0px 12px 16px rgba(26, 30, 33, 0.08);
    }
`;

const ImageDiv = styled.div`
    width: 100%;
    height: 130px;
    position: relative;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    overflow: hidden;
    user-select: none;
`;

const Icon = styled.div`
    position: absolute;
    left: 16px;
    top: 100px;
    width: 52px;
    height: 52px;
    border-radius: 999px;

    &::after {
        position: absolute;
        content: '';
        box-sizing: content-box;
        width: 50px;
        height: 50px;
        top: -4px;
        left: -4px;
        border-radius: 999px;
        border: solid 4px #ffffff;
    }
`;

const Title = styled.h3`
    font-size: 16px;
    color: ${cv.text1};
`;

const SubTitle = styled.p`
    font-size: 14px;
    color: ${cv.text3};
`;

export interface DashboardItemProps {
    href?: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    title: string;
    subTitle: string;
    backgroundImage: string;
    icon: string;
    tags: DashboardItemTagProps[];
    actions?: ActionMenuActionType[][];
}
export const DashboardItem = React.forwardRef<HTMLAnchorElement, DashboardItemProps>(
    ({ href, title, subTitle, backgroundImage, icon, tags, onClick, actions }, ref) => {
        return (
            <DashboardItemDivver>
                <StyledDashboardItem href={href} onClick={onClick} ref={ref}>
                    <ImageDiv>
                        <Image src={backgroundImage} alt="" layout="fill" objectFit="cover" />
                    </ImageDiv>

                    <Flex.Column style={{ padding: '28px 22px 22px' }}>
                        <Title>{title}</Title>
                        <SubTitle>{subTitle}</SubTitle>
                        <Tags>
                            {tags.map((tag, i) => (
                                <DashboardItemTag key={i} {...tag} />
                            ))}
                        </Tags>
                    </Flex.Column>

                    <Icon>
                        <Image src={icon} alt="" layout="fill" />
                    </Icon>
                </StyledDashboardItem>
                {actions && (
                    <ActionBtn>
                        <ActionMenu
                            variant="text"
                            borderRadius={9999}
                            icon={<DotsThreeVertical size={20} />}
                            actions={actions}
                        />
                    </ActionBtn>
                )}
            </DashboardItemDivver>
        );
    }
);
DashboardItem.displayName = 'DashboardItem';
