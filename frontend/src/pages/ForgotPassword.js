import React from "react";
import AnimatedContainer from "../helpers/AnimatedContainer.js";
import {Container as ContainerBase} from "../components/layouts/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import ReCAPTCHA from "react-google-recaptcha";
import loginpageBg from "../images/login-bg.png";
import {ReactComponent as LoginIcon} from "feather-icons/dist/icons/log-in.svg";

const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

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

let checkIfUserExists = async (e) => {
    e.preventDefault();
    let u_name = document.getElementById("u_name").value;
    let email = document.getElementById("email").value;
    let response = await fetch('https://bookmyvenue.live:5000/user/profile/details/'.concat(u_name), {
        method: 'GET'
    });
    let jsonResponse = await response.json();
    if (jsonResponse.status) {
        if (jsonResponse.data.user.length > 0) {
            let userDetails = jsonResponse.data.user[0];
            if (userDetails.email === email) {
                sessionStorage.setItem("user_name", userDetails.user_name);
                window.location.href = "/newpassword";
            } else {
                alert("E-mail address doesn't match. Please try again");
            }
        } else {
            alert("User not found. Please try again");
        }
    } else {
        alert("We've encountered an unexpected error. Please try again later.");
    }
}

export default ({
                    headingText = "Forgot Password",
                    loginPageBgSrc = loginpageBg,
                    submitButtonText = "Continue",
                    SubmitButtonIcon = LoginIcon

                }) => (
    <AnimatedContainer>
        <Container>
            <Content>
                <MainContainer>
                    <MainContent>
                        <Heading>{headingText}</Heading>
                        <FormContainer>
                            <Form onSubmit={checkIfUserExists}>
                                <Input id="u_name" type="text" placeholder="Username"/>
                                <Input id="email" type="text" placeholder="E-mail address"/>
                                <SubmitButton type="submit">
                                    <SubmitButtonIcon className="icon"/>
                                    <span className="text">{submitButtonText}</span>
                                </SubmitButton>
                                <br />
                                <ReCAPTCHA sitekey="6Le4eVQiAAAAAN0T8QckutpehO_OhUpwM9IRnICW" />
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
