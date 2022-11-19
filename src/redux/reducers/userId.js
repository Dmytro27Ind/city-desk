import { USER_ID } from '../actions';

const userId = (id = null, action) => {
    switch (action.type) {
        case USER_ID:
            return action.id;
        default:
            return id;
    }
};

export default userId;
