import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, FlatList, SafeAreaView, Pressable, TextInput } from 'react-native';
import colors from '@/theme/colors';
import type { Product } from '@/data/types';
import ProductCard from '@/components/ProductCard';
import productsData from '@/data/products.json';
import { useNavigation } from '@react-navigation/native';

export default function Home(){
  const [products, setProducts] = useState<Product[]>([]);
  const [q, setQ] = useState('');
  const nav = useNavigation<any>();

  useEffect(() => { setProducts(productsData as any); }, []);

  const filtered = useMemo(()=>{
    const s = q.trim().toLowerCase();
    if(!s) return products;
    return products.filter(p => (p.name + ' ' + p.brand).toLowerCase().includes(s));
  }, [q, products]);

  const mockMic = () => {
    // Simple demo of voice intent—replace with real ASR later
    setQ('blonde');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: '800', marginBottom: 8 }}>LuxHair</Text>

        {/* Search bar with mic */}
        <View style={{ flexDirection:'row', alignItems:'center', backgroundColor:'#f3f4f6', borderRadius: 14, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 10 }}>
          <TextInput value={q} onChangeText={setQ} placeholder="Search products..." style={{ flex:1, padding: 4 }} />
          <Pressable onPress={mockMic}><Text style={{ fontWeight:'800' }}>🎤</Text></Pressable>
        </View>

        <Pressable onPress={() => nav.navigate('Bundles')} style={{ marginBottom: 12 }}>
          <Text style={{ color: colors.accent, fontWeight: '700' }}>See Bundles →</Text>
        </Pressable>

        <FlatList
          data={filtered}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <ProductCard product={item} onPress={() => nav.navigate('ProductDetails', { id: item.id })} />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
