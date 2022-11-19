import { POST_COORD } from '../actions';

const postCoord = (postCoord = null, action) => {
    switch (action.type) {
        case POST_COORD:
            return action.postCoord;
        default:
            return postCoord;
    }
};

export default postCoord;
