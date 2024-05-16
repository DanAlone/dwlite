import React, { useState, useEffect } from "react";
import { Menu, Segment, Icon, Modal, Button, Header, Transition } from 'semantic-ui-react';
import axios from 'axios';
import PostCall from "./postcall.js";
import CONF from '../config.json';
import getTime from './getTime.js';

function BoxPing({ name, handleError, handleRotate, hideMyModal, showMyModal, open_modal }) {

    const [pingOutput, setPingOutput] = useState(<Segment basic>Ping... <Icon name="circle notch" loading={true} /></Segment>);

    function Ping(i) {

        if (i.includes("@")) { i = i.split("@")[0] };

        const params = { 'ACTION': "SERVER_ONLY_PING", 'ITEM': i };
        const options = PostCall("checkItem", params);

        const DEBUG = CONF.DEBUG || 0;

        if (DEBUG) console.log(getTime(), "START PING: " + i);

        handleRotate("rotate");

        axios(options)
            .then((res) => {
                var response = res.data;

                if (response === undefined) {
                    handleError(true, "ERROR: no data available");
                } else if (response.ERROR !== undefined) {
                    handleError(true, response.ERROR);
                } else {
                    setPingOutput(response);
                }

                if (DEBUG) console.log(getTime(), response);
            })
            .catch(error => {
                handleError(true, "ERROR: " + error);
                if (DEBUG) console.log(getTime(), error);
            })
            .finally(e => {
                handleRotate("");

                if (DEBUG) console.log(getTime(), "STOP PING: " + i);
            });
    }

    useEffect(() => {
        Ping(name);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Transition.Group animation="scale" duration={300}>
            {(open_modal) ? <Modal
                className="mymodal"
                key={name}
                basic
                onClose={() => hideMyModal}
                onOpen={() => showMyModal}
                open={open_modal}
                size="mini"
                dimmer="blurring"
                style={{ marginLeft: '-12px' }}
            >
                <Icon className="close myblue" onClick={hideMyModal} />
                <Header as="h4" className="myblue">
                    <Icon name="terminal" /> PING {name}
                </Header>

                <Segment basic>
                    <Menu fluid inverted vertical>
                        <Menu.Item>
                            <div style={{ overflow: "auto" }} suppressContentEditableWarning="true" contentEditable="true"><pre>{pingOutput}</pre></div>
                        </Menu.Item>
                    </Menu>
                </Segment>
                <Modal.Actions style={{ textAlign: 'center' }}>
                    <Button basic color='blue' inverted onClick={hideMyModal}>
                        <Icon name='remove' /> Close
                    </Button>
                </Modal.Actions>
            </Modal>
            : null }
            </Transition.Group>
        </>
    )
}

export default BoxPing;