import {AUTH} from '../actions';

let initialState = {
    user: null,
    status: null
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case AUTH:
            return {user: action.user, status: action.status};
        default:
            return state;
    }
};

export default auth;
