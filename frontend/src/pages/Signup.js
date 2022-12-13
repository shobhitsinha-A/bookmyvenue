import React, { useEffect } from "react";
import AnimatedContainer from "../helpers/AnimatedContainer.js";
import {Container as ContainerBase} from "../components/layouts/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import signupPageBg from "../images/signup-bg.png";
import {ReactComponent as SignUpIcon} from "feather-icons/dist/icons/user-plus.svg";
import ReCAPTCHA from "react-google-recaptcha";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";

const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const SocialButtonsContainer = tw.div`flex flex-col items-center`;

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

const clientId = "931874802638-1fi5jqm3olebo9qonvmhb2mvf5g3t6r8.apps.googleusercontent.com";

let validateAndRegister = async (e) => {
  e.preventDefault();
  const f_name = document.getElementById("f_name").value;
  const l_name = document.getElementById("l_name").value;
  const email = document.getElementById("email").value;
  const m_number = document.getElementById("m_number").value;
  const u_name = document.getElementById("u_name").value;
  const pass = document.getElementById("pass").value;
  const c_pass = document.getElementById("c_pass").value;
  const roles = document.getElementsByName("role");
  let role = "USER"
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].checked) {
      role = roles[i].value;
    }
  }
  if (pass === c_pass) {
    let response = await fetch('https://bookmyvenue.live:5000/user/register', {
      method: 'POST',
      body: JSON.stringify({
        "first_name" : f_name,
        "last_name" : l_name,
        "email" : email,
        "phone_no" : m_number,
        "user_name" : u_name,
        "password" : pass,
        "role" : role
      })
    });
    let jsonResponse = await response.json();
    if (jsonResponse.status) {
      alert("User registered successfully");
      window.location.href = "/login";
    } else {
      alert("There was an error when creating your account");
    }
  } else {
    alert("Passwords don't match");
  }
}

export default () => {
  let navigate = useNavigate();
  useEffect(() => {
    const initClient = () => {
      gapi.auth2.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });
  const onSuccess = (res) => {
    navigate("/oauth", {
      state: {
        email: res.profileObj.email,
        l_name: res.profileObj.familyName,
        f_name: res.profileObj.givenName,
        u_name: res.profileObj.email,
      },
    });
  };
  const onFailure = (res) => {
    alert("Failed to sign up with Google");
  };
  const headingText = "Sign Up",
      signupPageBgSrc = signupPageBg,
      submitButtonText = "Sign Up",
      SubmitButtonIcon = SignUpIcon,
      tosUrl = "#",
      privacyPolicyUrl = "#",
      signInUrl = "/login";
  return (
      <AnimatedContainer>
        <Container>
          <Content>
            <MainContainer>
              <MainContent>
                <Heading>{headingText}</Heading>
                <FormContainer>
                  <SocialButtonsContainer>
                    <GoogleLogin
                        clientId={clientId}
                        buttonText="Sign up with Google"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy="single_host_origin"
                        style={{textAlign: 'center'}}
                        class="btn btn-primary"
                        theme="dark"
                    />
                  </SocialButtonsContainer>
                  <Form onSubmit={validateAndRegister}>
                    <Input id="f_name" type="text" placeholder="First Name"/>
                    <Input id="l_name" type="text" placeholder="Last Name"/>
                    <Input id="m_number"  type="text" placeholder="Mobile Number"/>
                    <Input id="email" type="email" placeholder="Email"/>
                    <Input id="u_name" type="text" placeholder="Username" />
                    <Input id="pass" type="password" placeholder="Password"/>
                    <Input id="c_pass" type="password" placeholder="Retype password"/>
                    <p>Select role:</p>
                    <input type="radio" id="user" name="role" value="USER"/>
                    <label htmlFor="user">User</label>
                    <br />
                    <input type="radio" id="host" name="role" value="HOST"/>
                    <label htmlFor="host">Venue Owner</label>
                    <SubmitButton type="submit">
                      <SubmitButtonIcon className="icon"/>
                      <span className="text">{submitButtonText}</span>
                    </SubmitButton>
                    <br />
                    <ReCAPTCHA sitekey="6Le4eVQiAAAAAN0T8QckutpehO_OhUpwM9IRnICW" />
                    <br />
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
                    <br />
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
            <IllustrationContainer>
              <IllustrationImage imageSrc={signupPageBgSrc} />
            </IllustrationContainer>
          </Content>
        </Container>
      </AnimatedContainer>
  );
}
