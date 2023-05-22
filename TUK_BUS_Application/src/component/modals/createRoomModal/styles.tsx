import {Dimensions, Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    height: Platform.OS === 'ios' ? '60%' : '40%',
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
    flex: 3,
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 20,
  },
  middleContainer: {
    marginBottom: '10%',
    flex: 4,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: '8%',
    backgroundColor: '#000000',
    borderRadius: 20,
    paddingVertical: '3%',
    paddingHorizontal: '10%',
    elevation: 2,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  android_picker: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ios_picker: {
    flex: 3,
    // alignItems: 'center',
    // justifyContent: 'center',
    height: 220,
  },
  font24: {
    fontSize: Dimensions.get('window').width / 28,
    color: '#000000',
    fontWeight: 'bold',
  },
});
