import React from 'react'
import { useState, useEffect } from 'react'
import { Container, TabPane, Tab, Icon } from 'semantic-ui-react'
import TableUsers from './TableUsers.js';

function MainConfig({invertedStyle, inverted, handleError, handleRotate }){

    const [ styled, setStyled ] = useState('');
    const [ styled2, setStyled2 ] = useState(false);

    const panes = [
    { 
        menuItem: {content: <span><Icon className="user"></Icon><Icon className="info circle grey"/>User</span> }, render: () => 
        <TabPane className={styled}>
            <div>USER INFO</div>
        </TabPane> },
    { menuItem: {content: <span><Icon className="users large"></Icon> <Icon className="edit grey"/>Users</span> }, render: () => 
        <TabPane className={styled}>
            <TableUsers handleError={handleError} handleRotate={handleRotate} invertedStyle={invertedStyle} inverted={inverted} />
        </TabPane> },
    { menuItem: {content: <span><Icon className="sitemap large"></Icon> <Icon className="edit grey"/>Items</span> }, render: () => 
        <TabPane className={styled}>
            ITEMS
        </TabPane> },
    ]

    useEffect(() =>{
        if (inverted !== "inverted") {
            setStyled('');
            setStyled2(false);
        } else {
            setStyled('ui inverted black');
            setStyled2(true);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inverted]);

return (
    <>
        <Container style={{marginTop: '60px', width: '100%'}}>
            <Tab menu={{inverted: styled2, attached: true, tabular: true}} panes={panes}/>
        </Container>
    </>
)
}

export default MainConfig;