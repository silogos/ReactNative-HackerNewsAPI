import React, { useState } from "react"
import { View, Text } from "react-native"
import Moment from "moment"
import WebViewAutoHeight from "../../../components/WebViewAutoHeight"
import { Styles, Sizes } from "../../../styles"
import CommentList from "./CommentList"

function CommentItem ({ item }) {
	const [showChildren, setShowChildren] = useState(false)
   
    return (
        <View>
            <View style={{ marginTop: Sizes.margin/2, marginBottom: Sizes.margin }}>
                <View style={{ padding: Sizes.margin, backgroundColor: '#CCC' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 5 }}>
                        <Text style={[Styles.fontBody2]}>{item.by + '  '}</Text>
                        <Text style={[Styles.fontCaption]}>{ Boolean(item.time) && Moment.unix(item.time).calendar()}</Text>                                        
                    </View>
                    <View style={{ height: 1, backgroundColor: '#000' }} />
                    <WebViewAutoHeight content={item.text} />
                </View>
                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                    <Text onPress={() => item.kids.length > 0 && setShowChildren(!showChildren)} style={[Styles.fontCaption, { marginRight: Sizes.margin, color: 'blue' }]}>{item.kids ? item.kids.length : 0} Balasan</Text>
                </View>
            </View>
            {
                showChildren && (
                    <View style={{ marginLeft: Sizes.margin }}>
                        <CommentList keys={item.kids}  />
                    </View>
                )
            }
        </View>
    )
}

export default CommentItem