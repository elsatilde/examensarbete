import { Ionicons } from "@expo/vector-icons"
import { Tabs, useRouter, useSegments } from "expo-router"
import { colors } from "../../variables/colors"
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import ThemedView from "../../components/ThemedView";

export default function DashboardLayout() {
    const router = useRouter();
    const segments = useSegments();

    const onLogout = () => {
       router.replace("/(auth)/login")
    }

    const isHome = segments.length > 0 && segments[0] === "index";

  return (
    <View style={{ flex: 1 }}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.push("/(dashboard)")}>
                <Text style={styles.logo}>Stilista</Text>
            </TouchableOpacity>

            {isHome && (
                <TouchableOpacity onPress={onLogout}>
                    <Ionicons 
                        name="log-out-outline" 
                        size={24} 
                        color={colors.iconColor}
                    />  {/* Funkar inte riktigt */}
                </TouchableOpacity>
            )}

        </View>
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
    </View>
 
  )
}

const styles = StyleSheet.create({
    header: {
      height: 70,
      paddingHorizontal: 20,
      paddingTop: 25,
      marginTop: 25,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.background ,
    },
    logo: {
      fontSize: 24,
      fontWeight: "600",
    },
  });
