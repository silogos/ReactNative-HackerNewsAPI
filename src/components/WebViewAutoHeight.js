import React, { Component, useState, useRef } from "react"
import { View, Linking } from "react-native"
import { WebView } from "react-native-webview"
import { Sizes } from "../styles"

export default function WebViewAutoHeight({ content, style, maxHeight }) {
    let webView  = useRef()
    let [ height, setHeight ] = useState(0)
    let _height = maxHeight ? Math.min(height, maxHeight) : height
    function frame(content) {
        return `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta http-equiv="content-type" content="text/html; charset=utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=3, minimum-scale=0.7">
                    <style>
                        * {
                            -webkit-touch-callout: none;
                            -webkit-user-select: none;  
                            padding: 0;
                            margin: 0;
                            word-break: break-word !important;
                            font-size: ${Sizes.fontSizeBase}px;
                        }
                        body {
                            max-width: 100%;
                            overflow: hidden;
                            padding: 0;
                            margin: 0;
                        }
                        img {
                            display: inline;
                            height: auto;
                            max-width: 100% ;
                            margin: 10px 0;
                        }            
                    </style>
                </head>
                <body>${content}</body>
            </html>
        `
    }

    function onShouldStartLoadWithRequest(navigator) {
      if (navigator.url === 'about:blank') {
        return true;
      } else if(navigator.navigationType === "click" && navigator.url !== 'about:blank') {
        Linking.openURL(navigator.url)
        return false;
      } else {
        webView.current.stopLoading(); //Some reference to your WebView to make it stop loading that URL
        return false;
      }    
    }

    return (
      <View style={[{ padding: 0, margin: 0 }, style]}>
        <WebView
          ref={webView}
          style={{ height: _height, backgroundColor: 'transparent' }} 
          source={{ html: frame(content) }}
          scrollEnabled={false}
          onNavigationStateChange={onShouldStartLoadWithRequest}
          onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
          onLoad={() =>
            webView.current.injectJavaScript(
              "window.ReactNativeWebView.postMessage(document.documentElement.getBoundingClientRect().height)"
            )
          }
          onMessage={e => {
            const message = e.nativeEvent.data;
            setHeight(parseInt(message))
          }}
        />
      </View>
    )
}