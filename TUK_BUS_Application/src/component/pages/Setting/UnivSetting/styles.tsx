import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: '3%',
    backgroundColor: '#E0E0E0',
  },

  TopContainer: {
    flex: 10,
    margin: '5%',
    padding: '2%',
    paddingBottom: '30%',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  ImageCircle: {
    width: Dimensions.get('window').width / 3.5,
    height: Dimensions.get('window').width / 3.5,
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

  BottomContainer: {
    flex: 1,
    margin: '5%',
    paddingLeft: '25%',
    paddingRight: '25%',
  },
  Button: {
    flex: 1,
    backgroundColor: '#000000',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  font16white: {
    fontSize: Dimensions.get('window').width / 16,
    color: 'white',
    margin: 4,
  },
  font28: {
    fontSize: Dimensions.get('window').width / 28,
    color: 'black',
    margin: 4,
  },
});
export default styles;
