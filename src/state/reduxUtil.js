import { isError, isFunction } from 'lodash/fp';
import immutable from 'object-path-immutable';

/**
 * Creates a flux-standard-action
 *
 * @param {String} type - Action type
 * @param {Any} [payload] - The payload value, undefined is okay
 * @param {Any} [meta] - A meta value with any information not required to consume the action, but might be useful for context
 * @param {Boolean} [forceError=false] - Flag to force the action to be an error
 * @returns {Action}
 */
export const createAction = (type, payload, meta, forceError = false) => ({
	type,
	payload,
	meta,
	error: forceError || isError(payload),
});

export const isAction = (action) => !isNil(action) && ['type', 'payload', 'error'].every(x => action.hasOwnProperty(x));

const updateLineage = (action, type) => immutable.insert(action, 'meta.lineage', type, 0);

// @todo: immutable-flat instead of nested-recursive
const wrapDispatch = (dispatch, getState, extraArg, type) =>
	(action) => {
		if (isFunction(action)) {
			return action(wrapDispatch(dispatch, getState, extraArg, type), getState, extraArg);
		}

		// If we're dispatching a normal action, just add the lineage entry and go on
		return dispatch(updateLineage(action, type));
	};


export const pending = (type) => `${type}_PENDING`;
export const PENDING_VALUE = '';

/**
 * Fire an async action thunk that tracks pending state.
 *
 * @param {String} type - Name of the action
 * @param {Redunk} promiseThunk - The action thunk to run
 * @param {Any} [pendingPayload] - Optional payload for the pending action
 * @param {Any} [meta] - Optional meta for the action
 * @returns {Redunk} - The wrapped thunk
 */
export const createAsyncAction = (type, promiseThunk, pendingPayload = PENDING_VALUE, meta = undefined) =>
	(dispatch, getState, extraArg) => {
		const wrapped = wrapDispatch(dispatch, getState, extraArg, type);

		wrapped(createAction(pending(type), pendingPayload, meta));

		return promiseThunk(wrapped, getState, extraArg)
			.then(
				res => wrapped(createAction(type, res, meta)),
				rej => Promise.reject(wrapped(createAction(type, res, meta, true)))
			);
	};
