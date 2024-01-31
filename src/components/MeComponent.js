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

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:7475/account/${localStorage.getItem('username')}`, {
            method: 'GET',
            credentials: 'include',
        })  .then((response) => 
            {
                if(response.status !== 200) navigate('/login');
                return response.json()
            }
        )  .then((data) => {
                //console.log("data"+data)
                dispatch({ type: 'SET_NICKNAME', payload: data.nickname });
                dispatch({ type: 'SET_EMAIL', payload: data.email });
                dispatch({ type: 'SET_AVATAR', payload: data.avatar });
                dispatch({ type: 'SET_AVATARTYPE', payload: data.avatarType });
                setAccount(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
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

                fetch('http://localhost:7475/preferences', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nickname: editedNickname,
                        email: editedEmail,
                        avatar: base64String,
                    }),
                    credentials: 'include',
                })  
                .then((response) => response.json())
                .catch((error) => {
                    console.error('Error applying changes:', error);
                });
            };
            reader.readAsDataURL(editedAvatar);
        } else {
            fetch('http://localhost:7475/preferences', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nickname: editedNickname,
                    email: editedEmail,
                }),
                credentials: 'include',
            })
                .then((response) => response.json())
                .then((data) => {

                })
                .catch((error) => {
                    console.error('Error applying changes:', error);
                });
        }

        dispatch({ type: 'TOGGLE_EDITING' });
    };

    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        setEditedAvatar(file);
    };

    return (
        <div className='flex flex-col' >
            <div className='my-4 p-2 ml-4' style={{backgroundColor:theme.color4}}>
                <div>
                    {state.isEditing ? (
                        <input
                            type="file"
                            accept="image/png, image/jpeg"
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
        </div>
    );
};

export default MeComponent;
