import React from 'react';
import { useState, useEffect } from 'react';
import BoxGroup from './BoxGroup.js';
import {
    Icon,
    Button,
    Popup,
    Menu,
    Modal,
    Message,
    Header,
    Segment,
    Progress
} from 'semantic-ui-react';
import PKG from '../../package.json';
import TableBox from './TableBox.js';
import CONF from '../config.json';
import PostCall from './postcall.js';
import GetInfoItem from './GetInfoItem.js';
import getTime from './getTime.js';
import axios from 'axios';
import Holdable from './Holdable.js';

function BoxContainer({ handleOpenDimmer, handleCloseDimmer, search, showexport, getData, ACTION, handleDate, handleRotate, handleError, inverted, invertedStyle, Refresh, VIEW, handleExpandItem, viewdisabled, viewnoitems }) {

    const S_FILTER = localStorage.getItem("DWLITE_STATUS") || "";
    const DWLITE_FILTER = localStorage.getItem("DWLITE_FILTER") || "";

    const [loading, setLoading] = useState(false);
    const handleLoading = (l) => setLoading(l);

    const [status_filter, setStatusFilter] = useState(S_FILTER);
    const handleStatusFilter = (s) => {
        setStatusFilter(s);
        localStorage.setItem("DWLITE_STATUS", s);
    };

    const [ok, setOK] = useState(0);
    const [ko, setKO] = useState(0);
    const [old, setOLD] = useState(0);
    const [partial, setPARTIAL] = useState(0);
    const [disabled, setDISABLED] = useState(0);
    const [total, setTOTAL] = useState(0);

    const handleOK = (o) => { setOK(o); }
    const handleKO = (o) => { setKO(o); }
    const handleOLD = (o) => { setOLD(o); }
    const handlePARTIAL = (o) => { setPARTIAL(o); }
    const handleDISABLED = (o) => { setDISABLED(o); }
    const handleTOTAL = (o) => { setTOTAL(o); }

    const DEBUG = CONF.DEBUG || 0;

    const [updating, setUpdating] = useState(false);
    const handleSetUpdating = () => setUpdating(true);
    const handleUnsetUpdating = () => setUpdating(false);

    const [boxs, setBox] = useState([]);

    var myBox = [];
    var myBox_all = [];

    const handleInitArray = (m) => {
        setBox(m);
    };

    const CountStatus = (arr) => {
        var ok = 0;
        var ko = 0;
        var partial = 0;
        var disabled = 0;
        var old = 0;
        var total = 0;

        arr.forEach((item) => {
            switch (item.Status) {
                case "old": old++; break;
                case "ok": ok++; break;
                case "ko": ko++; break;
                case "partial": partial++; break;
                case "disabled": disabled++; break;
                default: break;
            }

            total++;
        });

        handleOK(ok);
        handleKO(ko);
        handleOLD(old);
        handlePARTIAL(partial);
        handleDISABLED(disabled);
        handleTOTAL(total);
    }

    function getBox(d) {
        const params = { 'ACTION': ACTION, 'MAIN_SELECT': DWLITE_FILTER };
        const options = PostCall("items", params);

        handleLoading(true);
        handleDate();
        handleRotate("rotate");

        if (d) { handleOpenDimmer(); };

        myBox = [];
        myBox_all = [];

        axios(options)
            .then((res) => {
                (res.data.results !== undefined) ? myBox_all = res.data.results : myBox_all.push({ "ERROR": "no data available" })

                var color = "";
                var order = "";

                myBox_all.forEach((item) => {
                    if (item.ERROR) {
                        handleError(true, "ERROR: " + item.ERROR);
                    } else {
                        handleError(false);
                    }

                    if ((!viewdisabled) && (item.Status === "disabled")) {
                        return;
                    }

                    if ((!viewnoitems) && (item.Status === "noitems")) {
                        return;
                    }

                    color = GetInfoItem("color", item.Status);
                    order = GetInfoItem("order", item.Status);
                    item.Status_color = color;
                    item.Order = order;

                    if ((ACTION === "LIST") || ((item.name !== "NAME_ALL_ITEMS") && (ACTION === "LIST_DETAIL"))) {
                        if ((item.name !== "NAME_ALL_ITEMS") && (ACTION === "LIST_DETAIL")) {
                            item.Icon = GetInfoItem("icon", item.role);
                        }

                        myBox.push(item);
                    }

                    if ((item.checkstatus !== "") && (item.checkstatus !== undefined)) {
                        console.log("BOX_CONTAINER [UPDATE]: " + item.CodeName, item.checkstatus);
                        handleSetUpdating();
                    } else {
                        handleUnsetUpdating();
                    }
                }); // end forEach

                handleInitArray(myBox);
                CountStatus(myBox);

                if (DEBUG) console.log(getTime(), res.data.results);
            })
            .catch(error => {
                handleError(true, "ERROR: " + error);
                if (DEBUG) console.log(getTime(), error);
            })
            .finally(e => {
                handleRotate("");
                handleLoading(false);
                if (d) { handleCloseDimmer(); };
            });
    };

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const handleButtonDisabled = (s) => setButtonDisabled(s);

    const [open_modal, setOpen_modal] = useState(false);
    const showMyModal = () => {
        setOpen_modal(true);
        setUpdated(0);
        handleButtonDisabled(false);
        handleSetLabelProgress("");
    }

    const hideMyModal = () => { setOpen_modal(false); handleButtonDisabled(false); }

    const [UpdateAll, callUpdateAll] = useState(false);
    const handleUpdateAll = () => { callUpdateAll(true); };
    const handleStopUpdateAll = () => callUpdateAll(false);

    const [updated, setUpdated] = useState(0);
    const handleUpdated = () => { setUpdated(prev => prev +1)};
    
    const [labelProgress, setLabelProgress] = useState("");
    const handleSetLabelProgress = (s) => { setLabelProgress(s) };



    function onClick(evt) {
        // console.log("CLICK");
        getBox(true);
    }

    function onHold(evt) {
        // console.log("HOLD");
        if (ACTION === "LIST") { showMyModal() };
    }

    useEffect(() => {
        if ((updated < boxs.length) && (updated !== 0)) {
            handleButtonDisabled(true);
        } else {
            handleButtonDisabled(false);
            if (updated !== 0) {
                handleSetLabelProgress("Completed!");
                getBox();
            }
        }
        return () => {
            handleButtonDisabled(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updated]);

    useEffect(() => {
        (getData === 0) ? getBox(true) : getBox();
        handleExpandItem(true);
        const id = setInterval(getBox, CONF.REFRESH_PAGE || 60000);
        return () => {
            clearInterval(id);
            handleExpandItem(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getData]);

    return (
        <>
            <Modal
                onClose={() => hideMyModal}
                onOpen={() => showMyModal}
                open={open_modal}
                size="mini"
                basic
                // dimmer="blurring"
                style={{ marginLeft: '-12px' }}
                className="mymodal2"
            >
                <Header>Update ALL [#{boxs.length}]</Header>

                <Segment basic>
                    <Message info style={{backgroundColor: "#ecf0f1" }}>
                        <Message.Content>
                            <Message.Header>Are you sure?</Message.Header>
                            this may take a few minutes
                            <p></p>
                            <Progress progress="value" value={updated} total={boxs.length} indicating autoSuccess>
                                <span style={{ fontSize: '0.8em' }}>{labelProgress}</span>
                            </Progress>
                        </Message.Content>
                    </Message>
                </Segment>

                <Modal.Actions style={{ textAlign: 'center' }}>
                    <Button basic color='blue' inverted onClick={hideMyModal} disabled={buttonDisabled} >
                        <Icon name='remove' /> Close
                    </Button>
                    <Button basic color='red' inverted onClick={handleUpdateAll} disabled={buttonDisabled}>
                        <Icon name='refresh' /> Update
                    </Button>
                </Modal.Actions>
            </Modal>

            <div className={"box_container " + (invertedStyle)}>
                <div id="bmenu_container">
                    <Menu id="fixed_bmenu" className="ui fixed" inverted={inverted}>
                        <Popup content="select [ALL] status" trigger={
                            <Button active={(status_filter === "" || status_filter === "ALL") ? true : false} inverted={inverted} onClick={() => handleStatusFilter("")} className="ui bmenu blue button "><div className="bmenu_lbl">{total}</div></Button>
                        } inverted />
                        <Popup content="select [ok] status" trigger={
                            <Button active={(status_filter === "ok") ? true : false} inverted={inverted} onClick={() => handleStatusFilter("ok")} className="ui bmenu green button "><div className="bmenu_lbl">{ok}</div></Button>
                        } inverted />
                        <Popup content="select [ko] status" trigger={
                            <Button active={(status_filter === "ko") ? true : false} inverted={inverted} onClick={() => handleStatusFilter("ko")} className="ui bmenu red button "><div className="bmenu_lbl">{ko}</div></Button>
                        } inverted />
                        <Popup content="select [partial] status" trigger={
                            <Button active={(status_filter === "partial") ? true : false} inverted={inverted} onClick={() => handleStatusFilter("partial")} className="ui bmenu orange button "><div className="bmenu_lbl">{partial}</div></Button>
                        } inverted />
                        <Popup content="select [old] status" trigger={
                            <Button active={(status_filter === "old") ? true : false} inverted={inverted} onClick={() => handleStatusFilter("old")} className="ui bmenu yellow button "><div className="bmenu_lbl">{old}</div></Button>
                        } inverted />
                        <Popup content="select [disabled] status" trigger={
                            <Button active={(status_filter === "disabled") ? true : false} inverted={inverted} onClick={() => handleStatusFilter("disabled")} className="ui bmenu grey button "><div className="bmenu_lbl">{disabled}</div></Button>
                        } inverted />
                        <Holdable
                            onClick={onClick}
                            onHold={onHold}
                            id="ref"
                            key="ref"
                        >
                            <Popup header="Refresh" content={<p>Click to refresh <br></br> Long press to update ALL</p>} trigger={

                                <Button id="ref" inverted={inverted} color="blue" className="ui bmenu">
                                    <div className="bmenu_lbl">
                                        <Icon loading={loading} name="sync alternate" />
                                    </div>
                                </Button>

                            } inverted />
                        </Holdable>
                    </Menu>
                </div>
                <div>
                    {(VIEW === "BOX")
                        ? <BoxGroup
                            key={boxs}
                            boxgroup={boxs}
                            inverted={inverted}
                            invertedStyle={invertedStyle}
                            handleRotate={handleRotate}
                            handleError={handleError}
                            status_filter={status_filter}
                            handleOK={handleOK}
                            handleKO={handleKO}
                            handleOLD={handleOLD}
                            handlePARTIAL={handlePARTIAL}
                            handleDISABLED={handleDISABLED}
                            handleTOTAL={handleTOTAL}
                            ACTION={ACTION}
                            handleLoading={handleLoading}
                            Refresh={Refresh}
                            updating={updating}
                            CountStatus={CountStatus}
                            handleInitArray={handleInitArray}
                            getBox={getBox}
                            search={search}
                            UpdateAll={UpdateAll}
                            handleStopUpdateAll={handleStopUpdateAll}
                            handleUpdated={handleUpdated}
                            handleButtonDisabled={handleButtonDisabled}
                            updated={updated}
                            handleSetLabelProgress={handleSetLabelProgress}
                        />
                        : <TableBox
                            key={boxs}
                            boxtable={boxs}
                            inverted={inverted}
                            invertedStyle={invertedStyle}
                            handleRotate={handleRotate}
                            handleError={handleError}
                            status_filter={status_filter}
                            handleOK={handleOK}
                            handleKO={handleKO}
                            handleOLD={handleOLD}
                            handlePARTIAL={handlePARTIAL}
                            handleDISABLED={handleDISABLED}
                            handleTOTAL={handleTOTAL}
                            ACTION={ACTION}
                            handleLoading={handleLoading}
                            Refresh={Refresh}
                            updating={updating}
                            CountStatus={CountStatus}
                            handleInitArray={handleInitArray}
                            getBox={getBox}
                            showexport={showexport}
                            search={search}
                            UpdateAll={UpdateAll}
                            handleStopUpdateAll={handleStopUpdateAll}
                            handleUpdated={handleUpdated}
                            handleSetLabelProgress={handleSetLabelProgress}
                        />
                    }
                    <div id="info_version">DWLite&reg; v. {PKG.version}</div>
                </div>
            </div>
        </>
    )
}

export default BoxContainer;