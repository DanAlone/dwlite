import React from "react";
import { Icon, Message, Header, Grid, Item } from 'semantic-ui-react';
import BoxMiniGroup from "./boxMiniGroup.js";

function BoxUpdate({ area, codename, id, status, status_color, status_txt, status_disabled, subarea, timestamp, code, env, handleRotate, handleError, backToLogin }) {

    var codename_display = codename;

    if ((codename !== undefined) && (codename.length > '32')) {
        codename_display = codename.substring(0, 32) + "...";
    }

    return (
        <>
            <Grid key={id} padded>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <Header.Subheader style={{ whiteSpace: 'nowrap' }} className="ui myblue">
                            <Item.Image><Icon name="window maximize" size="big" /></Item.Image>
                            <Item.Content style={{ whiteSpace: 'nowrap' }}>
                                <Header.Subheader className="myblue">{codename_display}
                                    <p className="mygray">{env}</p>
                                </Header.Subheader>
                            </Item.Content>
                        </Header.Subheader>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3}>
                    <Grid.Column width={8}>
                        <Header.Subheader style={{ whiteSpace: 'nowrap' }} className="ui mygray">
                            <Item.Image><Icon name="building" size="big" /></Item.Image>
                            <Item.Content style={{ whiteSpace: 'nowrap' }}>
                                <Header.Subheader style={{ color: 'white' }}>{area}</Header.Subheader>
                                <div className='mygray'>{subarea}</div>
                            </Item.Content>
                        </Header.Subheader>
                    </Grid.Column>
                    <Grid.Column>
                        <Header.Subheader style={{ whiteSpace: 'nowrap' }} className='ui mygray'>
                            <Item.Image><Icon name="barcode" size="big" /></Item.Image>
                            <Item.Content style={{ whiteSpace: 'nowrap' }}>
                                <Header.Subheader style={{ color: 'white' }}>{code}</Header.Subheader>
                                <div className='mygray'>CODE</div>
                            </Item.Content>
                        </Header.Subheader>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row >
                    <Grid.Column>
                        <Message style={{fontWeight: 'bold'}} color={status_color} size="mini">
                            <Message.Content>
                                <Message.Header>Total Status [<b>{status}</b>]</Message.Header>
                                {timestamp}<br></br>Status detail: <label style={{fontWeight: '800'}}>{status_txt}</label><br></br>
                                {
                                    (status_disabled) ? <Message info align="center" size="small"><Icon name="ban" color="red" />Update disabled message: <b>{status_disabled}</b></Message> : <div></div>
                                }
                            </Message.Content>
                        </Message>
                    </Grid.Column>
                </Grid.Row>
                <BoxMiniGroup id={id} handleRotate={handleRotate} handleError={handleError} backToLogin={backToLogin} />
            </Grid>
        </>
    )
}

export default BoxUpdate;