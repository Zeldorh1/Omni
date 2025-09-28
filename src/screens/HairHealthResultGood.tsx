import React from 'react';
import { View, Text, SafeAreaView, FlatList, Pressable } from 'react-native';
import d from '@/theme/design';

const products = [
  { id:'a1', name:'Scrunchies', price:12.98 },
  { id:'a2', name:'Hair Ties', price:7.48 },
  { id:'a3', name:'Brush', price:14.99 }
];

export default function HairHealthResultGood(){
  return (
    <SafeAreaView style={{ flex:1, backgroundColor: d.colors.bg }}>
      <View style={{ padding: 16 }}>
        <Text style={[d.fonts.h1, { marginBottom: 8 }]}>Wow! Your hair is almost perfect ✨</Text>
        <Text style={[d.fonts.p, { color: d.colors.muted, marginBottom: 16 }]}>
          No major concerns detected. Keep doing what you’re doing — here are some fun accessories you might love, like scrunchies or a brush to make styling easier.
        </Text>

        <Text style={[d.fonts.h3, { marginBottom: 8 }]}>Suggested Products</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={products}
          keyExtractor={(i)=>i.id}
          renderItem={({ item }) => (
            <View style={{ backgroundColor:'#fff', borderRadius: d.radius.lg, padding: 12, marginRight: 10, width: 140 }}>
              <View style={{ height: 80, backgroundColor:'#E5E7EB', borderRadius: d.radius.md, marginBottom: 8 }} />
              <Text style={{ fontWeight:'700' }}>{item.name}</Text>
              <Text style={{ color: d.colors.muted }}>${item.price.toFixed(2)}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
