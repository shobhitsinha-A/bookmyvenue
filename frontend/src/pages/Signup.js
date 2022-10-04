import React from "react";
import AnimatedContainer from "../helpers/AnimatedContainer.js";
import {Container as ContainerBase} from "../components/layouts/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import appleIconImageSrc from "../images/apple-icon.png"
import googleIconImageSrc from "../images/google-icon.png";

import {ReactComponent as SignUpIcon} from "feather-icons/dist/icons/user-plus.svg";

const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const SocialButtonsContainer = tw.div`flex flex-col items-center`;
const SocialButton = styled.a`
  ${tw`w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
  .iconContainer {
    ${tw`bg-white p-2 rounded-full`}
  }

  .icon {
    ${tw`w-4`}
  }

  .text {
    ${tw`ml-4`}
  }
`;


const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }

  .text {
    ${tw`ml-3`}
  }
`;


export default ({
                  headingText = "Sign Up",
                  socialButtons = [
                    {
                      iconImageSrc: appleIconImageSrc,
                      text: "Sign Up With Apple",
                      url: "https://apple.com"

                    },
                    {
                      iconImageSrc: googleIconImageSrc,
                      text: "Sign Up With Google",
                      url: "https://google.com"
                    }
                  ],
                  submitButtonText = "Sign Up",
                  SubmitButtonIcon = SignUpIcon,
                  tosUrl = "#",
                  privacyPolicyUrl = "#",
                  signInUrl = "/login"
                }) => (
    <AnimatedContainer>
      <Container>
        <Content>
          <MainContainer>
            <MainContent>
              <Heading>{headingText}</Heading>
              <FormContainer>
                <SocialButtonsContainer>
                  {socialButtons.map((socialButton, index) => (
                      <SocialButton key={index} href={socialButton.url}>
                    <span className="iconContainer">
                      <img src={socialButton.iconImageSrc} className="icon" alt=""/>
                    </span>
                        <span className="text">{socialButton.text}</span>
                      </SocialButton>
                  ))}
                </SocialButtonsContainer>
                <Form>
                  <Input type="text" placeholder="First Name"/>
                  <Input type="text" placeholder="Last Name"/>
                  <Input type="text" placeholder="Mobile Number"/>
                  <Input type="email" placeholder="Email"/>
                  <Input type="password" placeholder="Password"/>
                  <Input type="password" placeholder="Retype password"/>
                  <SubmitButton type="submit">
                    <SubmitButtonIcon className="icon"/>
                    <span className="text">{submitButtonText}</span>
                  </SubmitButton>
                  <p tw="mt-6 text-xs text-gray-600 text-center">
                    I agree to abide by BookMyVenue's{" "}
                    <a href={tosUrl} tw="border-b border-gray-500 border-dotted">
                      Terms of Service
                    </a>{" "}
                    and its{" "}
                    <a href={privacyPolicyUrl} tw="border-b border-gray-500 border-dotted">
                      Privacy Policy
                    </a>
                  </p>

                  <p tw="mt-8 text-sm text-gray-600 text-center">
                    Already have an account?{" "}
                    <a href={signInUrl} tw="border-b border-gray-500 border-dotted">
                      Sign In
                    </a>
                  </p>
                </Form>
              </FormContainer>
            </MainContent>
          </MainContainer>
        </Content>
      </Container>
    </AnimatedContainer>
);
