import React, {useState, useEffect} from "react";
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
import Messages from './Messages';

export default function Chat() {
    const [users, setUsers] = useState([]);
    const [toUser, setToUser] = useState();
    useEffect(() => {
        async function getChatUsers() {
            let response = await fetch('https://bookmyvenue.live:6969/chats/' + sessionStorage.getItem('user_name'), {
                method: 'GET'
            });
            let jsonResponse = await response.json();
            if (jsonResponse.status) {
                setUsers(jsonResponse.data.details.chatUsers);
            }
        }
        getChatUsers().catch(console.error);
    }, []);
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
                                            {users.map(user => {
                                                if (users.indexOf(user) !== users.length - 1) {
                                                    return(
                                                        <div onClick={() => setToUser(user.user)}>
                                                            <li className="p-2 border-bottom">
                                                                <a
                                                                    href="#"
                                                                    className="d-flex justify-content-between"
                                                                >
                                                                    <div className="d-flex flex-row">
                                                                        <div className="pt-1">
                                                                            <p className="fw-bold mb-0">{user.user}</p>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                        </div>
                                                    );
                                                } else {
                                                    return(
                                                        <div onClick={() => setToUser(user.user)}>
                                                            <li className="p-2">
                                                                <a
                                                                    href="#"
                                                                    className="d-flex justify-content-between"
                                                                >
                                                                    <div className="d-flex flex-row">
                                                                        <div className="pt-1">
                                                                            <p className="fw-bold mb-0">{user.user}</p>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                        </div>
                                                    );
                                                }
                                            })}
                                        </MDBTypography>
                                    </div>
                                </MDBCol>
                                <MDBCol md="6" lg="7" xl="8">
                                    <Messages fromUser={sessionStorage.getItem('user_name')} toUser={toUser} />
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}