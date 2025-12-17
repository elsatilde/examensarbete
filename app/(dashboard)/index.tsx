import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ThemedView from '../../components/ThemedView'
import { colors } from '../../variables/colors'
import { Garment } from '../../types/Garment.types'
import { Outfit } from '../../types/Outfit.types'
import { getLatestGarments } from '../../services/garments'
import { getLatestOutfits } from '../../services/outfits'
import { useUser } from '../../hooks/useUser'
import CategoryList from '../../components/CategoryList'
import DispalyOutfit from '../../components/DisplayOutfit'
import ShimmerClosetList from '../../components/ShimmerClosetList'
import ShimmerOutfitList from '../../components/ShimmerOutfitList'

const Home = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [latestGarments, setLatestGarments] = useState<Garment[]>([]);
  const [latestOutfits, setLatestOutfits] = useState<Outfit[]>([]);

  useEffect(() => {
    if (!user) return;
    
    setLoading(true);

    const load = async () => {
      const [garments, outfits] = await Promise.all([
        getLatestGarments(user, 5),
        getLatestOutfits(user, 3),
      ]);

      setLatestGarments(garments);
      setLatestOutfits(outfits);
      setLoading(false);
    };
    load();
  }, [user]);

  return (
    <ThemedView style={styles.container} safe={true}>

      <Text style={styles.title}> Welcome to your digital wardrobe ✨ </Text>

      <Text style={styles.text}> New in your Closet </Text>
      {loading ? (
        <>
          <ShimmerClosetList />
        </>
      ) : (
        <>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
          {latestGarments.map(item => ( 
            <CategoryList 
              key={item.id} 
              item={item} 
            />
          ))}
          </ScrollView>
        </>
      )}
      {!loading && latestGarments.length === 0 && (
        <Text style={styles.NOtext}> No Garments yet, start adding in your Closet ✨</Text>
      )}

      <Text style={styles.text}> Recently created Outfits </Text>
      {loading ? (
        <>
          <ShimmerOutfitList />
        </>
      ) : (
        <>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
            {latestOutfits.map((outfit, index) => (
              <View key={outfit.id} style={{ marginRight: index === latestOutfits.length - 1 ? 0 : 10 }}>
              <DispalyOutfit 
                outfit={outfit}
                user={user}
                variant='compact'
              />
              </View>
            ))}
          </ScrollView> 
        </>
      )}
      {!loading && latestOutfits.length === 0 && (
        <Text style={styles.NOtext}> No Outfits yet, start creating in Create ✨</Text>
      )}
    </ThemedView>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: colors.text,
        marginTop: -30,
        marginBottom: 20,
        paddingLeft: 20,
        paddingVertical: 30,
        backgroundColor: colors.muted,
    },
    text: {
        fontWeight: '500',
        fontSize: 16,
        color: colors.text,
        marginBottom: 20,
        marginTop: 15,
        paddingLeft: 20,
        textDecorationLine: 'underline',
    },
    NOtext: {
      fontWeight: '700',
      color: colors.iconColor,
      fontSize: 18,
      marginBottom: 10,
      marginTop: 10,
    },   
})