import Image from 'next/image';
import { ActionMenu, ActionMenuActionType, cv, Flex, Span, Text } from 'opize-design-system';
import { DotsThreeVertical } from 'phosphor-react';
import React from 'react';
import styled from 'styled-components';

export const DashboardItems = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20%, auto));
    grid-auto-rows: minmax(320px, auto);
    gap: 20px;
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
    height: 100%;

    box-shadow: 0px 8px 16px rgba(26, 30, 33, 0.06);

    transition: 400ms;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0px 12px 16px rgba(26, 30, 33, 0.08);
    }
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
    border-radius: 8px;
    text-decoration: none;
    border: solid 1px ${cv.border4};
    height: 100%;
`;

const ImageDiv = styled.div`
    width: 100%;
    height: 130px;
    min-height: 130px;
    position: relative;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    overflow: hidden;
    user-select: none;
`;

const Icon = styled.div`
    position: absolute;
    left: 12px;
    top: 100px;
    width: 52px;
    height: 52px;
    border-radius: 999px;
`;

const Title = styled.h3`
    font-size: 24px;
    color: ${cv.text1};
`;

const SubTitle = styled.p`
    font-size: 14px;
    color: ${cv.text3};
`;

const ItemContent = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 30px 14px 44px 14px;
    height: 100%;
    gap: 4px;
`;

const Footer = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    height: 40px;
    width: 100%;
    border-top: solid 1px ${cv.border4};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 14px;
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
    footer?: {
        left?: React.ReactNode;
        right?: React.ReactNode;
    };
}
export const DashboardItem = React.forwardRef<HTMLAnchorElement, DashboardItemProps>(
    ({ href, title, subTitle, backgroundImage, icon, tags, onClick, actions, footer }, ref) => {
        return (
            <DashboardItemDivver>
                <StyledDashboardItem href={href} onClick={onClick} ref={ref}>
                    <ImageDiv>
                        <Image src={backgroundImage} alt="" layout="fill" objectFit="cover" />
                    </ImageDiv>

                    <ItemContent>
                        <Title>{title}</Title>
                        <SubTitle>{subTitle}</SubTitle>
                        <Tags>
                            {tags.map((tag, i) => (
                                <DashboardItemTag key={i} {...tag} />
                            ))}
                        </Tags>

                        {footer && (
                            <Footer>
                                {footer.left || <div />}
                                {footer.right || <div />}
                            </Footer>
                        )}
                    </ItemContent>

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
