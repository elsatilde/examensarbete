import { Ionicons } from "@expo/vector-icons"
import { Tabs, useRouter, useSegments } from "expo-router"
import { colors } from "../../variables/colors"
import { TouchableOpacity, View, StyleSheet, Text, Alert } from "react-native";
import ThemedView from "../../components/ThemedView";
import { useUser } from "../../hooks/useUser";
import { useFonts } from "expo-font";

export default function DashboardLayout() {
    const router = useRouter();
    const segments = useSegments();
    const { logout } = useUser();

    const onLogout = async () => {
        Alert.alert(
            "Log out",
            "Are you sure you want to logout?",
            [{ text: "Cancel" }, { text: "Log out", onPress: async () => {
                await logout();
                router.replace("/(auth)/login");
                console.log("Logout successful!");
            },},],
            { cancelable: true }
        );
    };

    const lastSegment = segments.at(-1);
    const isHome = segments.length === 1;
    const isClosetPage = lastSegment === "closet";


    const [fontsLoaded] = useFonts({
        StilistaFont: require("../../variables/fonts/Karina.ttf"), 
      });
      if (!fontsLoaded) return null; 


  return (
    <ThemedView style={{ flex: 1 }}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.push("/(dashboard)")}>
                <Text style={styles.logo}>Stilista</Text>
            </TouchableOpacity>

            {isHome && (
                <TouchableOpacity onPress={onLogout}>
                    <Ionicons 
                        name={"log-out-outline"} 
                        size={30} 
                        color={colors.accent}
                    />  
                </TouchableOpacity>
            )}

            {isClosetPage && (
                <TouchableOpacity 
                    onPress={() => router.push("/(dashboard)/add-garment")} 
                    style={{ flexDirection: 'row', alignItems: 'center'}}
                >
                    <Ionicons 
                        name={"add-outline"} 
                        size={25} 
                        color={colors.text} 
                    /> 
                    <Text style={styles.text}> Add garment </Text>
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
            <Tabs.Screen
                name="add-garment"
                options={{ href: null, title: ''}}
            />
            <Tabs.Screen
                name="camera"
                options={{ href: null, title: ''}}
            />
            <Tabs.Screen
                name="library"
                options={{ href: null, title: ''}}
            />
        </Tabs>
    </ThemedView>
 
  )
}

const styles = StyleSheet.create({
    header: {
      height: 70,
      paddingHorizontal: 20,
      paddingTop: 25,
      marginTop: 45,
      marginLeft: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.background ,
    },
    logo: {
      fontSize: 40,
      fontFamily: "StilistaFont",
      color: colors.accent
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.text
    }
  });
