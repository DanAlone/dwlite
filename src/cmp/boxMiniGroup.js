import React, { useState, useEffect } from "react";
import { Segment, Grid } from 'semantic-ui-react';
import BoxMini from "./boxMini";
import axios from 'axios';
import CONF from '../config.json';
import PostCall from './postcall.js';
import GetInfoItem from './GetInfoItem.js';
import getTime from './getTime.js';

function BoxMiniGroup({ id, handleError, backToLogin, handleRotate }) {

    const [boxMiniDMZ, setBoxMiniDMZ] = useState([]);
    const [boxMiniLAN, setBoxMiniLAN] = useState([]);

    const DEBUG = CONF.DEBUG || 0;

    function getBoxMini(i) {

        const params = { 'ACTION': "LIST_DETAIL", 'ID': i };
        const options = PostCall("items", params);

        handleRotate("rotate");

        var myBox = [];

        setBoxMiniDMZ([]);
        setBoxMiniLAN([]);

        axios(options)
            .then((res) => {
                (res.data.results !== undefined) ? myBox = res.data.results.filter(function (i) { return i.name !== "NAME_ALL_ITEMS" }) : myBox.push({ "ERROR": "no data available" })

                var color = "";
                var icon = "";
                var error = false;

                myBox.forEach((item) => {
                    if (item.ERROR) {
                        handleError(true, "ERROR: " + item.ERROR);
                        error = true;
                    } else {
                        handleError(false);
                    }

                    color = GetInfoItem("color", item.Status);
                    icon = GetInfoItem("icon", item.role);
                    item.Status_color = color;
                    item.Icon = icon;
                }); // end forEach

                if (!error) setBoxMiniDMZ(myBox.filter(function (box) { return box.role.includes("dmz"); }));
                if (!error) setBoxMiniLAN(myBox.filter(function (box) { return !box.role.includes("dmz"); }));

                if (DEBUG) console.log(getTime(), res.data.results);
            })
            .catch(error => {
                handleError(true, "" + error);
                if (DEBUG) console.log(getTime(), error);
            })
            .finally(e => {
                handleRotate("");
            });
    };

    useEffect(() => {
        getBoxMini(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {(boxMiniDMZ.length !== 0) ?
                <Grid.Row style={{ padding: '0px' }}>
                    <Grid.Column align="center">
                        <Segment className="segbmini dmz" basic>
                            <div className="lbl_bmini myblue">DMZ</div>
                        
                            {(boxMiniDMZ || []).map((box) => (
                                <BoxMini
                                    key={box.Id_detail}
                                    area={box.Area}
                                    codename={box.CodeName}
                                    icon={box.Icon}
                                    id={box.Id}
                                    id_detail={box.Id_detail}
                                    status={box.Status}
                                    status_color={box.Status_color}
                                    status_rsp={box.Status_rsp}
                                    status_txt={box.Status_txt}
                                    status_disabled={box.disabled}
                                    subarea={box.SubArea}
                                    timestamp={box.Timestamp}
                                    checkstatus={box.checkstatus}
                                    code={box.code}
                                    description={box.description}
                                    disabled={box.disabled}
                                    env={box.env}
                                    ipaddress={box.ipaddress}
                                    name={box.name}
                                    nettier={box.nettier}
                                    profile={box.profile}
                                    role={box.role}
                                    type={box.type}
                                    backToLogin={backToLogin}
                                    handleError={handleError}
                                    handleRotate={handleRotate}
                                />
                            ))}
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                : null}
            <p></p>
            {(boxMiniLAN.length !== 0) ?
                <Grid.Row style={{ padding: '0px' }}>
                    <Grid.Column align="center">
                        <Segment className="segbmini" basic>
                        <div className="lbl_bmini myblue">LAN</div>
                            {(boxMiniLAN || []).map((box) => (
                                <BoxMini
                                    key={box.Id_detail}
                                    area={box.Area}
                                    codename={box.CodeName}
                                    icon={box.Icon}
                                    id={box.Id}
                                    id_detail={box.Id_detail}
                                    status={box.Status}
                                    status_color={box.Status_color}
                                    status_rsp={box.Status_rsp}
                                    status_txt={box.Status_txt}
                                    status_disabled={box.disabled}
                                    subarea={box.SubArea}
                                    timestamp={box.Timestamp}
                                    checkstatus={box.checkstatus}
                                    code={box.code}
                                    description={box.description}
                                    disabled={box.disabled}
                                    env={box.env}
                                    ipaddress={box.ipaddress}
                                    name={box.name}
                                    nettier={box.nettier}
                                    profile={box.profile}
                                    role={box.role}
                                    type={box.type}
                                    backToLogin={backToLogin}
                                    handleError={handleError}
                                    handleRotate={handleRotate}
                                />
                            ))}
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                : null}
        </>
    )
}

export default BoxMiniGroup;