import React, { useState } from "react";
import AnimatedContainer from "../helpers/AnimatedContainer";
import Footer from "../components/footers/Footer";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { motion } from "framer-motion";
import {Container, ContentWithPadding} from "../components/layouts/Layouts";
import { SectionHeading } from "../components/content/Headings";
import { PrimaryButton as PrimaryButtonBase } from "../components/content/Buttons";
import { ReactComponent as StarIcon } from "../images/star-icon.svg";
import Filter from "../components/filter/Filter";

const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const Header = tw(SectionHeading)``;
const TabsControl = tw.div`flex flex-wrap bg-gray-200 px-2 py-2 rounded leading-none mt-12 xl:mt-0`;
const TabControl = styled.div`
  ${tw`cursor-pointer px-6 py-3 mt-2 sm:mt-0 sm:mr-2 last:mr-0 text-gray-600 font-medium rounded-sm transition duration-300 text-sm sm:text-base w-1/2 sm:w-auto text-center`}
  &:hover {
    ${tw`bg-gray-300 text-gray-700`}
  }
  ${props => props.active && tw`bg-primary-500! text-gray-100!`}
  }
`;

const TabContent = tw(motion.div)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;
const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12`;
const Card = tw(motion.a)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;
const CardImageContainer = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-56 xl:h-64 bg-center bg-cover relative rounded-t`}
`;
const CardRatingContainer = tw.div`leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end`;
const CardRating = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-end`}
  svg {
    ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
  }
`;

const CardHoverOverlay = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  ${tw`absolute inset-0 flex justify-center items-center`}
`;
const CardButton = tw(PrimaryButtonBase)`text-sm`;

const CardReview = tw.div`font-medium text-xs text-gray-600`;

const CardText = tw.div`p-4 text-gray-900`;
const CardTitle = tw.h5`text-lg font-semibold group-hover:text-primary-500`;
const CardContent = tw.p`mt-1 text-sm font-medium text-gray-600`;
const CardPrice = tw.p`mt-4 text-xl font-bold`;

export default ({
                    heading = "Search Results",
                    tabs = {
                        Weddings: [
                            {
                                imageSrc:
                                    "https://cdn0.weddingwire.com/vendor/005959/original/960/jpg/1514743289-434172d9012c01a0-1507470329026-image2.webp",
                                title: "Whippoorwill Hill",
                                content: "Bloomington, IN",
                                price: "$3,000/100 guests",
                                rating: "5.0",
                                reviews: "80",
                                url: "#"
                            },
                            {
                                imageSrc:
                                    "https://cdn0.weddingwire.com/vendor/466506/original/960/jpg/1480766089-a5d8a8db471d01ac-SycamoreFarm2016-002__1_.webp",
                                title: "Sycamore Farm",
                                content: "Bloomington, IN",
                                price: "Contact for pricing",
                                rating: "4.9",
                                reviews: "53",
                                url: "#"
                            }
                        ],
                        Meetings: [
                            {
                                imageSrc:
                                    "https://assets.simpleviewinc.com/simpleview/image/upload/crm/bloomington/image0020-d0cfbf5f5056a36_d0cfc0b1-5056-a36a-0678b1f75686158a.jpg",
                                title: "Indiana Memorial Union - Biddle Hotel & Conference Center",
                                content: "Bloomington, IN",
                                price: "Contact for pricing",
                                rating: "5.0",
                                reviews: "470",
                                url: "/venue"
                            },
                            {
                                imageSrc:
                                    "https://assets.simpleviewinc.com/simpleview/image/upload/crm/bloomington/MonroeConventionCenter_450aea8e-5056-a36a-06de22f8c1c0ee90.jpg",
                                title: "Monroe Convention Center",
                                content: "Bloomington, IN",
                                price: "Contact for pricing",
                                rating: "4.7",
                                reviews: "120",
                                url: "#"
                            }
                        ],
                        Celebrations: []
                    }
                }) => {

    const tabsKeys = Object.keys(tabs);
    const [activeTab, setActiveTab] = useState(tabsKeys[0]);

    return (
        <AnimatedContainer>
            <Container>
                <Filter/>
            </Container>
            <Container>
                <ContentWithPadding>
                    <HeaderRow>
                        <Header>{heading}</Header>
                        <TabsControl>
                            {Object.keys(tabs).map((tabName, index) => (
                                <TabControl key={index} active={activeTab === tabName} onClick={() => setActiveTab(tabName)}>
                                    {tabName}
                                </TabControl>
                            ))}
                        </TabsControl>
                    </HeaderRow>

                    {tabsKeys.map((tabKey, index) => (
                        <TabContent
                            key={index}
                            variants={{
                                current: {
                                    opacity: 1,
                                    scale: 1,
                                    display: "flex",
                                },
                                hidden: {
                                    opacity: 0,
                                    scale: 0.8,
                                    display: "none",
                                }
                            }}
                            transition={{ duration: 0.4 }}
                            initial={activeTab === tabKey ? "current" : "hidden"}
                            animate={activeTab === tabKey ? "current" : "hidden"}
                        >
                            {tabs[tabKey].map((card, index) => (
                                <CardContainer key={index}>
                                    <Card className="group" href={card.url} initial="rest" whileHover="hover" animate="rest">
                                        <CardImageContainer imageSrc={card.imageSrc}>
                                            <CardRatingContainer>
                                                <CardRating>
                                                    <StarIcon />
                                                    {card.rating}
                                                </CardRating>
                                                <CardReview>({card.reviews})</CardReview>
                                            </CardRatingContainer>
                                            <CardHoverOverlay
                                                variants={{
                                                    hover: {
                                                        opacity: 1,
                                                        height: "auto"
                                                    },
                                                    rest: {
                                                        opacity: 0,
                                                        height: 0
                                                    }
                                                }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <CardButton>Reserve Now</CardButton>
                                            </CardHoverOverlay>
                                        </CardImageContainer>
                                        <CardText>
                                            <CardTitle>{card.title}</CardTitle>
                                            <CardContent>{card.content}</CardContent>
                                            <CardPrice>{card.price}</CardPrice>
                                        </CardText>
                                    </Card>
                                </CardContainer>
                            ))}
                        </TabContent>
                    ))}
                </ContentWithPadding>
            </Container>
            <Footer />
        </AnimatedContainer>
    );
};
