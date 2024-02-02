import React from 'react';
import { useNavigate } from 'react-router-dom';

function AccountRankComponent(props)
{
    const account = props.account;
    const navigate = useNavigate();

    return (
        <div className="flex flex-row p-5" onClick={()=>{navigate(`/account/${account.username}`)}}>
            <img style={{width:'20%'}} src={`data:image/${account.avatar_type};base64,${account.avatar}`} alt="avatar"/>
            <p>{account.username}</p>
            <p>{account.likes}</p>
        </div>
    );
}

export default AccountRankComponent;