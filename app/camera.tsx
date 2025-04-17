import { Text, View } from '@/components/Themed';
import { useIsFocused } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { useCameraDevice, useCameraPermission } from 'react-native-vision-camera';

import { Camera } from 'react-native-vision-camera-face-detector'

let counter = 0;

export function useForceUpdate() {
  const [value, setValue] = useState(0);

  return [() => setValue(value + 1), value] as const
}

export default function CameraScreen() {
  const device = useCameraDevice('front')

  const [forceUpdate, forceUpdateId] = useForceUpdate()

  const isFocused = useIsFocused()

  const { hasPermission, requestPermission } = useCameraPermission()

  useEffect(() => {
    requestPermission()
  }, [])

  useEffect(() => {
    const a = setInterval(() => {
      forceUpdate()
      counter += 1;
    }, 500);

    return () => {
      clearInterval(a)
    }
  }, [hasPermission, device, forceUpdateId])

  if (!device) {
    return (
      <Text>
        No camera found
      </Text>
    )
  }

  if (!hasPermission) {
    return (
      <Text>
        No permission to use camera
      </Text>
    )
  }

  return (
    <View style={{ flex: 1 }} key={forceUpdateId}>
      <Stack.Screen options={{ title: counter.toString() }} />

      <Camera
        photo
        style={{ width: 100, height: 100 }}
        device={device}
        faceDetectionCallback={() => { }}
        faceDetectionOptions={{
          performanceMode: 'accurate',
          autoMode: true,
        }}
        isActive={isFocused}
      />
    </View>
  );
}
