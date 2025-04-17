import { StyleSheet } from 'react-native';

import { View } from '@/components/Themed';
import { Link } from 'expo-router';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Link href="/camera" style={{
        fontSize: 14,
        color: '#2e78b7'
      }}>
        Go to camera screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
