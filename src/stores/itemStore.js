import React, { useReducer }  from 'react';

function itemStore(stories, initState = {}) {
	const initialState = {
		keys: [],
		data: {
			loadmore: true,
			page: 1,
			items: [],
			loading: false
		},
		loading: false,
		...initState
	};
	const reducer = (state, action) => {
		console.group(`${stories.key} reducer`)
		console.log('STATES: ', state)
		console.log(action.type, action.payload)
		console.groupEnd()
    
		switch (action.type) {
			case 'SET_LOADING':
				return { ...state, loading: action.payload };
			case 'SET_KEYS':
				return { ...state, keys: action.payload };
			case 'SET_DATA':
				return { ...state, data: { ...state.data, ...action.payload } }
			case 'SET_DATA_LOADING':
				return { ...state, data: { ...state.data, loading: action.payload } };
			case 'RESET_DATA':
				return { ...state, data: { loadmore: true, page: 1, items: [], loading: false } };
			default:
				throw new Error();
		}
	}
	
	const [state, dispatch] = useReducer(reducer, initialState);


	function setKeys(payload) {
		dispatch({ type: 'SET_KEYS', payload: payload })
	}

	function setLoading(active) {
		dispatch({ type: 'SET_LOADING', payload: active })
	}

	function setData(payload) {
		dispatch({ type: 'SET_DATA', payload: payload })
	}

	function setDataLoading(active) {
		dispatch({ type: 'SET_DATA_LOADING', payload: active })
	}

	function resetData() {
		dispatch({ type: 'RESET_DATA' })
	}

	return {
		state: state,
		dispatch: dispatch,
		action: { setKeys, setLoading, setData, setDataLoading, resetData }
	};
}

export default itemStore