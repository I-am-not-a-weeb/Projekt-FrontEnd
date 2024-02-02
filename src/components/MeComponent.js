import React, { useEffect, useReducer, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";

import { ThemeContext } from '../contexts/theme';

const initialState = {
    nickname: '',
    email: '',
    avatar: '',
    avatarType: '',
    isEditing: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_NICKNAME':
            return { ...state, nickname: action.payload };
        case 'SET_EMAIL':
            return { ...state, email: action.payload };
        case 'SET_AVATAR':
            return { ...state, avatar: action.payload };
        case 'SET_AVATARTYPE':
            return { ...state, avatarType: action.payload };
        case 'TOGGLE_EDITING':
            return { ...state, isEditing: !state.isEditing };
        default:
            return state;
    }
};

const MeComponent = () => {
    const [account, setAccount] = useState({});

    const [state, dispatch] = useReducer(reducer, initialState);
    const [editedNickname, setEditedNickname] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [editedAvatar, setEditedAvatar] = useState('');

    const theme = useContext(ThemeContext);

    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    useEffect(() => {
        if(username === null || username === '') {navigate('/login'); return}

        const account = localStorage.getItem('accounts')!== null ? JSON.parse(localStorage.getItem('accounts')).filter(account => account.username === username)[0] : null;

        if(account !== null) 
        {
            dispatch({ type: 'SET_NICKNAME', payload: account.nickname });
            dispatch({ type: 'SET_EMAIL', payload: account.email });
            dispatch({ type: 'SET_AVATAR', payload: account.avatar });
            dispatch({ type: 'SET_AVATARTYPE', payload: account.avatarType });
            setAccount(account);
        }
    }, []);

    const handleEditClick = () => {
        dispatch({ type: 'TOGGLE_EDITING' });
        setEditedNickname(state.nickname);
        setEditedEmail(state.email);
        setEditedAvatar(state.avatar);
    };

    const handleApplyChanges = () => {
        dispatch({ type: 'SET_NICKNAME', payload: editedNickname });
        dispatch({ type: 'SET_EMAIL', payload: editedEmail });

        if (editedAvatar && (editedAvatar.type === 'image/png' || editedAvatar.type === 'image/jpeg')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1];
                setEditedAvatar(base64String);

        
                const accounts = JSON.parse(localStorage.getItem('accounts'));
                const username = localStorage.getItem('username');
                accounts.forEach((account, index) => {
                    if (account.username === username) {
                        accounts[index].nickname = editedNickname;
                        accounts[index].email = editedEmail;
                        accounts[index].avatar = base64String;
                    }
                })

                localStorage.setItem('accounts', JSON.stringify(accounts));
            };
            reader.readAsDataURL(editedAvatar);
        } else {

            const accounts = JSON.parse(localStorage.getItem('accounts'));
            const username = localStorage.getItem('username');
            accounts.forEach((account, index) => {
                if (account.username === username) {
                    accounts[index].nickname = editedNickname;
                    accounts[index].email = editedEmail;
                }
            })

            localStorage.setItem('accounts', JSON.stringify(accounts));
        }

        dispatch({ type: 'TOGGLE_EDITING' });
    };

    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        setEditedAvatar(file);
    };

    const handleLogout = () => {
        console.log('logout')
        localStorage.setItem('username','');
        navigate('/login');
    }

    return (
        <div className='flex flex-col' >
            <div className='my-4 p-2 ml-4' style={{backgroundColor:theme.color4}}>
                <div >
                    <div>
                        {state.isEditing ? (
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarUpload}
                            />
                        ) : (
                            <img src={`data:image/${account.image_type};base64,${account.avatar}`} style={{width:'100px',height:'100px'}}/>
                        )}
                    </div>
                    <div>
                        Nickname: {state.isEditing ? (
                            <input
                                type="text"
                                value={editedNickname}
                                onChange={(e) => setEditedNickname(e.target.value)}
                            />
                        ) : (
                            state.nickname
                        )}
                    </div>
                    <div>
                        Email: {state.isEditing ? (
                            <input
                                type="text"
                                value={editedEmail}
                                onChange={(e) => setEditedEmail(e.target.value)}
                            />
                        ) : (
                            state.email
                        )}
                    </div>
                    {
                        
                    }
                    <button onClick={handleEditClick}>
                        {state.isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    {state.isEditing && (
                        <button onClick={handleApplyChanges}>Apply Changes</button>
                    )}
                </div>
                <div className='flex flex-row-reverse'>
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MeComponent;
