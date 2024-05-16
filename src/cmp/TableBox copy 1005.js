import React from 'react';
import { useState, useEffect } from "react";
import { Icon, Button, Input, Modal, Header, Item, Grid, Segment } from 'semantic-ui-react';
import Box from "./box.js";
//import CONF from '../config.json';
import getTime from './getTime.js';
import CONF from '../config.json';
import GetInfoItem from './GetInfoItem.js';
// DATATABLE
//import 'datatables.net-dt/node_modules/datatables.net/js/jquery.dataTables.min.mjs';
//import 'datatables.net-dt/node_modules/datatables.net/js/jquery.js';
//import DataTable from 'datatables.net-dt';
//import 'datatables.net-buttons-dt';
//import 'datatables.net-responsive-dt';
import 'datatables.net-dt/node_modules/datatables.net';

//import JSZip from 'jszip'; // For Excel export
//import PDFMake from 'pdfmake'; // For PDF export
// EXTRA BUTTON 
//import 'datatables.net-buttons/js/buttons.html5.mjs';
//import 'datatables.net-buttons/js/buttons.print.mjs';
//import 'datatables.net-buttons/js/buttons.colVis.mjs';
//import vfs_fonts from 'pdfmake/build/vfs_fonts';


//PDFMake.vfs = vfs_fonts.pdfMake.vfs;
//global.JSZip = JSZip;

function TableBox({ handleSetUpdating, handleUnsetUpdating, handleSetLabelProgress, handleUpdated, handleStopUpdateAll, UpdateAll, updating, boxtable, ACTION, inverted, invertedStyle, onLoading, handleError, Refresh, status_filter, CountStatus, handleInitArray, handleRotate, getBox }) {

    const $ = require('jquery');

    const DEBUG = CONF.DEBUG || 0;

    function getTable() {
            setTable();
    }

    function setTable() {

        var title_file = "";
        let col_vis = 0;

        if (ACTION === "LIST_DETAIL") {
            title_file = document.title + " - Export items detail status - " + getTime();
            col_vis = 1;
        } else {
            title_file = document.title + " - Export items status - " + getTime();
        }

        $("#tablebox").DataTable().destroy();

        var dt = $("#tablebox").DataTable({
            processing: true,
            destroy: true,
            retrieve: true, // important
            responsive: true,
            scrollY: 650,
            paging: false,
            searching: true,
            info: false,
            ordering: true,
            order: [[7, "desc"], [0, "asc"]],
            fixedHeader: true,
            sDom: 't',
            scrollCollapse: true,
            autoFill: true,
            columnDefs: [
                { responsivePriority: 1, targets: 1 },
                { responsivePriority: 2, targets: 6 },
                { responsivePriority: 1, targets: 7 },
                { "width": "10%", "targets": 0 },
                { "width": "20%", "targets": 1 },
                { "width": "8%", "targets": 2 },
                { "width": "8%", "targets": 3 },
                { "width": "08%", "targets": 4 },
                { "width": "08%", "targets": 5 },
                { "width": "5%", "targets": 6 },
                { "width": "5%", "targets": 7 },
                { "targets": [1], "visible": col_vis, "searchable": true },
            ],
            buttons: [
                {
                    className: 'tblbtn',
                    extend: 'copyHtml5',
                    title: title_file,
                    text: '<i class="copy icon big icnbtn"></i>',
                    titleAttr: 'Copy',
                    exportOptions: {
                        columns: "thead th:not(.noExport)"
                    }
                },
                {
                    className: 'tblbtn',
                    extend: 'excelHtml5',
                    title: title_file,
                    text: '<i class="file excel icon big icnbtn"/>',
                    titleAttr: 'Excel',
                    exportOptions: {
                        columns: "thead th:not(.noExport)"
                    }
                },
                {
                    className: 'tblbtn',
                    extend: 'csvHtml5',
                    title: title_file,
                    text: '<i class="file alternate icon big icnbtn" />',
                    titleAttr: 'CSV',
                    exportOptions: {
                        columns: "thead th:not(.noExport)"
                    }
                },
                {
                    className: 'tblbtn',
                    extend: 'pdfHtml5',
                    title: title_file,
                    text: '<i class="file pdf icon big icnbtn"/>',
                    orientation: 'landscape',
                    titleAttr: 'PDF',
                    exportOptions: {
                        columns: "thead th:not(.noExport)"
                    }
                }],
        });

        // refresh table layout

        $(".dataTables_empty").text("Loading data...");

        if ((status_filter !== undefined) && (status_filter !== "")) {
            const string_search = "[" + status_filter + "]";
            dt.column(7).search(string_search).draw();
        } else {
            dt.search("").draw();
        }

        dt.columns.adjust().responsive.recalc();

        var dtrow = dt.page.info();
        var dtrow_total = 0;
        var dtrow_display = 0;

        if (dtrow) {
            dtrow_total = JSON.stringify(dtrow.recordsTotal);
            dtrow_display = JSON.stringify(dtrow.recordsDisplay);
        }

        $("#toolbar_info").text("Showing [" + dtrow_display + "] of [" + dtrow_total + "] rows");

        $("#search").on("keyup change", function () {
            dt.search(this.value).draw();
            $("#icon_cancel_search").show();
            $("#icon_search").hide();
            if (this.value === "") {
                $("#icon_cancel_search").hide();
                $("#icon_search").show();
            }
            dtrow = dt.page.info();
            dtrow_total = JSON.stringify(dtrow.recordsTotal);
            dtrow_display = JSON.stringify(dtrow.recordsDisplay);
            $("#toolbar_info").text("Showing [" + dtrow_display + "] of [" + dtrow_total + "] rows");
        });

        // BUTTONS
        $("#container_buttons").html("");
        dt.buttons().container().appendTo('#container_buttons');
        dt.order([[7, "desc"], [0, "asc"]]).draw();
        if (DEBUG) console.log("SET TABLE: " + getTime());
    }

    function onUpdateItem(i, itm) {
        if (DEBUG) console.log(getTime(), "UPDATE: " + i + " " + itm.Timestamp);
        const newBoxs = boxtable.map(obj =>
            obj.Id === i ? {
                ...obj, Timestamp: itm.Timestamp,
                Status: itm.Status,
                Status_color: itm.Status_color,
                Status_txt: itm.Status_txt,
                Order: GetInfoItem("order", itm.Status)
            }
                : obj
        );
        handleInitArray(newBoxs);
        CountStatus(newBoxs);
        setTable();
    };

    const [search, setSearch] = useState("search");

    const onSearch = (e, data) => {
        setSearch((data.value === "") ? "search" : "close");
    }

    const onCancel = (e) => {
        e.target.value = "";
        setSearch("search");
        setTable();
    }

    const [sf, setSf] = useState(status_filter);
    const handleSetf = (s) => { setSf(s) };

    const handleChange = (e) => {
        handleSetf(status_filter);
        setTable();
    }

    const [open_modal, setOpen_modal] = useState(false);
    const showMyModal = () => { setOpen_modal(true); setTimeout(function () { setTable() }, 100); }
    const hideMyModal = () => { setOpen_modal(false); }

    useEffect(() => {
        getTable(boxtable);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Modal
                className="mymodal"
                key="container_buttons"
                basic
                onClose={() => hideMyModal}
                onOpen={() => showMyModal}
                open={open_modal}
                size="mini"
                dimmer="blurring"
                style={{ marginLeft: '-12px' }}
            >
                <Icon className="close myblue" onClick={hideMyModal} />
                
                <Header.Subheader style={{ whiteSpace: 'nowrap' }} className="ui myblue">
                    <Item.Image><Icon name="download" size="big" /></Item.Image>
                    <Item.Content style={{ whiteSpace: 'nowrap' }}>
                        <Header.Subheader className="myblue">Export data
                            <p className="mygray">choose format</p>
                        </Header.Subheader>
                    </Item.Content>
                </Header.Subheader>

                <Grid centered>
                    <Segment basic>
                        <div id="container_buttons"></div>
                    </Segment>
                </Grid>
                <p></p><p></p>
            </Modal>

            <div style={{ width: '99.2vw' }}>
                <div id="container_search" style={{ width: ' 100%', textAlign: 'center' }}>
                    <Input id="search" className="link" icon={search} placeholder="Search..." onChange={onSearch} onDoubleClick={onCancel} />
                    <Button icon style={{ marginLeft: '5px' }} onClick={showMyModal}><Icon name="download" /></Button>
                </div>

                <div style={{ display: 'none' }} attribute={(status_filter !== sf) ? handleChange(status_filter) : null} />

                <table id="tablebox" className={"ui table unstackable compact celled striped sortable " + invertedStyle}>
                    <thead>
                        <tr>
                            <th data-priority="2">Application</th>
                            <th data-priority="1">Item</th>
                            <th data-priority="3">Code</th>
                            <th data-priority="4">Environment</th>
                            <th data-priority="5">Area</th>
                            <th data-priority="6">SubArea</th>
                            <th data-priority="1">Timestamp</th>
                            <th data-priority="1">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(boxtable || []).map((box, i) => (
                            <tr key={i}>
                                <td>{box.CodeName}</td>
                                {(ACTION === "LIST_DETAIL") ? <td><Icon name={box.Icon} color={box.Status_color} /> {box.name} ({box.ipaddress})</td> : <td>{box.name}</td> }
                                <td>{box.code}</td>
                                <td>{box.env}</td>
                                <td>{box.Area}</td>
                                <td>{box.SubArea}</td>
                                <td>{box.Timestamp}</td>
                                <td data-order={box.Order} style={{ textAlign: 'center', color: box.Status_color }}>
                                    <Box
                                        PARENT="TABLEBOX"
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
                                        ACTION={ACTION}
                                        inverted={inverted}
                                        invertedStyle={invertedStyle}
                                        onLoading={onLoading}
                                        handleError={handleError}
                                        getBox={getBox}
                                        Refresh={Refresh}
                                        onUpdateItem={onUpdateItem}
                                        handleRotate={handleRotate}
                                        UpdateAll={UpdateAll}
                                        handleStopUpdateAll={handleStopUpdateAll}
                                        handleUpdated={handleUpdated}
                                        handleSetLabelProgress={handleSetLabelProgress}
                                        updating={updating}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr><th>Application</th><th>Name</th><th>Code</th><th>Environment</th><th>Area</th><th>SubArea</th><th>Timestamp</th><th>Status</th></tr>
                    </tfoot>
                </table>
                <div style={{ width: '100vw', textAlign: 'center' }} id="toolbar_info"></div>
            </div>
        </>
    );
}

export default TableBox;