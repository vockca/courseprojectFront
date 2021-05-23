import React, {useEffect, useState} from "react";
import {ServerAddress} from "../../serverAddress/serverAdress";
import {Link} from "react-router-dom";


const AdminPage = (props) => {
    const [usersInfo, setUsersInfo] = useState([]);
    const [isDataFetched, setIsDataFetched] = useState(false);

    const getUsersInfo = async () => {
        const response = await fetch(`${ServerAddress.address}/users`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('USER'),
            },
        });

        const ResponseJSON = await response.json();
        //make a way to cover the answer if user not authorized
        if (ResponseJSON.data) {
            setUsersInfo(ResponseJSON.data);
            setIsDataFetched(true);
        }
    }

    const deleteUser = async (userId) => {
        const response = await fetch(`${ServerAddress.address}/users/${userId}`,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': localStorage.getItem('USER'),
                },
            },
        );
        const jsonResponse = await response.json();
        console.log(jsonResponse.msg);

        getUsersInfo();
    }

    const changeBanStatus = async (userId) => {
        const response = await fetch(`${ServerAddress.address}/users/changeBanStatus/${userId}`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': localStorage.getItem('USER'),
                },
            },
        );
        const jsonResponse = await response.json();
        console.log(jsonResponse.msg);

        getUsersInfo();
    }

    const changeAdminStatus = async (userId) => {
        const response = await fetch(`${ServerAddress.address}/users/changeAdminStatus/${userId}`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': localStorage.getItem('USER'),
                },
            },
        );
        const jsonResponse = await response.json();
        console.log(jsonResponse.msg);

        getUsersInfo();
    }

    useEffect(() => {
        getUsersInfo();
    }, []);

    const userRows = usersInfo.map((item) => {
        console.log(item);
        return (
            <tr key={item['user_id']}>
                <td><Link to={`/profile/${item['user_login']}`}>{item['user_login']}</Link></td>
                <td><button onClick={() => changeBanStatus(item['user_id'])}>{item['user_isBanned']? 'Unban' : 'Ban'}</button></td>
                <td><button onClick={() => changeAdminStatus(item['user_id'])}>{item['user_isAdmin']?'Demote' : 'Make admin'}</button></td>
                <td><button onClick={() => deleteUser(item['user_id'])}>delete</button></td>
            </tr>
        )
    })
    return(
        <table>
            <tbody>
                {isDataFetched ? userRows : null}
            </tbody>
        </table>
    )
}

export default AdminPage;