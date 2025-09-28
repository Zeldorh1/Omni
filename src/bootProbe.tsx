import { Text } from 'react-native';
import React from 'react';

function probe(label: string, fn: () => void) {
  try {
    fn();
    console.log(`[PROBE OK] ${label}`);
  } catch (e) {
    console.log(`[PROBE FAIL] ${label}`, e);
  }
}

probe('require RNGH', () => { require('react-native-gesture-handler'); });
probe('require Reanimated', () => { require('react-native-reanimated'); });
probe('read Reanimated pkg', () => {
  // @ts-ignore
  console.log('Reanimated version (runtime):', require('react-native-reanimated/package.json').version);
});

export default function BootProbe() {
  return <Text style={{ marginTop: 64, textAlign: 'center' }}>Boot probe ran. Check Metro logs.</Text>;
}
