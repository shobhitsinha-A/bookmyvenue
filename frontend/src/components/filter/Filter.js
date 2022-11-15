import React from "react";
import tw from "twin.macro";

const FormContainer = tw.div`w-full flex-1 mt-8`;
const Form = tw.form`mx-auto max-w-xs`;

export default () => {
    return (
        <FormContainer>
            <Form>
                <p>Location</p>
                <input type="checkbox"/><span>&nbsp;Bloomington, IN</span>
            </Form>
        </FormContainer>
    )
}