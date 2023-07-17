import { ActionTypes } from "../actionTypes";
import { createAction, props } from '@ngrx/store';

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{ username: string; email: string, password: string }>()
);
