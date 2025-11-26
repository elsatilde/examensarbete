import { Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import { colors } from "../../variables/colors"

export default function DashboardLayout() {

  return (
    <Tabs 
        screenOptions={{ 
            headerShown: false,
            tabBarStyle: { paddingTop: 10, height: 90, backgroundColor: colors.muted },
            tabBarActiveTintColor: colors.iconColor,
            tabBarInactiveTintColor: colors.iconColor,
        }}       
    >
        <Tabs.Screen 
            name="closet" 
            options={{ title: 'Closet', tabBarIcon: ({ focused }) => (
                <Ionicons
                    size={24}
                    name={focused ? 'shirt' : 'shirt-outline'}
                    color={colors.iconColor}
                />
            ) }} 
        />
        <Tabs.Screen 
            name="create" 
            options={{ title: 'Create', tabBarIcon: ({ focused }) => (
                <Ionicons
                    size={24}
                    name={focused ? 'add-circle' : 'add-circle-outline'}
                    color={colors.iconColor}
                />
            ) }} 
        />
         <Tabs.Screen 
            name="outfits" 
            options={{ title: 'Outfits', tabBarIcon: ({ focused }) => (
                <Ionicons
                    size={24}
                    name={focused ? 'heart' : 'heart-outline'}
                    color={colors.iconColor}
                />
            ) }} 
        />
        <Tabs.Screen
            name="index"
            options={{ href: null, title: ''}}
        />
    </Tabs>
 
  )
}
