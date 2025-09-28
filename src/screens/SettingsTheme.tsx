import React from 'react';
import { View, Text, SafeAreaView, Switch } from 'react-native';
import { design } from '../theme/design';
import { useThemeFlags } from '@/context/ThemeContext';

export default function SettingsTheme(){
  const { colorfulBg, setColorfulBg } = useThemeFlags();
  return (
    <SafeAreaView style={{ flex:1, backgroundColor: d.colors.bg }}>
      <View style={{ padding: 16 }}>
        <Text style={[d.fonts.h2, { marginBottom: 16 }]}>Appearance</Text>
        <View style={{ backgroundColor:'#fff', borderRadius:12, borderWidth:1, borderColor:d.colors.border, padding:16 }}>
          <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
            <View>
              <Text style={{ fontWeight:'700' }}>Colorful Backgrounds</Text>
              <Text style={d.fonts.small}>Keep it off for crisp black & white. Toggle on for pink gradient background.</Text>
            </View>
            <Switch value={colorfulBg} onValueChange={setColorfulBg} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
