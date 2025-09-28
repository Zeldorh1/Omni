import React from 'react';
import { View, Text, SafeAreaView, Pressable, Modal, ScrollView } from 'react-native';
import d from '@/theme/design';

export default function PremiumDrawer({ visible, onClose, nav }:{ visible:boolean; onClose:()=>void; nav:any }){
  const items = [
    ['AR Try-On', ()=>nav.navigate('ProductDetails',{ id:'p1' })],
    ['360° Try-On', ()=>nav.navigate('AR360Preview')],
    ['Hair Health Scanner', ()=>nav.navigate('Checkout')],
    ['Custom Hair Mixer Pro', ()=>nav.navigate('Premium')],
    ['Compare Products', ()=>nav.navigate('Bundles')],
    ['Trend Radar', ()=>nav.navigate('Premium')],
    ['AI Chat', ()=>nav.navigate('Premium')],
    ['Progression Tracker', ()=>nav.navigate('Premium')],
    ['Settings', ()=>nav.navigate('Menu')],
  ];

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={{ flex:1, backgroundColor:'rgba(0,0,0,0.35)', justifyContent:'flex-start', alignItems:'flex-end' }}>
        <View style={{ width:'84%', backgroundColor:'#111827', borderTopLeftRadius: 24, borderBottomLeftRadius: 24, paddingTop: 36, paddingHorizontal: 16 }}>
          <Text style={{ color:'#fff', fontWeight:'800', fontSize:18, marginBottom: 16 }}>PREMIUM</Text>
          <ScrollView style={{ maxHeight: '90%' }}>
            {items.map(([label, onPress]) => (
              <Pressable key={label} onPress={onPress as any} style={{ backgroundColor:'#1F2937', borderRadius: 16, padding: 16, marginBottom: 12 }}>
                <Text style={{ color:'#fff', fontWeight:'700' }}>{label}</Text>
              </Pressable>
            ))}
            <Pressable onPress={onClose} style={{ padding: 16, alignItems:'center' }}>
              <Text style={{ color:'#9CA3AF' }}>Close</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
