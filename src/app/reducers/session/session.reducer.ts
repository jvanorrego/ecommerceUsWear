import { createReducer, on } from '@ngrx/store';
import { SET_SESSION, RESET_SESSION, GET_SESSION } from './session.actions';



export const initialState={
    SESSION: {}
};

export const sesionReducer= createReducer(initialState, 
    on(SET_SESSION, (state)=> {
        return{
        ...state, SESSION: state
    }} ),
    on(RESET_SESSION, (state)=> ( {...state, SESSION:{} })),
    on(GET_SESSION, state => state)
)