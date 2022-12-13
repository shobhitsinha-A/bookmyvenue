import React, {useEffect, useState} from "react";
import AnimatedContainer from "../helpers/AnimatedContainer";
import Sidebar from "../components/sidebar/Sidebar";

import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { motion } from "framer-motion";
import { PrimaryButton as PrimaryButtonBase } from "../components/content/Buttons";
import { ReactComponent as StarIcon } from "../images/star-icon.svg";

const Container = tw.div`relative min-w-full p-8`;
const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row float-right`;
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

const CardText = tw.div`p-4 text-gray-900`;
const CardTitle = tw.h5`text-lg font-semibold group-hover:text-primary-500`;
const CardContent = tw.p`mt-1 text-sm font-medium text-gray-600`;
const CardPrice = tw.p`mt-4 text-xl font-bold`;

export default () => {
    function getImageFromResults(id, images) {
        if (images.length > 0) {
            return 'https://bookmyvenue.live:6969/images/' + id + '/' + images[0]['image_name'];
        }
        else return '';
    }
    const [results, setResults] = useState({});
    const tabsKeys = Object.keys(results);
    useEffect(() => {
        async function getSearchResults() {
            let response = await fetch('https://bookmyvenue.live:6969/venues/created_by/' + sessionStorage.getItem('user_name'), {
                method: 'GET'
            });
            let jsonResponse = await response.json();
            if (jsonResponse.status) {
                setResults(jsonResponse.data.details);
            }
        }
        getSearchResults().catch(console.error);
    }, []);
    const [activeTab, setActiveTab] = useState('Weddings');
    if (sessionStorage.getItem('user_name')) {
        return (
            <div className="bg-blueGray-600">
                <AnimatedContainer>
                    <Sidebar role={sessionStorage.getItem('role')}/>
                    <div style={{paddingLeft: '16rem'}}>
                        <div className="flex flex-wrap md:min-w-full bg-white h-screen">
                            <Container>
                                <HeaderRow>
                                    <TabsControl>
                                        {Object.keys(results).map((tabName, index) => (
                                            <TabControl key={index} active={activeTab === tabName}
                                                        onClick={() => setActiveTab(tabName)}>
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
                                        transition={{duration: 0.4}}
                                        initial={activeTab === tabKey ? "current" : "hidden"}
                                        animate={activeTab === tabKey ? "current" : "hidden"}
                                    >
                                        {results[tabKey].map((card, index) => (
                                            <CardContainer key={index}>
                                                <Card className="group" href="/editvenue" initial="rest"
                                                      whileHover="hover" animate="rest">
                                                    <CardImageContainer
                                                        imageSrc={getImageFromResults(card.id, card.venue_images)}>
                                                        <CardRatingContainer>
                                                            <CardRating>
                                                                <StarIcon/>
                                                                {card.rating}
                                                            </CardRating>
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
                                                            transition={{duration: 0.3}}
                                                        >
                                                            <CardButton
                                                                onClick={() => sessionStorage.setItem('editVenueId', card.id)}>Edit</CardButton>
                                                        </CardHoverOverlay>
                                                    </CardImageContainer>
                                                    <CardText>
                                                        <CardTitle>{card.name}</CardTitle>
                                                        <CardContent>{card.city + ', ' + card.state}</CardContent>
                                                        <CardPrice>{card.price}</CardPrice>
                                                    </CardText>
                                                </Card>
                                            </CardContainer>
                                        ))}
                                    </TabContent>
                                ))}
                            </Container>
                        </div>
                    </div>
                </AnimatedContainer>
            </div>
        );
    } else {
        window.location.href = '/login';
    }
}