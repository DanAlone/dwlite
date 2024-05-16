import React, { useState, useEffect } from "react";
import { Transition, Icon, Dimmer, Modal, Button, Loader, Segment } from 'semantic-ui-react';
import BoxUpdate from "./boxUpdate.js";
import axios from 'axios';
import PostCall from "./postcall.js";
import GetInfoItem from "./GetInfoItem.js";
import CONF from '../config.json';
import getTime from './getTime.js';
import BoxDetail from "./box_detail";

function Box({ handleSetLabelProgress, handleUpdated, handleStopUpdateAll, UpdateAll, PARENT, area, codename, icon, id, id_detail, status, status_color, status_rsp, status_txt, status_disabled, subarea, timestamp, checkstatus, code, description, disabled, env, ipaddress, name, nettier, profile, role, type, ACTION, getBox, invertedStyle, handleRotate, handleError, Refresh, onUpdateItem, updating }) {

    const [transClick, setTransClick] = useState(true);
    const [transUpd, setTransUpd] = useState(true);
    const handleTransClick = () => { setTransClick(false) };
    const handleTransUpd = () => { setTransUpd(false) };

    const [open_modal, setOpen_modal] = useState(false);
    const showMyModal = () => { setOpen_modal(true); handleTransClick(false) }
    const hideMyModal = () => { setOpen_modal(false); }
    const DEBUG = CONF.DEBUG || 0;

    const [upd, setUPD] = useState(updating);
    const [updButton, setUpdButton] = useState(false);

    var LABELNAME = "";

    const [ iconServer, setIconServer ] = useState("");

    function Update(i) {
        hideMyModal();

        const params = { 'ACTION': "UPDATE", 'ID': i };
        const options = PostCall("itemsUpd", params);

        if (DEBUG) console.log(getTime(), "START UPDATE: " + i);

        handleRotate("rotate");
        setUPD(true);

        axios(options)
            .then((res) => {

                var response = res.data.results[0];

                if (response === undefined) {
                    handleError(true, "ERROR: no data available");
                } else if (response.ERROR !== undefined) {
                    handleError(true, response.ERROR);
                } else {
                    if (ACTION === "LIST") {
                        var color = GetInfoItem("color", response.Status);
                        response.Status_color = color;
                        onUpdateItem(response.Id, response);
                        LABELNAME = response.CodeName + " " + response.env + " [" + response.updated + "]";
                    } else {
                        getBox();
                    }
                }

                if (DEBUG) console.log(getTime(), response);
            })
            .catch(error => {
                handleError(true, "ERROR: " + error);
                if (DEBUG) console.log(getTime(), error);
            })
            .finally(e => {
                handleRotate("");
                setUPD(false);
                handleTransUpd(false);

                if (UpdateAll) {
                    handleStopUpdateAll();
                    handleUpdated();
                    handleSetLabelProgress("" + LABELNAME);
                    if (DEBUG) console.log(getTime(), "LABEL: " + LABELNAME);
                };

                if (DEBUG) console.log(getTime(), "STOP UPDATE: " + i);
            });
    }

    useEffect(() => {
        if ((disabled !== undefined) && (disabled !== "")) {
            setUpdButton(true);
        }
        if ((checkstatus !== "") && (checkstatus !== undefined)) {
            setUPD(true);
        } else {
            setUPD(false);
        }

        if ((type !== undefined) && (type).includes("SERVER")) {
            setIconServer(GetInfoItem("type", type))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (UpdateAll === true) { Update(id); };
        return () => {
            handleStopUpdateAll();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [UpdateAll]);

    useEffect(() => {
        if ((checkstatus !== "") && (checkstatus !== undefined)) {
            setUPD(true);
        } else {
            setUPD(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkstatus]);


    return (
        <>
            <Transition.Group animation="scale" duration={300}>
                {(open_modal) ? <Modal
                    key={id_detail}
                    onClose={() => hideMyModal}
                    onOpen={() => showMyModal}
                    open={open_modal}
                    size="tiny"
                    basic
                    dimmer="blurring"
                    style={{ marginLeft: '-12px' }}
                    className="mymodal2"
                >
                    <Icon className="close myblue" onClick={hideMyModal} />

                    {(ACTION === "LIST") ?
                    <BoxUpdate
                        area={area}
                        codename={codename}
                        icon={icon}
                        id={id}
                        id_detail={id_detail}
                        status={status}
                        status_color={status_color}
                        status_rsp={status_rsp}
                        status_txt={status_txt}
                        status_disabled={status_disabled}
                        subarea={subarea}
                        timestamp={timestamp}
                        checkstatus={checkstatus}
                        code={code}
                        description={description}
                        disabled={disabled}
                        env={env}
                        ipaddress={ipaddress}
                        name={name}
                        nettier={nettier}
                        profile={profile}
                        role={role}
                        type={type}
                        getBox={getBox}
                        handleRotate={handleRotate}
                        handleError={handleError}
                        onUpdateItem={onUpdateItem}
                    />
                    : 
                    <BoxDetail
                        id={id}
                        area={area}
                        subarea={subarea}
                        status={status}
                        env={env}
                        status_rsp={status_rsp}
                        status_txt={status_txt}
                        timestamp={timestamp}
                        codename={codename}
                        code={code}
                        status_color={status_color}
                        status_disabled={status_disabled}
                        description={description}
                        disabled={disabled}
                        ipaddress={ipaddress}
                        profile={profile}
                        name={name}
                        type={type}
                        role={role}
                        icon={icon}
                        iconServer={iconServer}
                        handleError={handleError}
                        handleRotate={handleRotate}
                    />
                    }

                    <Modal.Actions style={{ textAlign: 'center' }}>
                        <Button basic color='red' inverted onClick={hideMyModal}>
                            <Icon name='remove' /> Cancel
                        </Button>
                        <Button basic color='blue' disabled={updButton} inverted onClick={() => Update(id)}>
                            <Icon name='refresh' /> Update
                        </Button>
                    </Modal.Actions>
                </Modal>
                    : null}
            </Transition.Group>

            {(PARENT === "BOXGROUP") ?
                <Transition visible={transUpd} animation="jiggle" duration={500}>
                    <div className="ui basic segment left floated">
                        <Transition visible={transClick} animation="pulse" duration={200}>
                            <div id={id_detail} onClick={showMyModal} className={"ui button box " + (invertedStyle) + " " + (status_color || "")}>
                                <div>{codename}
                                    {(ACTION === "LIST") ? <div className="status_rsp">{status_rsp}</div> : null}
                                    {(ACTION === "LIST_DETAIL") ? <><div className="nowrap lbl_detail xsmall">{name}</div><div><Icon style={{ opacity: 0.4 }} name={icon} size="large" /></div></> : null}
                                </div>
                                <div className="container_date">
                                    <div attribute="boxtimestamp" className='timestamp'>
                                        {env}<br></br>{timestamp}
                                    </div>
                                </div>
                                <Dimmer active={upd} style={{ padding: '0px', margin: '0px', borderRadius: '10px', opacity: 0.8 }} className="ui dimmer box" >
                                    <Loader>Updating...</Loader>
                                </Dimmer>
                            </div>
                        </Transition>

                    </div>
                </Transition>
                : <>
                    <Segment size="mini" basic style={{ padding: '0px', margin: '0px', borderRadius: '5px' }}>
                        <Icon color={status_color} name="circle" size="large" onClick={showMyModal} className="link">
                            <div style={{ display: 'none' }}>[{status}] {status_txt}</div>
                        </Icon>
                        <Dimmer size="mini" active={upd} style={{ padding: '0px', borderRadius: '5px', opacity: 0.6 }}>
                            <Loader size="mini" inline></Loader>
                        </Dimmer>
                    </Segment>
                </>
            }
        </>
    )
}

export default Box;