import React, { useEffect, useState } from "react";
import { Icon, Modal, Button, Transition } from 'semantic-ui-react';
import BoxDetail from "./box_detail";
import GetInfoItem from './GetInfoItem.js';

function BoxMini({ area, codename, icon, id, id_detail, status, status_color, status_rsp, status_txt, status_disabled, subarea, timestamp, checkstatus, code, description, disabled, env, ipaddress, name, nettier, profile, role, type, updating, handleError, handleRotate }) {

    const [open_modal, setOpen_modal] = useState(false);
    const showMyModal = () => { setOpen_modal(true); }
    const hideMyModal = () => { setOpen_modal(false); }

    const [ iconServer, setIconServer ] = useState("");
    const [ instance, setInstance ] = useState("");
    const [ instanceClass, setInstanceClass ] = useState("");

    const [ roleDisplay, setRoleDisplay ] = useState(role);

    useEffect(() => {
        if ((type).includes("SERVER")) {
            setIconServer(GetInfoItem("type", type))
        }
        if ((role).includes("instance")) {
            setInstance(GetInfoItem("instance", type))
            setInstanceClass("instance");
        }
        if ((role).includes("-dmz")) {
            setRoleDisplay(role.replace("-dmz", ""))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Transition.Group animation="fade down" duration={300}>
            {(open_modal) ? <Modal
                className="mymodal"
                key={id}
                basic
                onClose={() => hideMyModal}
                onOpen={() => showMyModal}
                open={open_modal}
                size="tiny"
                dimmer="blurring"
                style={{ marginLeft: '-12px' }}
            >
                <Icon className="close myblue" onClick={hideMyModal} />
                
                <BoxDetail
                    id={id}
                    area={area}
                    subarea={subarea}
                    status={status}
                    env={env}
                    status_rsp={status_rsp}
                    status_txt={status_txt}
                    timestamp={timestamp}
                    codename={codename}
                    code={code}
                    status_color={status_color}
                    status_disabled={status_disabled}
                    description={description}
                    disabled={disabled}
                    ipaddress={ipaddress}
                    profile={profile}
                    name={name}
                    type={type}
                    role={role}
                    icon={icon}
                    iconServer={iconServer}
                    handleError={handleError}
                    handleRotate={handleRotate}
                />

                <Modal.Actions style={{ textAlign: 'center' }}>
                    <Button basic color='blue' inverted onClick={hideMyModal}>
                        <Icon name='remove' /> Close
                    </Button>
                </Modal.Actions>
            </Modal>
            : null }
            </Transition.Group>

            <Button size="mini" inverted={true} color={status_color} id={id} onClick={() => showMyModal()} className={"minibox " + instanceClass}>
                <div style={{ display: 'flex' }}>
                    {(iconServer) ?
                        <Icon size="big" name={iconServer} /> :
                        <Icon size="big" name={icon} />
                    }
                    {(iconServer) ?
                        <><label className="lbl_inst">{roleDisplay} <div style={{ color: '#999999', textTransform: 'capitalize' }}>{iconServer}</div></label></>
                        : (instance) ?
                            <><label className="lbl_inst">{roleDisplay} <div className={instance} style={{ color: '#999999' }}>{instance}</div></label></>
                            : <label className="lbl_inst">{roleDisplay}</label>
                    }
                </div>
                <div style={{ justifyContent: 'middle', width: '100%', textAlign: 'center' }} className="lbl_detail">{name}</div>
            </Button>
        </>
    )
}

export default BoxMini;