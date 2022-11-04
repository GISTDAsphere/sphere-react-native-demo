import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import Sphere from 'sphere-react-native';

export default function App() {
  Sphere.apiKey = 'test2022';
  let map;
  let home;

  async function onReady() {
    const lo = await map.call('location');
    const options = { icon: { url: 'https://basemap.sphere.gistda.or.th/vector/sprite@2x.png' } }
    home = Sphere.object('Marker', lo, options);
    map.call('Overlays.add', home);
  }

  async function onOverlayClick(overlay) {
    if (Sphere.isSameObject(overlay, home)) {
      const lo = await map.objectCall(overlay, 'location');
      const circle = Sphere.object('Circle', lo, 1E-3);
      map.call('Overlays.add', circle);
    } else {
      map.call('Overlays.remove', overlay);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Sphere.MapView
        ref={r => (map = r)}
        layer={Sphere.static('Layers', 'HYBRID')}
        zoom={15}
        location={{lon: 100.5382, lat: 13.7649}}
        lastView={false}
        language={'en'}
        onReady={onReady}
        onOverlayClick={onOverlayClick}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
});