import React, { useState, useEffect }  from 'react';
import { View, Text, RefreshControl } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import { useSafeArea } from 'react-native-safe-area-context';
import Moment from 'moment';

import { Styles } from '../../styles'
import style from './style'
import WebViewAutoHeight from '../../components/WebViewAutoHeight';
import CommentList from './components/CommentList';
import * as Api from '../../services/api';

function StoryDetailScreen({ navigation }) {
    let { bottom } = useSafeArea()
    const route = useRoute();
    const [ loading, setLoading ] = useState(false)
    const [ item, setItem ] = useState(route.params)
    
    async function _refresh() {
		try {
			setLoading(true)
            let response = await Api.getItem(item.id)
            console.log(response.data)
            setItem(response.data)
		} catch (err) {
			alert(err);
		} finally {
			await setLoading(false)
		}
    }
	
	useEffect(() => {
		_refresh()
	}, [])

	return (
		<View style={[style.container, { paddingBottom: bottom }]}>
			{ 
				loading && (
					<View style={style.progressBar}>
						
					</View>
				)
			}

            <ScrollView 
                style={{ flex: 1 }}
				refreshControl={<RefreshControl refreshing={loading} onRefresh={_refresh} />}
            >
                <View style={style.headerWrapper}>
                    <Text style={[Styles.fontTitle2]}>{ item.title }</Text>
                    <View style={{ marginTop: 10, flexDirection: 'row', flexWrap: 'wrap' }}>
                    {/* 285 points by tambourine_man 5 hours ago | hide | past | web | favorite | 100 comments */}
                        <Text style={[Styles.fontCaption]}>{`${item.score} points `}</Text>
                        {/* <Text style={[Styles.fontCaption]}>{`by ${item.by} `}</Text> */}
                        <Text style={[Styles.fontCaption]}>{ `${Boolean(item.time) && Moment.unix(item.time).calendar()} ` }</Text>
                        <Text style={[Styles.fontCaption]}>{ `${Boolean(item.kids) && item.kids.length} comments` }</Text>
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
                    <CommentList keys={item.kids} />
                </View>
            </ScrollView>
            
		</View>
	);
}

export default StoryDetailScreen