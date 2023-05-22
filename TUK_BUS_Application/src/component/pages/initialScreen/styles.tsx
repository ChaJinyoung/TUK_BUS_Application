import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: '5%',
    backgroundColor: 'white',
  },
  TopContainer: {
    flex: 3,
    justifyContent: 'center',
  },
  BottomContainer: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  SubContainer: {
    alignItems: 'center',
  },
  ImageCircle: {
    width: (Dimensions.get('window').width / 7) * 3,
    height: (Dimensions.get('window').width / 7) * 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 360,
    borderWidth: 1,
    margin: '3%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 360,
  },

  font18: {
    fontSize: Dimensions.get('window').width / 18,
    color: 'black',
    fontWeight: 'bold',
  },
  font24: {
    fontSize: Dimensions.get('window').width / 24,
    color: 'black',
  },
});
