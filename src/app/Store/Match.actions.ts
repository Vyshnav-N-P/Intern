import { createAction,props } from "@ngrx/store";

export const matchs=createAction('[Match page] Matchs',props<{players:Number,slot:Number}>);
export const Addplayer=createAction('[Add player] Add player',props<{players:Number,slot:Number}>);
export const Subplayer=createAction('[Sub player] Sub player',props<{players:Number,slot:Number}>)