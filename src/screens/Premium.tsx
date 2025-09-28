import React, { useState } from 'react';
import { View, Text, SafeAreaView, Pressable, Alert } from 'react-native';
const FEATURES = [
  'AI Hairstyle Studio (360° + Expression Preview)',
  'Hair Health Scanner',
  'Custom Hair Mixer Pro',
  'AI Trend Radar',
  'AI-Personalized Chatbox Pro',
  'Ad-Free Experience'
];

export default function Premium(){
  const [isPremium, setIsPremium] = useState(false);
  return (
    <SafeAreaView style={{ flex:1, backgroundColor:'#fff' }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 22, fontWeight:'800', marginBottom: 12 }}>Premium</Text>
        {FEATURES.map(f => <Text key={f}>• {f}</Text>)}
        <Pressable onPress={()=>{ setIsPremium(true); Alert.alert('Premium', 'Unlocked (mock).'); }} style={{ marginTop: 16, backgroundColor:'#FFD700', padding: 14, borderRadius: 14, alignItems:'center' }}>
          <Text style={{ fontWeight:'800' }}>{isPremium ? 'Premium Active' : 'Unlock Premium (mock)'}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
