import React, {useEffect, useState} from "react";
import {ServerAddress} from "../../serverAddress/serverAdress";
import {AgGridColumn, AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './profile.css';


const PersonalCampaigns = (props) => {
    const [userObject, setUserObject] = useState(null);
    const [userCampaigns, setUserCampaigns] = useState(null);

    useEffect(async () => {
        setUserObject(props.userInfo);

        getUserCampaigns();
    }, []);

    const getUserCampaigns = async () => {
        const response = await fetch(`${ServerAddress.address}/${props.userInfo['user_login']}/campaigns`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('USER'),
            },
        });

        const responseJSON = await response.json()
        console.log(responseJSON);

        if (responseJSON.data) {
            setUserCampaigns(responseJSON.data);
        }
    }

    const dateCellRenderer =(data) => {
        return data.value ? (new Date(data.value)).toLocaleDateString() : '';
    }


    return (
        <div>
            {userCampaigns ?
                <div className="ag-theme-alpine mt-3" style={{height: 1000, width: '100%'}}>
                    <AgGridReact
                        frameworkComponents={{
                            dateCellRenderer: dateCellRenderer,
                        }}
                        defaultColDef={{
                            editable: true,
                            sortable: true,
                            flex: 1,
                            minWidth: 100,
                            filter: true,
                            resizable: true,
                        }}
                        rowData={userCampaigns}>
                        <AgGridColumn headerName={'Campaign name'} field="campaign_name"/>
                        <AgGridColumn headerName={'Campaign creator'} field="user_login"/>
                        <AgGridColumn headerName={'Campaign theme'} field="campaign_theme"/>
                        <AgGridColumn headerName={'Money goal'} field="campaign_money_amount"/>
                        <AgGridColumn headerName={'Latest update'} cellRenderer="dateCellRenderer" field="campaign_latest_update"/>
                    </AgGridReact>
                </div> : null}
        </div>
    )
}

export default PersonalCampaigns;