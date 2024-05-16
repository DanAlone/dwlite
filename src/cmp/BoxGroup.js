import React from 'react';
import Box from './box.js';
import CONF from '../config.json';
import getTime from './getTime.js';

function BoxGroup({ handleSetLabelProgress, handleUpdated, handleStopUpdateAll, UpdateAll, boxgroup, search, getBox, updating, ACTION, inverted, invertedStyle, handleRotate, handleError, Refresh, status_filter, handleOK, handleKO, handleOLD, handlePARTIAL, handleDISABLED, handleTOTAL, handleLoading, CountStatus, handleInitArray }) {

    const DEBUG = CONF.DEBUG || 0;

    function onUpdateItem(i, itm) {
        if (DEBUG) console.log(getTime(), "UPDATE: " + i + " " + itm.Timestamp);

        const newBoxs = boxgroup.map(obj =>
            obj.Id === i ? { ...obj, Timestamp: itm.Timestamp, Status: itm.Status, Status_color: itm.Status_color, Status_txt: itm.Status_txt } : obj
        );
        handleInitArray(newBoxs);
        CountStatus(newBoxs);
    };

    return (
        <>
            {(boxgroup || []).filter(
                        ((status_filter !== "") && (status_filter !== null))
                        ? box => box.Status === status_filter
                        : (search !== "") ? box => 
                        (box.CodeName !== undefined && box.CodeName.toLowerCase().includes(search.toLowerCase()))
                        || (box.name !== undefined && box.name.toLowerCase().includes(search.toLowerCase()))
                        || (box.env !== undefined &&  box.env.toLowerCase().includes(search.toLowerCase()))
                        || (box.ipaddress !== undefined && box.ipaddress.toLowerCase().includes(search.toLowerCase()))
                        || (box.Area !== undefined && box.Area.toLowerCase().includes(search.toLowerCase()))
                        || (box.SubArea !== undefined && box.SubArea.toLowerCase().includes(search.toLowerCase()))
                        || (box.code !== undefined && box.code.toLowerCase().includes(search.toLowerCase()))
                        || (box.description !== undefined && box.description.toLowerCase().includes(search.toLowerCase()))
                        || (box.Status !== undefined && box.Status.toLowerCase().includes(search.toLowerCase()))
                        || (box.Status_txt !== undefined && box.Status_txt.toLowerCase().includes(search.toLowerCase()))
                        || (box.role !== undefined && box.role.toLowerCase().includes(search.toLowerCase()))
                    : box => box).map((box) => (
                        <Box
                            PARENT="BOXGROUP"
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
                            handleRotate={handleRotate}
                            handleError={handleError}
                            Refresh={Refresh}
                            onUpdateItem={onUpdateItem}
                            updating={updating}
                            getBox={getBox}
                            UpdateAll={UpdateAll}
                            handleStopUpdateAll={handleStopUpdateAll}
                            handleUpdated={handleUpdated}
                            handleSetLabelProgress={handleSetLabelProgress}
                        />
                    ))}
        </>
    )
}

export default BoxGroup