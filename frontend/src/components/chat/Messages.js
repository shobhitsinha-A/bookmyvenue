import React, {useState, useEffect, useCallback} from 'react';
import {MDBIcon} from "mdb-react-ui-kit";
import moment from "moment";

export default (props) => {
    const [chats, setChats] = useState([]);
    async function getChatsBetweenUsers(fromUser, toUser) {
        let response = await fetch('https://bookmyvenue.live:6969/chats/' + fromUser + '/' + toUser, {
            method: 'GET'
        });
        let jsonResponse = await response.json();
        if (jsonResponse.status) {
            setChats(jsonResponse.data.details.chats);
        }
    }
    const updateChatStatus = useCallback(async (fromUser, toUser) => {
        let response = await fetch('https://bookmyvenue.live:6969/chats/status', {
            method: 'PUT',
            body: JSON.stringify({
                from_user: fromUser,
                to_user: toUser,
                status: 'READ'
            })
        });
        let jsonResponse = await response.json();
        if (jsonResponse.status) {
            getChatsBetweenUsers(fromUser, toUser).catch(console.error);
        }
    }, []);

    useEffect(() => {
        updateChatStatus(props.fromUser, props.toUser).catch(console.error);
        //getChatsBetweenUsers(props.fromUser, props.toUser).catch(console.error);
    }, [updateChatStatus, props.fromUser, props.toUser]);
    async function sendChat(fromUser, toUser, message) {
        let response = await fetch('https://bookmyvenue.live:6969/chats', {
            method: 'POST',
            body: JSON.stringify({
                from_user: fromUser,
                to_user: toUser,
                message: message,
                time: moment().toISOString(),
                status: 'DELIVERED'
            })
        });
        let jsonResponse = await response.json();
        if (jsonResponse.status) {
            getChatsBetweenUsers(fromUser, toUser).catch(console.error);
        }
    }
    function checkIfChatIsLast(chats, chat) {
        return chats.indexOf(chat) === chats.length - 1
    }
    return(
        <div>
            <div className="d-flex flex-row mb-4">
                <div className="pt-1">
                    <p className="fw-bold mb-0">{props.toUser}</p>
                </div>
            </div>
            {chats.map(chat => {
                if (chat.to_user === props.fromUser) {
                    return(
                        <div className="d-flex flex-row justify-content-start">
                            <div>
                                <p
                                    className="small p-2 ms-3 mb-1 rounded-3"
                                    style={{ backgroundColor: "#f5f6f7" }}
                                >
                                    {chat.message}
                                </p>
                                <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                                    {moment(chat.time).format("hh:mm a MMM Do")}
                                </p>
                            </div>
                        </div>
                    );
                } else {
                    return(
                        <div className="d-flex flex-row justify-content-end">
                            <div>
                                <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                    {chat.message}
                                </p>
                                <p className="small me-3 mb-3 rounded-3 text-muted">
                                    {moment(chat.time).format("hh:mm a MMM Do")}
                                </p>
                                {checkIfChatIsLast(chats, chat) ?
                                    <div>
                                        <div className="d-flex justify-content-end mr-4">
                                            {chat.status}
                                        </div>
                                    </div> : null
                                }
                            </div>
                        </div>
                    );
                }
            })}
            <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    id="chat-message"
                    placeholder="Type message"
                />
                <div onClick={() => sendChat(props.fromUser, props.toUser, document.getElementById('chat-message').value)}>
                    <a className="ms-3" href="#">
                        <MDBIcon fas icon="paper-plane" />
                    </a>
                </div>
            </div>
        </div>
    );
}