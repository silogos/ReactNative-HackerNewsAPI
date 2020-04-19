import React, { useState } from "react"
import { View, Text } from "react-native"
import Moment from "moment"
import WebViewAutoHeight from "./WebViewAutoHeight"
import { Styles, Sizes } from "../styles"

function CommentList ({ item }) {
    return (
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
                {/* <Text style={[Styles.fontCaption, { marginRight: Sizes.margin }]}>By {item.by}</Text> */}
                <Text style={[Styles.fontCaption, { marginRight: Sizes.margin, color: 'blue' }]}>{item.kids ? item.kids.length : 0} Balasan</Text>
            </View>
        </View>

    )
}

export default CommentList