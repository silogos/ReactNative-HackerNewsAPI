import * as React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StoriesScreen from '../screens/Stories';

const Stack = createStackNavigator();

export default function RootNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name="Stories"  
                    options={{ title: 'Stories' }} 
                    component={StoriesScreen} 
                />
                {/* <Stack.Screen 
                    name="StoryDetail"  
                    options={{ title: 'Story Detail' }} 
                    component={StoryDetailScreen}
                /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}  
