import { createAction, props } from "@ngrx/store";
import { User } from "../models/user.model";

export const loginStart = createAction('[Auth] Login Start', props<{ email: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: User }>());

export const registerStart = createAction('[Auth] Register Start', props<{ email: string; password: string }>());
export const registerSuccess = createAction('[Auth] Register Success', props<{ user: User }>());

export const logout = createAction('[Auth] Logout');