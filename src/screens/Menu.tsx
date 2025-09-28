import React from 'react';
import { View, Text, SafeAreaView, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Menu(){
  const nav = useNavigation<any>();
  const goto = (feature: string) => Alert.alert(feature, 'Coming soon (mock screen link)');
  return (
    <SafeAreaView style={{ flex:1, backgroundColor:'#fff' }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 22, fontWeight:'800', marginBottom: 12 }}>Menu</Text>
        {[
          ['AI Chatbox', ()=>goto('AI Chatbox')],
          ['Hair Scanner', ()=>goto('Hair Scanner')],
          ['AR 360° Preview', ()=>goto('AR 360° Preview')],
          ['Settings', ()=>goto('Settings')]
        ].map(([label, onPress]) => (
          <Pressable key={label} onPress={onPress as any} style={{ backgroundColor:'#fafafa', padding: 14, borderRadius: 12, marginBottom: 10 }}>
            <Text style={{ fontWeight:'700' }}>{label}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}
