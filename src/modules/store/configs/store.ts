import { createStore, Dispatch, Reducer } from 'redux';
import { State } from './store.service';
import { subscribe } from 'graphql';

type Store = {
	dispatch: Dispatch;
	getState: () => State;
	subscribe: (listener: () => void) => () => void;
	replaceReducer: (reducer: Reducer) => void;
};

// TODO: Actions uebergeben
// let store = createStore();
