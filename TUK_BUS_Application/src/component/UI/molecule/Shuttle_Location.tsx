import React, {ReactElement} from 'react';
import {Image, Platform, Text, View} from 'react-native';
import {styles} from '../../../style/stylesheet.css';
import {LogBox} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
LogBox.ignoreLogs([
  'Sending `onAnimatedValueUpdate` with no listeners registered.',
]);

export function ShuttleLocation_Univ(): ReactElement {
  return (
    <View style={styles.location_container}>
      <View style={styles.map_conatiner}>
        <MapView
          style={styles.image}
          initialRegion={{
            latitude: 37.35171903534619,
            longitude: 126.74216728507993,
            latitudeDelta: 0.0015,
            longitudeDelta: 0.0035,
          }}>
          <Marker
            coordinate={{
              latitude: Platform.OS === 'ios' ? 37.351933851445885 : 37.351892,
              longitude:
                Platform.OS === 'ios' ? 126.74151192280007 : 126.741314,
            }}
            key={'mk1'}>
            <Image source={require('./icon_marker.png')} />
          </Marker>
        </MapView>
      </View>
      <View style={styles.map_info_container}>
        <Text style={styles.map_info_text}>
          정왕역 1번출구 나와서 우측으로 100m (정왕역 A주차장)
        </Text>
      </View>
    </View>
  );
}

export function ShuttleLocation_Univ_Night(): ReactElement {
  return (
    <View style={styles.location_container}>
      <View style={styles.map_conatiner}>
        <MapView
          style={styles.image}
          initialRegion={{
            latitude: Platform.OS === 'ios' ? 37.35101733358422 : 37.351597,
            longitude: Platform.OS === 'ios' ? 126.74267193613755 : 126.741959,
            latitudeDelta: 0.0015,
            longitudeDelta: 0.0035,
          }}>
          <Marker
            coordinate={{
              latitude: Platform.OS === 'ios' ? 37.35091487526632 : 37.351248,
              longitude:
                Platform.OS === 'ios' ? 126.74217003524163 : 126.741278,
            }}
            key={'mk1'}>
            <Image source={require('./icon_marker.png')} />
          </Marker>
        </MapView>
      </View>
      <View style={styles.map_info_container}>
        <Text style={styles.map_info_text}>
          파리바게트 건너편(하교 도착 장소)
        </Text>
      </View>
    </View>
  );
}

export function ShuttleLocation_Home(): ReactElement {
  return (
    <View style={styles.location_container}>
      <View style={styles.map_conatiner}>
        <MapView
          style={styles.image}
          initialRegion={{
            latitude: 37.33953482199095,
            longitude: 126.7329948818067,
            latitudeDelta: 0.0005,
            longitudeDelta: 0.0025,
          }}>
          <Marker
            coordinate={{
              latitude: Platform.OS === 'ios' ? 37.339661993755755 : 37.33957,
              longitude:
                Platform.OS === 'ios' ? 126.73245275909512 : 126.732453,
            }}
            key={'mk1'}>
            <Image source={require('./icon_marker.png')} />
          </Marker>
        </MapView>
      </View>
      <View style={styles.map_info_container}>
        <Text style={styles.map_info_text}>시흥비즈니스센터 앞</Text>
      </View>
    </View>
  );
}
