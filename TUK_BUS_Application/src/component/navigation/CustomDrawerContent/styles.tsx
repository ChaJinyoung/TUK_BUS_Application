import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'grey',
    justifyContent: 'space-around',
  },
  TopContainer: {
    padding: '7%',
    height: Dimensions.get('window').height / 5,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  TextContainer: {
    flex: 3,
    marginTop: '5%',
    justifyContent: 'space-around',
  },
  Profile: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Image: {
    width: Dimensions.get('window').width / 4,
    height: Dimensions.get('window').width / 4,
    borderRadius: 360,
  },
  MiddleContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#dddddd',
    height: (Dimensions.get('window').height / 5) * 3,
    padding: '2%',
  },
  RowContainer: {
    flexDirection: 'row',
  },
  BottomContainer: {
    bottom: '0%',
    padding: '5%',
  },
  drawerWrapper: {
    paddingVertical: '3%',
    borderColor: '#dddddd',
  },
  loginWrapper: {
    flexDirection: 'row',
  },

  font20: {
    fontSize: Dimensions.get('window').width / 20,
    color: 'black',
    fontWeight: 'bold',
  },
  font22: {
    fontSize: Dimensions.get('window').width / 22,
    color: 'black',
  },
  font26: {
    fontSize: Dimensions.get('window').width / 26,
    color: 'black',
  },
  font28: {
    fontSize: Dimensions.get('window').width / 28,
    color: 'black',
  },
});
export default styles;
