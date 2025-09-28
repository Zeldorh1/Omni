
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, Pressable, Image, Dimensions } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useOverlayGestures, OverlayGestureContainer } from '@/utils/ar/engine';
import assets from '@/utils/ar/assets.json';

const ANGLES = [0,45,90,135,180,225,270,315] as const;

export default function AR360PreviewScreen(){
  const [perm, setPerm] = useState<boolean | null>(null);
  const [sel, setSel] = useState<any>(assets.styles[0]);
  const [angleIndex, setAngleIndex] = useState(0);
  const g = useOverlayGestures();

  useEffect(()=>{ (async()=>{ const { status } = await Camera.requestCameraPermissionsAsync(); setPerm(status==='granted'); })(); }, []);

  // swipe left/right to change angle
  const swipeX = useSharedValue(0);
  const swipe = Gesture.Pan()
    .onChange((e) => { swipeX.value = e.translationX; })
    .onEnd((e) => {
      const dir = e.translationX > 30 ? -1 : e.translationX < -30 ? 1 : 0;
      if (dir !== 0) setAngleIndex((i)=> (i + dir + ANGLES.length) % ANGLES.length);
      swipeX.value = 0;
    });

  const swipeStyle = useAnimatedStyle(()=>({ transform:[{ translateX: swipeX.value * 0.05 }] }));

  if (perm === null) return <SafeAreaView><Text>Requesting camera permission…</Text></SafeAreaView>;
  if (perm === false) return <SafeAreaView><Text>No camera access</Text></SafeAreaView>;

  const src = sel?.sources?.[angleIndex];

  return (
    <SafeAreaView style={{ flex:1, backgroundColor:'#000' }}>
      <View style={{ paddingHorizontal: 12, paddingVertical: 8, backgroundColor:'#fff', flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
        <Text style={{ fontWeight:'800', fontSize:18 }}>AR 360° Preview</Text>
        <Text style={{ color:'#666' }}>{sel?.name}</Text>
      </View>

      <GestureDetector gesture={swipe}>
        <Animated.View style={{ flex:1 }}>
          <Camera style={{ position:'absolute', top:0, left:0, right:0, bottom:0 }} type={CameraType.front} />
          {src && (
            <OverlayGestureContainer gesture={g.composed}>
              <Animated.View style={[{ position:'absolute', left: 80, top: 160 }, g.style, swipeStyle]}>
                <Image source={{ uri: '' }} style={{ width: 320, height: 260, resizeMode:'contain' }} />
              </Animated.View>
            </OverlayGestureContainer>
          )}
        </Animated.View>
      </GestureDetector>

      <View style={{ backgroundColor:'#fff', paddingVertical: 8 }}>
        <FlatList
          horizontal
          data={assets.styles as any}
          keyExtractor={(i)=>i.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable onPress={()=>{ setSel(item); setAngleIndex(0); }} style={{ padding:10, marginHorizontal:6, backgroundColor:'#f3f4f6', borderRadius: 12 }}>
              <View style={{ width:64, height:48, backgroundColor:'#e5e7eb', borderRadius:8, marginBottom:6 }} />
              <Text numberOfLines={1} style={{ maxWidth:80 }}>{item.name}</Text>
            </Pressable>
          )}
        />
        <View style={{ flexDirection:'row', justifyContent:'space-between', paddingHorizontal: 16, paddingTop: 6 }}>
          <Text>Angle: {ANGLES[angleIndex]}°</Text>
          <Text>Drag, pinch, rotate • Swipe to spin</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
