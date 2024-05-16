import CONF from '../config.json';
import qs from 'qs';

export default function PostCall(caller, params) {

    const tkn = localStorage.getItem("jwt");
    var TIMEOUT = CONF.AXS_TIMEOUT || 30000;

    var script = "";

    switch (caller) {
        case "items":
            script = CONF.GET_ITEMS;
            break;
        case "itemsUpd":
            script = CONF.GET_ITEMS;
            TIMEOUT = 60000;
            break;
        case "select":
            script = CONF.GET_SELECT;
            break;
        case "login":
            script = CONF.LOGIN_URL;
            break;
        case "checkItem":
            script = CONF.GET_CHECK_ITEMS;
            break;
        case "validation":
            script = CONF.GET_VALIDATION;
            break;
        default: break;
    }

    const headers = { "Authorization": `Bearer ${tkn}`, 'Content-Type': 'application/x-www-form-urlencoded' };
    const apiUrl = CONF.API_URL;
    const myUrl = apiUrl + script;
    const url = new URL(myUrl);
    const options = {
        method: 'POST',
        responseType: "json",
        timeout: TIMEOUT,
        headers: headers,
        data: qs.stringify(params),
        url,
    };

    return options;
};