import React from 'react';
import { useRef, useEffect, useState } from 'react';
import { Icon, Button, Input, Modal, Header, Item, Grid, Segment } from 'semantic-ui-react';
import Box from "./box.js";
//import CONF from '../config.json';
import getTime from './getTime.js';
import CONF from '../config.json';
import GetInfoItem from './GetInfoItem.js';


import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-buttons';
import 'datatables.net-responsive';
import 'datatables.net-colreorder';
// DataTables Extra
import JSZip from 'jszip'; // For Excel export
import PDFMake from 'pdfmake'; // For PDF export
// EXTRA BUTTON 
import 'datatables.net-buttons/js/buttons.html5.mjs';
import 'datatables.net-buttons/js/buttons.print.mjs';
import 'datatables.net-buttons/js/buttons.colVis.mjs';
import vfs_fonts from 'pdfmake/build/vfs_fonts';

PDFMake.vfs = vfs_fonts.pdfMake.vfs;
global.JSZip = JSZip;

const TableBox = ({boxtable}) => {
    const tableRef = useRef(null);

    var title_file = "";
    let col_vis = 0;

    const [open_modal, setOpen_modal] = useState(false);
    const showMyModal = () => { setOpen_modal(true); };
    const hideMyModal = () => { setOpen_modal(false); };
    const DEBUG = CONF.DEBUG || 0;

    useEffect(() => {
        if (!tableRef.current) return;

        //const $ = require('jquery');
        //$("#tablebox").DataTable().destroy();

        var dt = $(tableRef.current).DataTable({
            data: boxtable,
            columns: [
                {title: 'Application', data: 'application'},
                {title: 'Item', data: 'item'},
                {title: 'Code', data: 'code'},
                {title: 'Environment', data: 'environment'},
                {title: 'Area', data: 'area'},
                {title: 'SubArea', data: 'subarea'},
                {title: 'Timestamp', data: 'timestamp'},
                {title: 'Status', data: 'status'},
            ],
            processing: true,
            destroy: true,
            retrieve: true, // important
            responsive: true,
            scrollY: 650,
            paging: false,
            searching: false,
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

        dt.columns.adjust().responsive.recalc();
        var dtrow = dt.page.info();
        var dtrow_total = 0;
        var dtrow_display = 0;

        if (dtrow) {
            dtrow_total = JSON.stringify(dtrow.recordsTotal);
            dtrow_display = JSON.stringify(dtrow.recordsDisplay);
        }

        $("#toolbar_info").text("Showing [" + dtrow_display + "] of [" + dtrow_total + "] rows");
        // BUTTONS
        $("#container_buttons").html("");
        //dt.buttons().container().appendTo('#container_buttons');
        dt.order([[7, "desc"], [0, "asc"]]).draw();
        if (DEBUG) console.log("SET TABLE: " + getTime());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [boxtable]);


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
            <table ref={tableRef} style={{textAlign: 'center'}} className="ui table unstackable compact celled striped sortable inverted"/>;
            <div style={{ width: '100vw', textAlign: 'center' }} id="container_buttons"></div>;
            <div style={{ width: '100vw', textAlign: 'center' }} id="toolbar_info"></div>;
        </>
    );

}

export default TableBox;