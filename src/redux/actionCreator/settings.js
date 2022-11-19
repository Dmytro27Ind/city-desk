import {LANGUAGE, COORD, AUTH, USER_ID, POST_COORD, FILTER} from '../actions';

function actionLanguage(lang) {
    return {
        type: LANGUAGE,
        lang: lang
    };
}

function actionCoord(coord){
    return{
        type: COORD,
        coord: coord
    }
}

function actionAuth(user, status) {
    return {
        type: AUTH,
        user: user,
        status: status
    };
}

function actionUserId(id){
    return{
        type: USER_ID,
        id: id
    }
}

function actionPostCoord(postCoord){
    return{
        type: POST_COORD,
        postCoord: postCoord
    }
}

function actionFilter(filter){
    return{
        type: FILTER,
        filter: filter
    }
}

export { actionLanguage, actionCoord, actionAuth, actionUserId, actionPostCoord, actionFilter};