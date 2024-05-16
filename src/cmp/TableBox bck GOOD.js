import React from 'react';
import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import Box from "./box.js";
import  { tableStyle1, tableStyle2 } from './table.ts';
import getTime from './getTime.js';
import CONF from '../config.json';
import GetInfoItem from './GetInfoItem.js';
import { Input } from 'semantic-ui-react';

export default function TableBox({handleSetUpdating, handleUnsetUpdating, handleSetLabelProgress, handleUpdated, handleStopUpdateAll, UpdateAll, updating, boxtable, ACTION, inverted, invertedStyle, onLoading, handleError, Refresh, status_filter, CountStatus, handleInitArray, handleRotate, getBox}) {
    
    const [detail, setDetail ] = useState(true);
    const [data] = useState(boxtable);
    const [filter, setFilter] = useState(boxtable);
    const [search, setSearch ] = useState('');

    const DEBUG = CONF.DEBUG || 0;

    var tableStyle = tableStyle1;
    if (invertedStyle !== "inverted") {
        tableStyle = tableStyle2;
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
    };

    const columns = [
        {id: '1', name: 'Application', cellExport: (row) => row.CodeName, selector: (row) => row.CodeName, sortable: true},
        {id: '2', name: 'Item', cellExport: (row) => row.name, selector: (row) => row.name, sortable: true, omit: detail},
        {id: '3', name: 'Code', cellExport: (row) => row.code, selector: (row) => row.code, sortable: true},
        {id: '4', name: 'Environment', cellExport: (row) => row.env, selector: (row) => row.env, sortable: true},
        {id: '5', name: 'Area', cellExport: (row) => row.Area, selector: (row) => row.Area, sortable: true},
        {id: '6', name: 'SubArea', cellExport: (row) => row.SubArea, selector: (row) => row.SubArea, sortable: true},
        {id: '7', name: 'Timestamp', cellExport: (row) => row.Timestamp, selector: (row) => row.Timestamp, sortable: true},
        {id: '8', name: 'Status', cellExport: (row) => row.Status, selector: (row) => row.Order, cell: row => <Box 
            PARENT="TABLEBOX"
            key={row.Id_detail}
            area={row.Area}
            codename={row.CodeName}
            icon={row.Icon}
            id={row.Id}
            id_detail={row.Id_detail}
            status={row.Status}
            status_color={row.Status_color}
            status_rsp={row.Status_rsp}
            status_txt={row.Status_txt}
            status_disabled={row.disabled}
            subarea={row.SubArea}
            timestamp={row.Timestamp}
            checkstatus={row.checkstatus}
            code={row.code}
            description={row.description}
            disabled={row.disabled}
            env={row.env}
            ipaddress={row.ipaddress}
            name={row.name}
            nettier={row.nettier}
            profile={row.profile}
            role={row.role}
            type={row.type}
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
            />, 
            sortable: true},
    ];

    useEffect(() =>{
        const result=data.filter((i)=>{
            return ( 
                i.Status.match(status_filter) &&
                (
                    i.CodeName.toLowerCase().match(search.toLocaleLowerCase()) ||
                    i.name.toLocaleLowerCase().match(search.toLocaleLowerCase()) ||
                    i.env.toLocaleLowerCase().match(search.toLocaleLowerCase()) ||
                    i.Area.toLocaleLowerCase().match(search.toLocaleLowerCase()) ||
                    i.SubArea.toLocaleLowerCase().match(search.toLocaleLowerCase()) ||
                    i.code.toLocaleLowerCase().match(search.toLocaleLowerCase()) ||
                    i.Timestamp.toLocaleLowerCase().match(search.toLocaleLowerCase())
                )  
            )
        });

        setFilter(result);

        if (ACTION === "LIST_DETAIL") {
            setDetail(false);
        } else {
            setDetail(true);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status_filter, search]);

    return( 
            //<React.Fragment>
            <DataTableExtensions 
                columns={columns}
                data={filter}
                //filter={false}
            >
            <DataTable  
                    //columns={columns}
                    //data={filter}
                    customStyles={tableStyle}
                    fixedHeader
                    highlightOnHover
                    responsive
                    //pagination
                    //paginationPerPage={10}
                    //paginationRowsPerPageOptions={[10, 15, 20]}
                    //filterPlaceholder="Filter"
                    //className="ui table unstackable celled black"
                    noHeader={true}
                    //searching
                    striped
                    //subHeader
                    //    subHeaderComponent={
                    //        <Input 
                    //        type="text" 
                    //        icon="search" 
                    //        iconPosition="left"
                    //        className="ui white"
                    //        placeholder='Search...'
                    //        value={search}
                    //        onChange={(e)=>setSearch(e.target.value)}
                    //        />
                    //    }
                    subHeaderAlign='center'
                    defaultSortFieldId='8'
                    defaultSortAsc={false}
                    //noDataComponent='no data'
            />
            </DataTableExtensions>
            //</React.Fragment>
    )   
}