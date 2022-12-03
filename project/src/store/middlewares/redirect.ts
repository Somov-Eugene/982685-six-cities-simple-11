import { Middleware } from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { rootReducer } from './../root-reducer';
import { NameSpace } from '../../const';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) => (next) => (action: PayloadAction<string>) => {
    if (action.type === `${NameSpace.App}/redirectToRoute`) {
      browserHistory.push(action.payload);
    }

    return next(action);
  };
