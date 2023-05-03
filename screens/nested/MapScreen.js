import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import COLORS from '../../utils/colors';

const MapScreen = ({ route }) => {
  const { longitude, latitude } = route.params;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        minZoomLevel={15}
        onMapReady={() => console.log('Map is ready')}
        onRegionChange={() => console.log('Region change')}
      >
        <Marker
          title="Location"
          coordinate={{
            latitude,
            longitude,
          }}
          description="Location"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width - 10,
    height: Dimensions.get('window').height - 10,
  },
});

export default MapScreen;
