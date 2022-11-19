import { COORD } from '../actions';

const coord = (coord =[51.5085,-0.1257], action) => {
    switch (action.type) {
        case COORD:
            return action.coord;
        default:
            return coord;
    }
};

export default coord;
