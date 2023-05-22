import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  TopContainer: {
    height: Dimensions.get('window').height * 0.25,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  MiddleContainer: {
    height: Dimensions.get('window').height * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BottomContainer: {
    height: Dimensions.get('window').height / 3,
    alignItems: 'center',
  },

  ImageWrapper: {
    width: Dimensions.get('window').height / 4,
    height: Dimensions.get('window').height / 6,
  },
  TextInput: {
    padding: '3%',
    marginBottom: '2%',
    width: '70%',
    backgroundColor: 'white',
    borderColor: '#777777',
    borderBottomWidth: 1,
  },
  Button: {
    width: '70%',
    height: Dimensions.get('window').height / 14,
    padding: '2%',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    fontWeight: 'bold',
  },
  rowContainer: {
    width: '70%',
    marginTop: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  InvisibleView: {
    height: Dimensions.get('window').height / 15,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },

  font10: {
    fontSize: Dimensions.get('window').width / 10,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: '12%',
  },
  fonts8: {
    fontSize: Dimensions.get('window').width / 24 + 8,
    color: '#ffffff',
    fontWeight: 'bold',
    margin: 4,
  },
  fonts0: {
    fontSize: Dimensions.get('window').width / 24,
    fontWeight: 'bold',
    color: '#000000',
    margin: 4,
  },
});
