import { SET_SESSION } from "../actions";

const initialState = {
    session: {}
};

function rootReducer(state = initialState, action) {
    switch(action.type){
        case SET_SESSION:
            console.log('das')
            return {
                session:action.payload
            }
    }
    return state;
};

export default rootReducer;