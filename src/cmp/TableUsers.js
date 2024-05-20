import React from 'react';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
//import Box from "./box.js";
import  { tableStyle1, tableStyle2 } from './table.ts';
import getTime from './getTime.js';
import CONF from '../config.json';
//import GetInfoItem from './GetInfoItem.js';
//import { Icon } from 'semantic-ui-react'
import axios from 'axios';
import PostCall from './postcall.js';

export default function TableUsers({handleSetUpdating, handleUnsetUpdating, handleSetLabelProgress, handleUpdated, handleStopUpdateAll, UpdateAll, updating, boxtable, ACTION, inverted, invertedStyle, onLoading, handleError, Refresh, status_filter, CountStatus, handleInitArray, handleRotate, getBox}) {
    
    //const [detail, setDetail ] = useState(true);
    //const [data, setData ] = useState(boxtable);
    //const [filter, setFilter] = useState(boxtable);

    const DEBUG = CONF.DEBUG || 0;

    var tableStyle = tableStyle1;
    if (invertedStyle !== "inverted") {
        tableStyle = tableStyle2;
    }

    console.log("TSTYLE: " + inverted);

    //var newBoxs = boxtable;

    //function onUpdateItem(i, itm) {
    //    if (DEBUG) console.log(getTime(), "UPDATE: " + i + " " + itm.Timestamp);
    //    newBoxs = boxtable.map(obj =>
    //        obj.Id === i ? {
    //            ...obj, Timestamp: itm.Timestamp,
    //            Status: itm.Status,
    //            Status_color: itm.Status_color,
    //            Status_txt: itm.Status_txt,
    //            Order: GetInfoItem("order", itm.Status)
    //        }
    //            : obj
    //    );
    //    handleInitArray(newBoxs);
    //    CountStatus(newBoxs);
    //    //setData(newBoxs);
    //};

    const params = { 'ACTION': "LIST" };
    const options = PostCall("users", params);

    // console.log(options);

    const [ myArray, setMyArray ] = useState([]);

    //var myArray = [];

    function getData(){
        axios(options)
            .then((res) => {
                //(res.data.results !== undefined) ? myArray = res.data.results : myArray.push({ "ERROR": "no data available" })

                // var color = "";
                // var order = "";

                setMyArray(res.data.results);

                myArray.forEach((item) => {
                    if (item.ERROR) {
                        handleError(true, "ERROR: " + item.ERROR);
                    } else {
                        handleError(false);
                    }

                    //color = GetInfoItem("color", item.Status);
                    //order = GetInfoItem("order", item.Status);
                    //item.Status_color = color;
                    //item.Order = order;

                    //myArray.push(item);
                }); // end forEach

                //handleInitArray(myBox);
                //CountStatus(myBox);

                if (DEBUG) console.log(getTime(), res.data.results);
            })
            .catch(error => {
                handleError(true, "ERROR: " + error);
                if (DEBUG) console.log(getTime(), error);
            })
            .finally(e => {
                handleRotate("");
                //handleLoading(false);
                //if (d) { handleCloseDimmer(); };
            });

    }

    // console.log("MYARRAY: ", myArray);

    const columns = [
        {id: '1', name: 'Username', cellExport: (row) => row.username, selector: (row) => row.username, sortable: true},
        {id: '2', name: 'Name', cellExport: (row) => row.name, selector: (row) => row.name, sortable: true},
        {id: '3', name: 'Lastname', cellExport: (row) => row.lastname, selector: (row) => row.lastname, sortable: true},
        {id: '4', name: 'Role', cellExport: (row) => row.role, selector: (row) => row.role, sortable: true},
        {id: '5', name: 'Authentication', cellExport: (row) => row.auth, selector: (row) => row.auth, sortable: true},
        {id: '6', name: 'Locked', cellExport: (row) => row.locked, selector: (row) => row.locked, sortable: true},
        {id: '7', name: 'Email', cellExport: (row) => row.email, selector: (row) => row.email, sortable: true, width: '15%'},
        {id: '8', name: 'Phone number', cellExport: (row) => row.phone, selector: (row) => row.phone, sortable: true},
        {id: '9', name: 'Profile', cellExport: (row) => row.profile, selector: (row) => row.profile, sortable: true},
    ];

    useEffect(() =>{
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    var moment = require('moment');
    let now = new Date();
    let currentDate = moment(now).format('YYYY-MM-DD_HH:mm:ss');
    var filename = "DWLite_item_status_" + currentDate;

    return( 
            <>
            <DataTableExtensions 
                columns={columns}
                data={myArray}
                filter={true}
                filterPlaceholder="Search..."
                exportHeaders
                fileName={filename}
                filterDigit={3}
            >
            <DataTable  
                    customStyles={tableStyle}
                    fixedHeader
                    highlightOnHover
                    responsive
                    dense
                    //pagination
                    //paginationPerPage={10}
                    //paginationRowsPerPageOptions={[10, 15, 20]}
                    striped
                    subHeaderAlign='center'
                    defaultSortFieldId='3'
                    defaultSortAsc={true}
                    //noDataComponent='no data'
            />
            </DataTableExtensions>
            </>
    )   
}