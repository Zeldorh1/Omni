import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import d from '@/theme/design';
import HeroCardMono from '@/components/HeroCardMono';
import { PageBackground } from '@/context/ThemeContext';

const tiles = [
  { id:'t1', title:'Trending' },
  { id:'t2', title:'Bold Reds' },
  { id:'t3', title:'Soft Blush' },
  { id:'t4', title:'Cool Brunettes' }
];

export default function HomeStyled_BW(){
  const nav = useNavigation<any>();
  const [q, setQ] = useState('');

  return (
    <SafeAreaView style={{ flex:1, backgroundColor: d.colors.bg }}>
      <PageBackground>
        <View style={{ padding: 16 }}>
          {/* Search bar */}
          <View style={{ flexDirection:'row', alignItems:'center', backgroundColor:'#F3F4F6', borderRadius:d.radius.lg, paddingHorizontal:12, paddingVertical:10, marginBottom: 12 }}>
            <TextInput value={q} onChangeText={setQ} placeholder="Search styles, colors, products" style={{ flex:1 }} />
            <Pressable onPress={()=>setQ('red')}><Text>🔍</Text></Pressable>
          </View>

          <HeroCardMono
            onStart={()=>nav.navigate('ProductDetails',{ id:'p1' })}
            onAR={()=>nav.navigate('AR360Preview')}
            onHealth={()=>nav.navigate('HairGood')}
            onMix={()=>nav.navigate('Premium')}
          />

          <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginVertical: 12 }}>
            <Text style={d.fonts.h2}>Explore styles</Text>
            <Pressable><Text style={{ fontWeight:'700' }}>See all</Text></Pressable>
          </View>

          <FlatList
            data={tiles}
            numColumns={2}
            keyExtractor={(i)=>i.id}
            columnWrapperStyle={{ justifyContent:'space-between' }}
            renderItem={({ item }) => (
              <Pressable onPress={()=>nav.navigate('Bundles')} style={{ width: '48%', marginBottom: 12 }}>
                <View style={[d.shadow.card, { backgroundColor:'#fff', borderRadius: d.radius.lg, overflow:'hidden', borderWidth:1, borderColor:d.colors.border }]}>
                  <View style={{ height: 110, backgroundColor:'#F3F4F6', justifyContent:'center', alignItems:'center' }}>
                    <Text style={{ fontWeight:'800' }}>{item.title}</Text>
                  </View>
                  <View style={{ padding: 10 }}>
                    <Text style={{ fontWeight:'700' }}>{item.title}</Text>
                  </View>
                </View>
              </Pressable>
            )}
            ListFooterComponent={<View style={{ height: 16 }} />}
          />
        </View>
      </PageBackground>
    </SafeAreaView>
  );
}
