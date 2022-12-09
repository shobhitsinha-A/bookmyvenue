import React from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBTypography,
    MDBInputGroup
} from "mdb-react-ui-kit";

export default function Chat() {
    return (
        <MDBContainer fluid className="py-5">
            <MDBRow>
                <MDBCol md="12">
                    <MDBCard id="chat3" style={{ borderRadius: "15px" }}>
                        <MDBCardBody>
                            <MDBRow>
                                <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
                                    <div className="p-3">
                                        <MDBInputGroup className="rounded mb-3">
                                            <input
                                                className="form-control rounded"
                                                placeholder="Search"
                                                type="search"
                                            />
                                            <span
                                                className="input-group-text border-0"
                                                id="search-addon"
                                            >
                        <MDBIcon fas icon="search" />
                      </span>
                                        </MDBInputGroup>
                                        <MDBTypography listUnStyled className="mb-0">
                                            <li className="p-2 border-bottom">
                                                <a
                                                    href="#"
                                                    className="d-flex justify-content-between"
                                                >
                                                    <div className="d-flex flex-row">
                                                        <div className="pt-1">
                                                            <p className="fw-bold mb-0">Marie Horwitz</p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="p-2 border-bottom">
                                                <a
                                                    href="#"
                                                    className="d-flex justify-content-between"
                                                >
                                                    <div className="d-flex flex-row">
                                                        <div className="pt-1">
                                                            <p className="fw-bold mb-0">Alexa Chung</p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="p-2 border-bottom">
                                                <a
                                                    href="#"
                                                    className="d-flex justify-content-between"
                                                >
                                                    <div className="d-flex flex-row">
                                                        <div className="pt-1">
                                                            <p className="fw-bold mb-0">Danny McChain</p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="p-2 border-bottom">
                                                <a
                                                    href="#"
                                                    className="d-flex justify-content-between"
                                                >
                                                    <div className="d-flex flex-row">
                                                        <div className="pt-1">
                                                            <p className="fw-bold mb-0">Ashley Olsen</p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="p-2 border-bottom">
                                                <a
                                                    href="#"
                                                    className="d-flex justify-content-between"
                                                >
                                                    <div className="d-flex flex-row">
                                                        <div className="pt-1">
                                                            <p className="fw-bold mb-0">Kate Moss</p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="p-2">
                                                <a
                                                    href="#"
                                                    className="d-flex justify-content-between"
                                                >
                                                    <div className="d-flex flex-row">
                                                        <div className="pt-1">
                                                            <p className="fw-bold mb-0">Ben Smith</p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                        </MDBTypography>
                                    </div>
                                </MDBCol>
                                <MDBCol md="6" lg="7" xl="8">
                                    <div className="d-flex flex-row justify-content-start">
                                        <div>
                                            <p
                                                className="small p-2 ms-3 mb-1 rounded-3"
                                                style={{ backgroundColor: "#f5f6f7" }}
                                            >
                                                Lorem ipsum dolor sit amet, consectetur adipiscing
                                                elit, sed do eiusmod tempor incididunt ut labore et
                                                dolore magna aliqua.
                                            </p>
                                            <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                                                12:00 PM | Aug 13
                                            </p>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-row justify-content-end">
                                        <div>
                                            <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                                Ut enim ad minim veniam, quis nostrud exercitation
                                                ullamco laboris nisi ut aliquip ex ea commodo
                                                consequat.
                                            </p>
                                            <p className="small me-3 mb-3 rounded-3 text-muted">
                                                12:00 PM | Aug 13
                                            </p>
                                        </div>

                                    </div>

                                    <div className="d-flex flex-row justify-content-start">

                                        <div>
                                            <p
                                                className="small p-2 ms-3 mb-1 rounded-3"
                                                style={{ backgroundColor: "#f5f6f7" }}
                                            >
                                                Duis aute irure dolor in reprehenderit in voluptate
                                                velit esse cillum dolore eu fugiat nulla pariatur.
                                            </p>
                                            <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                                                12:00 PM | Aug 13
                                            </p>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-row justify-content-end">
                                        <div>
                                            <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                                Excepteur sint occaecat cupidatat non proident, sunt
                                                in culpa qui officia deserunt mollit anim id est
                                                laborum.
                                            </p>
                                            <p className="small me-3 mb-3 rounded-3 text-muted">
                                                12:00 PM | Aug 13
                                            </p>
                                        </div>

                                    </div>

                                    <div className="d-flex flex-row justify-content-start">

                                        <div>
                                            <p
                                                className="small p-2 ms-3 mb-1 rounded-3"
                                                style={{ backgroundColor: "#f5f6f7" }}
                                            >
                                                Sed ut perspiciatis unde omnis iste natus error sit
                                                voluptatem accusantium doloremque laudantium, totam
                                                rem aperiam, eaque ipsa quae ab illo inventore
                                                veritatis et quasi architecto beatae vitae dicta sunt
                                                explicabo.
                                            </p>
                                            <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                                                12:00 PM | Aug 13
                                            </p>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-row justify-content-end">
                                        <div>
                                            <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                                Nemo enim ipsam voluptatem quia voluptas sit
                                                aspernatur aut odit aut fugit, sed quia consequuntur
                                                magni dolores eos qui ratione voluptatem sequi
                                                nesciunt.
                                            </p>
                                            <p className="small me-3 mb-3 rounded-3 text-muted">
                                                12:00 PM | Aug 13
                                            </p>
                                        </div>

                                    </div>

                                    <div className="d-flex flex-row justify-content-start">

                                        <div>
                                            <p
                                                className="small p-2 ms-3 mb-1 rounded-3"
                                                style={{ backgroundColor: "#f5f6f7" }}
                                            >
                                                Neque porro quisquam est, qui dolorem ipsum quia dolor
                                                sit amet, consectetur, adipisci velit, sed quia non
                                                numquam eius modi tempora incidunt ut labore et dolore
                                                magnam aliquam quaerat voluptatem.
                                            </p>
                                            <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                                                12:00 PM | Aug 13
                                            </p>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-row justify-content-end">
                                        <div>
                                            <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                                Ut enim ad minima veniam, quis nostrum exercitationem
                                                ullam corporis suscipit laboriosam, nisi ut aliquid ex
                                                ea commodi consequatur?
                                            </p>
                                            <p className="small me-3 mb-3 rounded-3 text-muted">
                                                12:00 PM | Aug 13
                                            </p>
                                        </div>

                                    </div>

                                    <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">

                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            id="exampleFormControlInput2"
                                            placeholder="Type message"
                                        />
                                        <a className="ms-1 text-muted" href="#">
                                            <MDBIcon fas icon="paperclip" />
                                        </a>
                                        <a className="ms-3 text-muted" href="#">
                                            <MDBIcon fas icon="smile" />
                                        </a>
                                        <a className="ms-3" href="#">
                                            <MDBIcon fas icon="paper-plane" />
                                        </a>
                                    </div>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}