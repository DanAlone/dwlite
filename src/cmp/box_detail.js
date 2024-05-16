import React, { useState } from "react";
import { Icon, Segment, Header, Label, Table, Button } from 'semantic-ui-react';
import BoxPing from "./boxPing";

function BoxDetail({ area, codename, icon, id, id_detail, status, status_color, status_rsp, status_txt, status_disabled, subarea, timestamp, checkstatus, code, description, disabled, env, ipaddress, name, nettier, profile, role, type, iconServer, updating, ACTION, myBox_detail, backToLogin, handleError, handleRotate }) {

    var name_display = name;

    if ((name !== undefined) && (name.length > '35')) {
        name_display = name.substring(0, 35) + "...";
    }

    const [open_modal, setOpen_modal] = useState(false);
    const showMyModal = () => { setOpen_modal(true); }
    const hideMyModal = () => { setOpen_modal(false); }

    const doPing = () => {
        showMyModal();
    }

    return (
        <>
            {(open_modal) ? <BoxPing open_modal={open_modal} handleError={handleError} name={name} handleRotate={handleRotate} hideMyModal={hideMyModal} showMyModal={showMyModal} /> : null}
            <Header as="h4" className="myblue nowrap"><Icon color={status_color} name={icon} />{name_display}</Header>
            <Segment basic>
                <Table color="black" inverted striped unstackable size="small">
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell width={5} className="CellDetail">Application:</Table.Cell><Table.Cell width={10}>{codename} - {code}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell className="CellDetail">Item name:</Table.Cell>
                            {(type === "URL")                    
                                ?    <Table.Cell><a rel="noopener noreferrer" href={name} target="_blank">{name}</a></Table.Cell>    
                                :    <Table.Cell>{name} <Button style={{marginLeft: '10px'}} size="mini" basic inverted onClick={doPing}>ping</Button></Table.Cell>     
                            }
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell className="CellDetail">Ipaddress:</Table.Cell><Table.Cell>{ipaddress}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell className="CellDetail">Type:</Table.Cell><Table.Cell>{type} {(iconServer) ? <Icon name={iconServer} /> : null}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell className="CellDetail">Role:</Table.Cell><Table.Cell>{role}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell className="CellDetail">Environment:</Table.Cell><Table.Cell>{env}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell className="CellDetail">Description:</Table.Cell><Table.Cell>{description}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell className="CellDetail">Response time(ms):</Table.Cell><Table.Cell>{status_rsp}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell className="CellDetail">Profile:</Table.Cell><Table.Cell>{profile}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell className="CellDetail">Status:</Table.Cell><Table.Cell><Label color={status_color}>[{status}] {status_txt}</Label></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell className="CellDetail">Status Timestamp:</Table.Cell><Table.Cell>{timestamp}</Table.Cell>
                        </Table.Row>
                        {(disabled !== "") ?
                            <Table.Row>
                                <Table.Cell className="CellDetail">Disabled message:</Table.Cell><Table.Cell><Icon name="ban" />{disabled}</Table.Cell>
                            </Table.Row>
                            : null}
                    </Table.Body>
                </Table>
            </Segment>
        </>
    )
}

export default BoxDetail;