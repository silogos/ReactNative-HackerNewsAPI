import React, { useReducer }  from 'react';
import * as api from '../services/api';

function itemStore(stories, initState = {}) {
	const NUM_RENDER = 12
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
		console.groupEnd(`${stories.name} reducer`)
    
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

	async function _getKeys() {
		dispatch({ type: 'RESET_DATA' })
		let response = await api.getKeys(stories.url)
		dispatch({ type: 'SET_KEYS', payload: response.data })
		return response
	}	

	async function _getData() {
		let firstItem = state.data.page * NUM_RENDER
		let keysList = state.keys.slice(firstItem, firstItem + NUM_RENDER)
		let response = await Promise.all(keysList.map((key) => api.getItem(key)))
		let newData = response.map((e) => e.data)

		dispatch({ 
			type: 'SET_DATA', 
			payload: {
				items: [...state.data.items, ...newData],
				page: state.data.page + 1,
				loadmore: state.keys.length >= NUM_RENDER * state.data.page
			}
		})

		return newData
	}

	function setLoading(active) {
		dispatch({ type: 'SET_LOADING', payload: active })
	}

	function setDataLoading(active) {
		dispatch({ type: 'SET_DATA_LOADING', payload: active })
	}

	return {
		state: state,
		dispatch: dispatch,
		action: { setLoading, setDataLoading, _getKeys, _getData }
	};
}

export default itemStore