import React, { useState, useEffect }  from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import style, { COLUMN } from '../style'
import { Styles, Sizes } from '../../../styles';

const ListItem = ({ item, index, goTo }) => {
	let firstColumn = index % COLUMN === 0 
	return (
		<TouchableHighlight underlayColor={'#CCC'} onPress={() => goTo(item)} style={[style.listItem, firstColumn && { borderLeftWidth: 1 }]}>
			<View style={{ flex: 1, justifyContent: 'space-between' }}>
				<Text style={[Styles.fontTitle1, { textAlign: 'center' }]}>{item.title}</Text>
				<View style={{ flexDirection: 'row', marginTop: Sizes.margin, justifyContent: 'space-between' }}>
					<Text style={[Styles.fontCaption]}>Score: {item.score}</Text>
					<Text style={[Styles.fontCaption]}> Comentar: {item.kids ? item.kids.length : 0}</Text>
				</View>
			</View>
		</TouchableHighlight>
	)
}

export default React.memo(ListItem)