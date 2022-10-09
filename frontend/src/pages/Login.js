import React from "react";
import AnimatedContainer from "../helpers/AnimatedContainer.js";
import {Container as ContainerBase} from "../components/layouts/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import ReCAPTCHA from "react-google-recaptcha";
import appleIconImageSrc from "../images/apple-icon.png";
import googleIconImageSrc from "../images/google-icon.png";
import loginpageBg from "../images/login-bg.png";
import {ReactComponent as LoginIcon} from "feather-icons/dist/icons/log-in.svg";

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
const Input = tw.input`w-full max-w-xs py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }

  .text {
    ${tw`ml-3`}
  }
`;

const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;

let checkIfUserIsLoggedIn = async (e) => {
  e.preventDefault();
  let u_name = document.getElementById("u_name").value;
  let password = document.getElementById("password").value;
  let response = await fetch('http://localhost:5000/user/login', {
    method: 'POST',
    body: JSON.stringify({
      "user_name" : u_name,
      "password" : password,
      "role" : "USER"
    })
  });
  let jsonResponse = await response.json();
  if (jsonResponse.status) {
    window.location.href = "http://localhost:3000/profile";
  } else {
    alert("Please check your credentials and try again");
  }
}

export default ({
                  headingText = "Sign In",
                  loginPageBgSrc = loginpageBg,
                  socialButtons = [
                    {
                      iconImageSrc: appleIconImageSrc,
                      text: "Sign In With Apple",
                      url: "https://apple.com"

                    },
                    {
                      iconImageSrc: googleIconImageSrc,
                      text: "Sign In With Google",
                      url: "https://google.com"
                    }
                  ],
                  submitButtonText = "Sign In",
                  SubmitButtonIcon = LoginIcon,
                  forgotPasswordUrl = "#",
                  signupUrl = "/signup",

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
                <br />
                <Form onSubmit={checkIfUserIsLoggedIn}>
                  <Input id="u_name" type="text" placeholder="Username"/>
                  <Input id="password" type="password" placeholder="Password"/>
                  <SubmitButton type="submit">
                    <SubmitButtonIcon className="icon"/>
                    <span className="text">{submitButtonText}</span>
                  </SubmitButton>
                  <br />
                  <ReCAPTCHA sitekey="6Le4eVQiAAAAAN0T8QckutpehO_OhUpwM9IRnICW" />
                  <br />
                  <p tw="mt-6 text-xs text-gray-600 text-center">
                    <a href={forgotPasswordUrl} tw="border-b border-gray-500 border-dotted">
                      Forgot Password?
                    </a>
                  </p>
                  <p tw="mt-8 text-sm text-gray-600 text-center">
                    Don't have an account?{" "}
                    <a href={signupUrl} tw="border-b border-gray-500 border-dotted">
                      Sign Up
                    </a>
                  </p>
                </Form>


              </FormContainer>
            </MainContent>
          </MainContainer>
          <IllustrationContainer>
            <IllustrationImage imageSrc={loginPageBgSrc} />
          </IllustrationContainer>
        </Content>
      </Container>
    </AnimatedContainer>
);
