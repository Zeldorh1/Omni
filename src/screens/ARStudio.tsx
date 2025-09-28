
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, Pressable, TextInput, Image } from 'react-native';
import Animated from 'react-native-reanimated';
import { Camera, CameraType } from 'expo-camera';
import { useOverlayGestures, OverlayGestureContainer } from '@/utils/ar/engine';
import stylesCatalog from '@/data/styles.json';

type StyleItem = { id:string; name:string; category:string; overlay?:string };

const CATEGORIES = ['All','Dreads/Locs','Braids','Curls','Fades','Short Cuts','Long','Medium','Short'];

export default function ARStudio(){
  const [perm, setPerm] = useState<boolean | null>(null);
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('All');
  const [selected, setSelected] = useState<StyleItem | null>(null);
  const g = useOverlayGestures();

  useEffect(() => { (async () => { const { status } = await Camera.requestCameraPermissionsAsync(); setPerm(status === 'granted'); })(); }, []);

  const list = useMemo(()=>{
    const q = query.toLowerCase();
    return (stylesCatalog as any as StyleItem[]).filter(s => {
      const matchQ = !q || (s.name + ' ' + s.category).toLowerCase().includes(q);
      const matchC = cat === 'All' || s.category === cat;
      return matchQ && matchC;
    });
  }, [query, cat]);

  if (perm === null) return <SafeAreaView><Text>Requesting camera permission…</Text></SafeAreaView>;
  if (perm === false) return <SafeAreaView><Text>No camera access</Text></SafeAreaView>;

  return (
    <SafeAreaView style={{ flex:1, backgroundColor:'#000' }}>
      {/* Top search & category strip */}
      <View style={{ padding: 10, backgroundColor: '#fff' }}>
        <View style={{ flexDirection:'row', alignItems:'center', backgroundColor:'#f3f4f6', borderRadius: 12, paddingHorizontal: 10, marginBottom: 8 }}>
          <TextInput value={query} onChangeText={setQuery} placeholder="Search hairstyles (dreads, braids, curls…)" style={{ flex:1, padding:8 }} />
          <Pressable onPress={()=>setQuery('dreads')}><Text>🎤</Text></Pressable>
        </View>
        <FlatList
          data={CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(i)=>i}
          renderItem={({ item }) => (
            <Pressable onPress={()=>setCat(item)} style={{ paddingVertical:6, paddingHorizontal:12, backgroundColor: item===cat ? '#111' : '#e5e7eb', borderRadius: 999, marginRight: 8 }}>
              <Text style={{ color: item===cat ? '#fff' : '#111', fontWeight:'700' }}>{item}</Text>
            </Pressable>
          )}
        />
      </View>

      {/* Camera preview */}
      <View style={{ flex: 1 }}>
        <Camera style={StyleSheet.absoluteFill} type={CameraType.front} />
        {selected && (
          <OverlayGestureContainer gesture={g.composed}>
            <Animated.View style={[{ position:'absolute', left: 100, top: 200 }, g.style]}>
              <Image source={require('../../assets/images/locs_highbun.png')} style={{ width: 320, height: 240, resizeMode:'contain' }} />
            </Animated.View>
          </OverlayGestureContainer>
        )}
      </View>

      {/* Bottom picker */}
      <View style={{ backgroundColor:'#fff', paddingVertical: 10 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={list}
          keyExtractor={(i)=>i.id}
          renderItem={({ item }) => (
            <Pressable onPress={()=>setSelected(item)} style={{ padding:8, marginHorizontal:6, backgroundColor:'#f9fafb', borderRadius: 10, alignItems:'center' }}>
              <View style={{ width:64, height:48, backgroundColor:'#e5e7eb', borderRadius:8, marginBottom:4, justifyContent:'center', alignItems:'center' }}>
                <Text style={{ fontSize:10 }}>{item.category.split('/')[0]}</Text>
              </View>
              <Text numberOfLines={1} style={{ maxWidth:80 }}>{item.name}</Text>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
