import { createSlice } from '@reduxjs/toolkit';
import { PEOPLE } from './constants';

const configSlice = createSlice({

    name: 'config',
initialState: {
        expandSideBar: true,
        user: {},
        familyMembers: PEOPLE,
        isNotificationWindowOpened: false

    },
    reducers: {
       toggleSideBar: (state, action) => {
        state.expandSideBar = !state.expandSideBar;
       },
       addUser: (state, action) => {
        state.user = {
            ...state.user,
            ...action.payload,
        };
        state.familyMembers[0] = {
            id: state.familyMembers.length + 1,
            name: state.user.displayName,
            image: 'https://i.pravatar.cc/150?img=11'
        }
       },
       removeUser: (state, action) => {
        state.user = {};
       },
       toggleNotificationWindow: (state, action) => {
        state.isNotificationWindowOpened = !state.isNotificationWindowOpened
       }
    }
})

export const { toggleSideBar, addUser, removeUser, toggleNotificationWindow } = configSlice.actions;
export default configSlice.reducer;
