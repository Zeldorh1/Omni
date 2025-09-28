import React from 'react';
import { View, Text, FlatList, SafeAreaView, Pressable } from 'react-native';
import { useFavs } from '@/context/FavoritesContext';
import { useNavigation } from '@react-navigation/native';

export default function Favorites(){
  const favs = useFavs();
  const nav = useNavigation<any>();
  const items = favs.list();
  return (
    <SafeAreaView style={{ flex:1, backgroundColor:'#fff' }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 22, fontWeight:'800', marginBottom: 12 }}>Favorites</Text>
        <FlatList
          data={items}
          keyExtractor={(i)=>i.id}
          renderItem={({ item }) => (
            <Pressable onPress={()=>nav.navigate('ProductDetails', { id: item.id })} style={{ padding: 12, backgroundColor:'#fafafa', borderRadius: 12, marginBottom: 10 }}>
              <Text style={{ fontWeight:'700' }}>{item.name}</Text>
              <Text>{item.brand}</Text>
            </Pressable>
          )}
          ListEmptyComponent={<Text>No favorites yet.</Text>}
        />
      </View>
    </SafeAreaView>
  );
}
