import React, { useState, useEffect }  from 'react';
import { View, Text, ActivityIndicator, RefreshControl } from 'react-native';

import { FlatList, ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import { useSafeArea } from 'react-native-safe-area-context';
import Moment from 'moment';

import { Styles, Sizes, Colors } from '../../styles'
import style from './style'
import WebViewAutoHeight from '../../components/WebViewAutoHeight';
import CommentList from '../../components/CommentList';
import itemStore from '../../stores/itemStore';
import * as Api from '../../services/api';

const NUM_RENDER = 12

function StoryDetailScreen({ navigation }) {
    let { bottom } = useSafeArea()
    const route = useRoute();
    const [ item, setItem ] = useState(route.params)
    let {
		state,
		action: { setKeys, setLoading, setData, setDataLoading, resetData }
    } = itemStore({ key: 'COMMENT_LIST' })	
    // console.log({ item, state })
    async function _refresh() {
		try {
			setLoading(true)
			resetData()
			let response = await Api.getItem(item.id)
            setItem(response.data)
            setKeys(response.data.kids)
		} catch (err) {
			alert(err);
		} finally {
			await setLoading(false)
		}
    }

	async function loadData(first = false) {
		try {
			if(!first && (state.loading || state.data.loading || !state.data.loadmore)) return false
            setDataLoading(true)
			let firstItem = (state.data.page - 1) * NUM_RENDER
			let keysList = state.keys.slice(firstItem, firstItem + NUM_RENDER)
			let response = await Promise.all(keysList.map((key) => Api.getItem(key)))
			let newData = response.map((e) => e.data).filter((e) => !e.deleted)
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
		_refresh()
	}, [])

	useEffect(() => {
		if(state.keys && state.keys.length > 0) {
			loadData(true)
		}
	}, [state.keys])


	return (
		<View style={[style.container, { paddingBottom: bottom }]}>
			{ 
				state.loading && (
					<View style={style.progressBar}>
						
					</View>
				)
			}

            <ScrollView 
                style={{ flex: 1 }}
				refreshControl={<RefreshControl refreshing={state.loading} onRefresh={_refresh} />}
            >
                <View style={style.headerWrapper}>
                    <Text style={[Styles.fontTitle3]}>{ item.title }</Text>
                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[Styles.fontCaption]}>By {item.by}</Text>
                        <Text style={[Styles.fontCaption]}>{ Boolean(item.time) && Moment.unix(item.time).calendar()}</Text>
                    </View>
                </View>
                <View style={style.descWrapper}>
                    <Text style={[Styles.fontTitle1]}>Deskripsi:</Text>
                    {   
                        item.text 
                            ? <WebViewAutoHeight content={item.text} />
                            : <Text style={[Styles.fontBody1]}>Not found</Text>
                    }
                </View>
                <View style={style.descWrapper}>
                    <Text style={[Styles.fontTitle1]}>Komentar:</Text>
                    <FlatList 
                        keyExtractor={(item) => item.id} 
                        style={{ flex: 1 }}
                        data={state.data.items}
                        renderItem={CommentList}
                        ListEmptyComponent={<Text style={[Styles.fontBody1]}>Not found</Text>}
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
                </View>
            </ScrollView>
            
		</View>
	);
}

export default StoryDetailScreen