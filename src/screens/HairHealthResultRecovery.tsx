import React from 'react';
import { View, Text, SafeAreaView, FlatList, Pressable } from 'react-native';
import d from '@/theme/design';

const products = [
  { id:'b1', name:'Bond Repair Treatment', price:28.99 },
  { id:'b2', name:'Deep Conditioner', price:18.99 },
  { id:'b3', name:'Wide-Tooth Comb', price:6.99 }
];

export default function HairHealthResultRecovery(){
  return (
    <SafeAreaView style={{ flex:1, backgroundColor: d.colors.bg }}>
      <View style={{ padding: 16 }}>
        <Text style={[d.fonts.h1, { marginBottom: 8 }]}>Your scan shows signs of dryness and split ends.</Text>
        <Text style={[d.fonts.p, { color: d.colors.muted, marginBottom: 16 }]}>
          Here’s a recovery bundle to help repair and protect your hair for the next 30 days.
        </Text>

        <Text style={[d.fonts.h3, { marginBottom: 8 }]}>Recovery Bundle</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={products}
          keyExtractor={(i)=>i.id}
          renderItem={({ item }) => (
            <View style={{ backgroundColor:'#fff', borderRadius: d.radius.lg, padding: 12, marginRight: 10, width: 160 }}>
              <View style={{ height: 80, backgroundColor:'#E5E7EB', borderRadius: d.radius.md, marginBottom: 8 }} />
              <Text style={{ fontWeight:'700' }} numberOfLines={1}>{item.name}</Text>
              <Text style={{ color: d.colors.muted }}>${item.price.toFixed(2)}</Text>
            </View>
          )}
        />

        <Pressable style={{ backgroundColor:'#111', padding: 14, borderRadius: d.radius.lg, alignItems:'center', marginTop: 14 }}>
          <Text style={{ color:'#fff', fontWeight:'800' }}>Add Bundle to Cart</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
