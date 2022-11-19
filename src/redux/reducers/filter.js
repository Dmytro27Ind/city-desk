import { FILTER } from '../actions';

const filter = (filter = 'unsolved', action) => {
    switch (action.type) {
        case FILTER:
            return action.filter;
        default:
            return filter;
    }
};

export default filter;
