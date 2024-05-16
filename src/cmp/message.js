import React from "react";
import {
    Icon,
    Header,
    Message,
    Modal,
    Button
} from 'semantic-ui-react';
import { Link } from "react-router-dom";

function MSG({ type, msg, showModal, backToLogin, open }) {

    var color = "red";
    var title = "Error";
    var onlylogin = false;
    var msgDisplay = msg;
  
    switch (type) {
        case "error":
            if (msg.indexOf("DB:") !== -1) {
                type = "database";
                title = "Database";
            } else if ((msg.indexOf("Network") !== -1) || (msg.indexOf("timeout") !== -1)){
                type = "bolt";
                title = "Network";
                msgDisplay = msg.replace("000ms","s");
            } else if (msg.indexOf("token") !== -1) {
                type = "ban";
                title = "Token";
                onlylogin = true;
            } else {
                type = "bug";
            }
            break;
        case "info":
            color = "grey";
            type = "info circle";
            title = "Information"
            break;
        default: break;
    }
   
    return (
        <>
            <Modal
                open={open}
                basic
                size="mini"
            >
            <Header icon>
                <Icon name={type} color={color} /> 
                {title} 
            </Header>
                <div style={{textAlign: 'center'}}>
                <Message compact color={color} align="center">
                    {msgDisplay}
                </Message>
                </div>
            <Modal.Actions style={{ textAlign: 'center' }}>
                    {(!onlylogin) ?
                        <Button color='blue' basic inverted onClick={() => showModal(false)}>
                            <Icon name='remove' /> Close
                        </Button>
                        : null
                    }
                    <Link to="/login">
                        <Button color='red' basic inverted onClick={() => backToLogin()}>
                            <Icon name='sign-in' /> Login
                        </Button>
                    </Link>
                </Modal.Actions>
            </Modal>
        </>
    )
}

export default MSG;