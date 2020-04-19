import React, { useState, useEffect }  from 'react';
import { View, Text, RefreshControl, ActivityIndicator, TouchableHighlight } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSafeArea } from 'react-native-safe-area-context';

import Colors from '../../styles/Colors';
import itemStore from '../../stores/itemStore';
import { Sizes, Styles } from '../../styles';

import ListItem from './components/ListItem';
import style, { COLUMN } from './style'

const MENUS = [
	{ key: 'TOP_STORIES', title: 'Top', url: 'topstories' },
	{ key: 'NEW_STORIES', title: 'New', url: 'newstories' },
	{ key: 'SHOW_STORIES', title: 'Show', url: 'showstories' },
	{ key: 'ASK_STORIES', title: 'Ask', url: 'askstories' },
	{ key: 'JOB_STORIES', title: 'Job', url: 'jobstories' }
]

function StoriesScreen({ navigation }) {
	const insets = useSafeArea();	
	const [selectedMenu, setSelectedMenu] = useState(MENUS[0]);	
	let {
		state: state,
		action: { setLoading, setDataLoading, _getKeys, _getData }
	} = itemStore(selectedMenu)	
	console.log(selectedMenu.name, state)
	
	async function _refresh() {
		try {
			setLoading(true)
			await _getKeys()
		} catch (err) {
			alert(err);
		} finally {
			await setLoading(false)
		}
	}

	async function loadData(first = false) {
		try {
			if(!first && (state.loading || state.data.loading || state.data.loadmore)) return false
			setDataLoading(true)
			await _getData()
		} catch (err) {
			alert(err);
		} finally {
			setDataLoading(false)
		}
	}
	
	useEffect(() => {
		_refresh()
	}, [selectedMenu])

	useEffect(() => {
		if(state.keys.length > 0) {
			loadData(true)
		}
	}, [state.keys])

	function goTo(item) {
		navigation.navigate('StoryDetail', item)
	}

	return (
		<View style={[style.container, { paddingBottom: insets.bottom }]} >
			{ 
				state.loading && (
					<View style={style.progressBar}>
						
					</View>
				)
			}

			<View style={{ padding: Sizes.margin, borderBottomWidth: 1 }}>
				<View style={{ flexDirection: 'row', height: 50, borderRadius: 10, backgroundColor: '#CCC', overflow: 'hidden' }}>
					{	
						MENUS.map((menu) => (
							<TouchableHighlight underlayColor={'#F2F2F2'} key={menu.key} onPress={() => setSelectedMenu(menu)} style={{ flex: 1, justifyContent: 'center', backgroundColor: selectedMenu.key === menu.key ? '#F2F2F2' : 'transparent' }}>
								<Text style={[Styles.fontTitle1, { textAlign: 'center' }]}>{ menu.title }</Text>
							</TouchableHighlight>
						))
					}
				</View>
			</View>

			<FlatList 
				keyExtractor={(item) => item.id} 
				style={{ flex: 1, borderBottomWidth: 1 }}
				contentContainerStyle={{ borderTopWidth: 1 }}
				numColumns={COLUMN}
				data={state.data.items}
				ListFooterComponent={() => state.data.loading && (
					<View style={style.footerWrapper}>
						<ActivityIndicator size={'small'} />
					</View>
				)}
				renderItem={(props) => <ListItem goTo={goTo} {...props} /> }
				onEndReachedThreshold={0.7}
				onEndReached={loadData}
				refreshControl={<RefreshControl refreshing={state.loading} onRefresh={_refresh} />}
			/>
		</View>
	);
}

export default StoriesScreen