import { createAction, props } from "@ngrx/store";

export const SET_SESSION= createAction('[SESSION] SET',props<{item: any}>())
export const GET_SESSION= createAction('[SESSION] GET')
export const RESET_SESSION= createAction('[SESSION] RESET')