import React, { useEffect, useState } from 'react';
import ico from './images/dwlite.ico';
import resp_img from './images/responsive2.gif';
import BoxContainer from './cmp/box_container.js';
import Clock from './cmp/clock.js';
import MainSelect from './cmp/main_select.js'
import {
    Icon,
    Image,
    Menu,
    Sidebar,
    Popup,
    Button,
    Grid,
    Item,
    Header,
    Input,
    Dimmer
} from 'semantic-ui-react';
import PKG from '../package.json';
import MainConfig from './cmp/MainConfig.js';
import MSG from './cmp/message.js';
import CONF from './config.json';
import { useNavigate } from "react-router-dom";
import getTime from './cmp/getTime';

function Main() {

    const [DT, setDate] = useState("");
    const handleDate = () => {
        var clock = { date: new Date() };
        var D = clock.date.toLocaleTimeString();
        setDate(D);
    };

    const DEBUG = CONF.DEBUG || 0;
    const navigate = useNavigate();

    const [isLogged] = useState(JSON.parse(localStorage.getItem("isLoggedin")) || false);
    const [token] = useState(localStorage.getItem("jwt") || "");
    const [user] = useState(localStorage.getItem("username") || "");

    const DWLITE_CONTAINER = localStorage.getItem("DWLITE_CONTAINER") || "BOXTABLE";
    const [ACTION, setACTION] = useState(localStorage.getItem("DWLITE_ACTION") || "LIST");
    const [expand_collapse, setExpand_collapse] = useState("expand");

    // set user info
    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [profile, setProfile] = useState("");
    const [role, setRole] = useState("");
    const [iss, setISS] = useState("");

    const [expandItem, setExpandItem] = useState(false);
    const handleExpandItem = (s) => setExpandItem(s);

    function handleUserInfo() {
        const tkn = localStorage.getItem("jwt");

        if (tkn) {
            const dec = atob(tkn.split('.')[1]);
            const obj = JSON.parse(dec);

            setUsername(obj.data.username);
            setFullname(obj.data.fullname);
            setProfile(obj.data.profile);
            setRole(obj.data.role);
            setISS(obj.iss);
        }
    }

    // set action for container
    const setExpand = () => { setACTION("LIST_DETAIL"); localStorage.setItem("DWLITE_ACTION", "LIST_DETAIL"); setExpand_collapse("compress"); handleGetData() };
    const setCollapse = () => { setACTION("LIST"); localStorage.setItem("DWLITE_ACTION", "LIST"); setExpand_collapse("expand"); handleGetData() };

    // set sidebar status
    const [visible, setVisible] = useState(false);
    const showSidebar = () => setVisible(!visible);
    const hideSidebar = () => setVisible(false);

    const [rotate, setRotate] = useState("");
    const handleRotate = (s) => { setRotate(s) };

    const [refresh, setRefresh] = useState(false);
    const Refresh = () => { setRefresh(!refresh) }

    // set container data / menu
    const [container, setContainer] = useState(DWLITE_CONTAINER);
    const showConfig = () => { setContainer("CONFIG"); localStorage.setItem("DWLITE_CONTAINER", "CONFIG"); setVisible(false) };
    const showBox = () => { setContainer("BOXTABLE"); localStorage.setItem("DWLITE_CONTAINER", "BOXTABLE"); setVisible(false) };

    // set Status main
    const [statusContent, setStatusContent] = useState("OK");
    const [statusIcon, setStatusIcon] = useState("check circle");
    const [statusColor, setStatusColor] = useState("green");

    const [open, showModal] = useState(false);
    const [msg, setMSG] = useState("");
    const [msgType, setMsgType] = useState("info");

    // layout color

    const [VIEW, setVIEW] = useState(localStorage.getItem("DWLITE_VIEW") || "BOX");

    var DWLITE_STYLE = localStorage.getItem("DWLITE_STYLE") || "inverted";

    const [colorsel] = useState("blue");
    const [trueBox, setLayoutBox] = useState((VIEW === "BOX") ? true : false);
    const [trueTable, setLayoutTable] = useState((VIEW === "BOX") ? false : true);

    const [trueBlack, setLayoutBlack] = useState((DWLITE_STYLE === "inverted") ? true : false);
    const [trueWhite, setLayoutWhite] = useState((DWLITE_STYLE === "inverted") ? false : true);
    const [invertedStyle, setInvertedStyle] = useState(DWLITE_STYLE);
    const [inverted, setInverted] = useState((DWLITE_STYLE === "inverted") ? true : false);
    const [bcolor, setBcolor] = useState((DWLITE_STYLE === "inverted") ? "" : "white");

    const [isMounted, setIsMounted] = useState(false)

    const [viewdisabled, setViewdisabled] = useState((localStorage.getItem("DWLITE_VIEW_DISABLED") === "true") ? true : false);
    const [icondisabled, seticondisabled] = useState((viewdisabled) ? "check green" : "close red");

    const [viewnoitems, setViewnoitems] = useState((localStorage.getItem("DWLITE_VIEW_NOITEMS") === "true") ? true : false);
    const [iconnoitems, seticonnoitems] = useState((viewnoitems) ? "check green" : "close red");

    const [getData, setGetData] = useState(0);
    const handleGetData = () => setGetData(getData => getData + 1);

    const handleSetViewDisabled = () => {
        setViewdisabled(!viewdisabled);
        seticondisabled((!viewdisabled) ? "check green" : "close red");
        localStorage.setItem("DWLITE_VIEW_DISABLED", !viewdisabled);
        handleGetData();
    }

    const handleSetViewNoitems = () => {
        setViewnoitems(!viewnoitems);
        seticonnoitems((!viewnoitems) ? "check green" : "close red");
        localStorage.setItem("DWLITE_VIEW_NOITEMS", !viewnoitems);
        handleGetData();
    }

    const handleBox = () => {
        localStorage.setItem("DWLITE_VIEW", "BOX");
        if (isMounted) {
            setLayoutTable(false);
            setLayoutBox(true);
            setVIEW("BOX");
        }
    }
    const handleTable = () => {
        localStorage.setItem("DWLITE_VIEW", "TABLE");
        if (isMounted) {
            setLayoutBox(false);
            setLayoutTable(true);
            setVIEW("TABLE");
        }
    }
    const handleBlack = () => {
        localStorage.setItem("DWLITE_STYLE", "inverted");
        if (isMounted) {
            setLayoutWhite(false);
            setLayoutBlack(true);
            setInvertedStyle("inverted");
            setInverted(true);
            setBcolor("");
            if (trueTable) { Refresh() };
        }
    }
    const handleWhite = () => {
        localStorage.setItem("DWLITE_STYLE", "classic");
        if (isMounted) {
            setLayoutBlack(false);
            setLayoutWhite(true);
            setInvertedStyle("classic");
            setInverted(false);
            setBcolor("white");
            if (trueTable) { Refresh() };
        }
    }

    function handleError(s, msg) {
        if (s === true) {
            setStatusColor("red");
            setStatusIcon("exclamation triangle");
            setStatusContent(msg);

            setMSG(msg);
            setMsgType("error");
            showModal(true);
        } else {
            setStatusColor("green");
            setStatusIcon("check circle");
            setStatusContent("OK");
        }
    }

    function backToLogin() {
        localStorage.removeItem("isLoggedin");
        localStorage.removeItem("jwt");
        localStorage.removeItem("username");
        showModal(false);
    }

    const [search, setSearch] = useState("");

    const handleSearch = (e, string) => {
        if (string.value.length > 2) {
            setSearch(string.value);
        } else {
            setSearch("");
        }
    }

    const handleCancel = (e) => {
        e.target.value = "";
        setSearch("");
    }

    const [menuIcon, setMenuIcon] = useState("bars");

    const handleSetMenuIconClose = () => setMenuIcon("close");
    const handleSetMenuIconBars = () => setMenuIcon("bars");

    const [dimmer, setDimmer] = useState(false);
    const handleOpenDimmer = () => setDimmer(true);
    const handleCloseDimmer = () => setDimmer(false);

    useEffect(() => {
        if ((isLogged !== true) || (token === "") || (user === "")) {
            if (DEBUG) console.log(getTime(), "MAIN u: " + user + " : Logged: " + isLogged);
            navigate("/login");
        } else {
            handleDate();
            handleUserInfo();
            if (ACTION === "LIST") {
                setExpand_collapse("expand");
            } else {
                setExpand_collapse("compress");
            }
        }
        setIsMounted(true)
        return () => {
            setIsMounted(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <MSG msg={msg} type={msgType} showModal={showModal} backToLogin={backToLogin} open={open} />

            <Sidebar.Pushable style={{ transform: "none" }}>
                <Sidebar
                    as={Menu}
                    animation='push'
                    direction='left'
                    inverted
                    vertical
                    visible={visible}
                    onVisible={handleSetMenuIconClose}
                    onHidden={handleSetMenuIconBars}
                >
                    <Item className="item itemuser1">
                        <Header.Subheader style={{ whiteSpace: 'nowrap' }} className="ui myblue">
                            <Item.Image><Icon name="user" size="big" /></Item.Image>
                            <Item.Content style={{ whiteSpace: 'nowrap' }}>
                                <Header.Subheader className="myblue itemuser2"><div className="itemuser3">{fullname}</div>
                                    <p className="mywhite">{username}</p>
                                </Header.Subheader>
                            </Item.Content>
                        </Header.Subheader>
                        <p></p>
                        <div className="mywhite lbl_sb">Profile: <span className="mygray bold">{profile}</span></div>
                        <p></p>
                        <div className="mywhite lbl_sb">Role: <span className="mygray bold">{role}</span></div>
                    </Item>

                    <Item onClick={showBox} className="header item link">Home<Icon name="home" /></Item>

                    <Item onClick={showConfig} className="header item link">Configure items & users<Icon className="cogs icon" />
                    </Item>

                    <Item>
                        <span className="bold mywhite">Layout Settings:</span><Icon name="sliders horizontal" />
                        <p></p>
                        <div className="nowrap" style={{ textAlign: 'center' }}>
                            <Button className="btn_layout" active={trueBox} inverted color={colorsel} onClick={handleBox}>
                                <Icon name="th" />Boxs
                            </Button>
                            <Button className="btn_layout" active={trueTable} inverted color={colorsel} onClick={handleTable}>
                                <Icon name="list" />Table
                            </Button>
                        </div>
                        <p></p>
                        <div className="nowrap" style={{ textAlign: 'center' }}>
                            <Button className="btn_layout" active={trueBlack} inverted color={colorsel} onClick={handleBlack}>
                                <Icon name="moon outline" />Black
                            </Button>
                            <Button className="btn_layout" active={trueWhite} inverted color={colorsel} onClick={handleWhite}>
                                <Icon name="sun" />White
                            </Button>
                        </div>
                    </Item>

                    <Item className="mywhite">
                        <span className="bold mywhite">Filters:</span><Icon name="filter" />
                        <p></p>
                        <MainSelect handleGetData={handleGetData} />
                        <p></p>
                        <div>
                            <Input onChange={handleSearch} onDoubleClick={handleCancel} name="search" placeholder="Search..." icon="search" iconPosition="left"></Input>
                        </div>
                        <p></p>
                        <div className="link" onClick={() => handleSetViewDisabled(!viewdisabled)}>
                            <Icon className={icondisabled} />  <span>Show<span className="mygray"> disabled</span> status</span>
                        </div>
                        <p></p>
                        <div className="link" onClick={() => handleSetViewNoitems(!viewnoitems)}>
                            <Icon className={iconnoitems} />  <span>Show<span className="mygray"> noitems</span> status</span>
                        </div>
                        <p></p>
                    </Item>

                    <Item>
                        <span className="bold mywhite">Manage data:</span><Icon name="ellipsis horizontal" />
                    </Item>

                    <Item className="header item link">Data Export<Icon name="download" /></Item>
                    <Item className="header item link">Data Chart<Icon name="chart pie" /></Item>
                    <Item className="header item link">Data History<Icon name="calendar check" /></Item>

                    <Item className="header item link">Control Scheduling<Icon name="tasks" /></Item>
                    <Item className="header item link">Check Logins<Icon name="sign-in" /></Item>

                    <Item style={{ borderTop: '1px solid #606060' }} className="header item link">Logout<Icon name="power off" /></Item>
                    <Item className="header item link">About<Icon name="info circle" /></Item>
                    <Item className="header item link"><Icon><Image id="menu_logo" src={ico} alt="dwlite.ico" /></Icon>DWLite &reg; - Release: {PKG.version}</Item>

                    <div className="item">
                        <Grid>
                            <Grid.Row centered>
                                Compatibility
                            </Grid.Row>
                            <Grid.Row centered style={{padding: '3px'}}>
                                <Icon name="chrome" size="large" />
                                <Icon name="safari" size="large" />
                                <Icon name="opera" size="large" />
                                <Icon name="firefox" size="large" />
                                <Icon name="internet explorer" size="large" />
                            </Grid.Row>
                            <Grid.Row centered style={{padding: '3px'}}>
                                <Image className="responsive" src={resp_img} alt="responsive" />
                            </Grid.Row>
                        </Grid>
                    </div>
                    <Popup header="Environment:" content={process.env.NODE_ENV} trigger={
                        <div className="header item">DWLite host: <span className="mygray">{iss}</span></div>
                    } inverted />
                    <p></p>
                </Sidebar>

                <Menu fixed="top" inverted={inverted} id="fixed_menu">
                    <Popup content="Home" trigger={
                        <Menu.Item onClick={showBox} >
                            <Image id="main_logo" className={"logo " + rotate} src={ico} alt="dwlite.ico" />
                            <div id="dwlite_reg">DWLite &reg;</div>
                        </Menu.Item>
                    } inverted />

                    <Popup content="Menu" trigger={
                        <Menu.Item id="bars_icon" onClick={showSidebar} >
                            <Icon name={menuIcon} />
                        </Menu.Item>
                    } inverted />

                    {(expandItem) ?
                        <Popup content={(expand_collapse === "compress") ? "Collapse Items" : "Expand Items"} trigger={
                            <Menu.Item onClick={(expand_collapse === "compress") ? setCollapse : setExpand} >
                                <Icon size="large" className={expand_collapse} />
                            </Menu.Item>
                        } inverted />
                        : null}

                    <Popup header="Server Status:" content={statusContent} trigger={
                        <Menu.Item >
                            <Icon name={statusIcon} size="large" color={statusColor} />
                        </Menu.Item>
                    } inverted />


                    <Popup header="Last refresh:" content={DT} trigger={
                        <Menu.Item position="right">
                            <div className="clock"><Clock /></div>
                        </Menu.Item>
                    } inverted />
                </Menu>
                <Sidebar.Pusher dimmed={visible} onClick={hideSidebar} style={{ backgroundColor: bcolor }}>
                    <Dimmer style={{ height: '95vh' }} active={dimmer}>
                        <Image className="rotate" src={ico} alt="dwlite.ico" />
                    </Dimmer>
                    {(() => {
                        switch (container) {
                            case "BOXTABLE": return <BoxContainer handleOpenDimmer={handleOpenDimmer} handleCloseDimmer={handleCloseDimmer} search={search} getData={getData} viewnoitems={viewnoitems} viewdisabled={viewdisabled} handleExpandItem={handleExpandItem} VIEW={VIEW} Refresh={Refresh} inverted={inverted} invertedStyle={invertedStyle} backToLogin={backToLogin} handleError={handleError} handleRotate={handleRotate} handleDate={handleDate} key={refresh} ACTION={ACTION} />;
                            case "CONFIG": return (<MainConfig inverted={DWLITE_STYLE} handleError={handleError} handleRotate={handleRotate} invertedStyle={invertedStyle} />);
                            default: return (<BoxContainer handleOpenDimmer={handleOpenDimmer} handleCloseDimmer={handleCloseDimmer} search={search} getData={getData} viewnoitems={viewnoitems} viewdisabled={viewdisabled} handleExpandItem={handleExpandItem} VIEW={VIEW} Refresh={Refresh} inverted={inverted} invertedStyle={invertedStyle} backToLogin={backToLogin} handleError={handleError} handleRotate={handleRotate} handleDate={handleDate} key={refresh} ACTION={ACTION} />);
                        }
                    })()}
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </>
    )
}

export default Main;