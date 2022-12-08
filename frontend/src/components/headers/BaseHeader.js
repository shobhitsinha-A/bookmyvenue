import React from "react";
import tw from "twin.macro";
import styled from "styled-components";


const Header = tw.header`
  flex justify-between items-center
  max-w-screen-xl mx-auto
`;

export const NavLinks = tw.div`inline-block`;

export const NavLink = tw.a`
  text-lg my-2 lg:text-sm lg:mx-6 lg:my-0
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hover:border-primary-500 hocus:text-primary-500
`;

export const PrimaryLink = tw(NavLink)`
  lg:mx-0
  px-8 py-3 rounded bg-primary-500 text-gray-100
  hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline
  border-b-0
`;

export const LogoLink = styled(NavLink)`
  ${tw`flex items-center font-black border-b-0 text-2xl! ml-0!`};
`;

export const NavToggle = tw.button`
  lg:hidden z-20 focus:outline-none hocus:text-primary-500 transition duration-300
`;

export const DesktopNavLinks = tw.nav`
  hidden lg:flex flex-1 justify-between items-center
`;

export default ({roundedHeaderButton = false, logoLink, links, className, collapseBreakpointClass = "lg"}) => {

  const defaultLinks = [
    <NavLinks key={1}>
      <NavLink href="/#">About</NavLink>
      <NavLink href="/#">Contact Us</NavLink>
      {sessionStorage.getItem('user_name') ?
          <PrimaryLink css={roundedHeaderButton && tw`rounded-full`} href="/logout">Logout</PrimaryLink> :
          <PrimaryLink css={roundedHeaderButton && tw`rounded-full`} href="/login">Login</PrimaryLink>
      }
    </NavLinks>
  ];

  const collapseBreakpointCss = collapseBreakPointCssMap[collapseBreakpointClass];

  const defaultLogoLink = (
      <LogoLink href="/">
        BookMyVenue
      </LogoLink>
  );

  return (
      <Header className={className || "header-light"}>
        <DesktopNavLinks css={collapseBreakpointCss.desktopNavLinks}>
          {defaultLogoLink}
          {defaultLinks}
        </DesktopNavLinks>
      </Header>
  );
};

const collapseBreakPointCssMap = {
  sm: {
    desktopNavLinks: tw`sm:flex`,
  },
  md: {
    desktopNavLinks: tw`md:flex`,
  },
  lg: {
    desktopNavLinks: tw`lg:flex`,
  },
  xl: {
    desktopNavLinks: tw`lg:flex`,
  }
};
