import _ from 'lodash';
import React, { useState } from 'react'
import { Dropdown, Message, Icon } from 'semantic-ui-react'
import CONF from '../config.json';
import axios from 'axios';
import PostCall from './postcall.js';
import getTime from './getTime';

function MAIN_SELECT({handleGetData}) {

    const DEBUG = CONF.DEBUG || 0;
    const [list, setList] = useState([]);
    const [error, setError] = useState(false);
    const [errorMSG, setErrorMSG] = useState("");

    function getList() {
        const params = { 'SELECT_TYPE': "AREAENV" };
        const options = PostCall("select", params);

        axios(options)
            .then((res) => {
                if (res.data.results[0].ERROR !== undefined) {
                    setError(true);
                    setErrorMSG(res.data.results[0].ERROR);
                } else {
                    setList(res.data.results);
                    setError(false);
                    setErrorMSG("");
                }
                if (DEBUG) console.log(getTime(), res.data.results);
            })
            .catch(error => {
                setError(true);
                setErrorMSG("" + error);
                if (DEBUG) console.log(getTime(), error);
            });
    };

    const listOptions = _.map(list, (obj) => ({
        key: obj.key,
        text: obj.name,
        value: obj.value,
    }));

    var listSelectedRaw = localStorage.getItem("DWLITE_FILTER");
    var listSelected = [];

    if (listSelectedRaw !== undefined) {
        listSelected = JSON.parse(listSelectedRaw) || [];
    }

    const renderLabel = (label) => ({
        color: 'black',
        content: `${label.text}`,
        icon: 'check',
    });

    function setLocalStorage(e, data) {
        if (data.value !== undefined) {
            localStorage.setItem("DWLITE_FILTER", JSON.stringify(data.value));
            handleGetData();
        }
    }

    return (
        <>
        <Dropdown
            style={{backgroundColor: '#252628', color: 'white'}}
            placeholder='Area / Environment'
            name='Main Select'
            multiple
            search
            selection
            scrolling
            options={listOptions}
            onOpen={getList}
            onChange={setLocalStorage}
            renderLabel={renderLabel}
            value={listSelected}
            error={error}
        >
        { (error) ? <Dropdown.Menu><Message error align="center"><Icon name="bug" />{errorMSG}</Message></Dropdown.Menu> : null }
        </Dropdown>
        </>
    )
}

export default MAIN_SELECT