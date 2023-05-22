import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: (Dimensions.get('window').width / 5) * 4,
    height: (Dimensions.get('window').height / 5) * 2,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: '5%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  topContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  rowContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  middleContainer: {
    flex: 10,
    marginVertical: '5%',
    justifyContent: 'flex-start',
  },
  bottomContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  Button: {
    flex: 1,
    paddingHorizontal: '10%',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
  },

  font24white: {
    fontSize: Dimensions.get('window').width / 24,
    color: '#ffffff',
    margin: 2,
  },
  font24: {
    fontSize: Dimensions.get('window').width / 24,
    color: '#000000',
  },
  font32: {
    fontSize: Dimensions.get('window').width / 32,
    color: '#000000',
    fontWeight: 'bold',
  },
});
