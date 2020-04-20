import React, { useState, useEffect }  from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import style, { COLUMN } from '../style'
import { Styles, Sizes } from '../../../styles';
import itemStore from '../../../stores/itemStore';
import * as Api from '../../../services/api';
import CommentItem from './CommentItem';

export default CommentList = React.memo((props) => {
	const NUM_RENDER = 12
	const {
		state,
		action: { setKeys, setData, setDataLoading, resetData }
	} = itemStore({ key: 'COMMENT_LIST' })	

	async function loadData(first = false) {
		try {
			if(!first && (state.loading || state.data.loading || !state.data.loadmore)) return false
            setDataLoading(true)
			let firstItem = (state.data.page - 1) * NUM_RENDER
			let keysList = state.keys.slice(firstItem, firstItem + NUM_RENDER)
			let response = await Promise.all(keysList.map((key) => Api.getItem(key)))
			let newData = response.map((e) => e.data).filter((e) => (!e.deleted || !e.dead))
            setData({
				items: [...state.data.items, ...newData],
				page: state.data.page + 1,
				loadmore: state.keys.length >= NUM_RENDER * state.data.page
			})
		} catch (err) {
			alert(err);
		} finally {
			setDataLoading(false)
		}
	}

	useEffect(() => {
		if(state.keys && state.keys.length > 0) {
			resetData()
			loadData(true)
		}
	}, [state.keys])

	useEffect(() => {
		setKeys(props.keys)
	}, [props.keys])

	return (
		<FlatList 
			keyExtractor={(item) => item.id} 
			data={state.data.items}
			renderItem={(props) => <CommentItem {...props} />}
			ListEmptyComponent={!state.data.loading && <Text style={[Styles.fontBody1]}>Not found</Text>}
			ListFooterComponent={() => {
				return state.data.loading ? (
					<View style={style.footerWrapper}>
						<ActivityIndicator size={'small'} />
					</View>
				) : (state.keys && !state.data.loading && state.data.loadmore) ? (
					<TouchableOpacity style={style.footerWrapper} onPress={loadData} >
						<Text style={[Styles.fontBody1, { color: 'blue', textDecorationLine: 'underline' }]}>Loadmore</Text>
					</TouchableOpacity>
				) : null
			}}
		/>
	)
})