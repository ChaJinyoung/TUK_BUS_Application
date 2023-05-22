import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  ModalView: {
    width: '70%',
    height: '20%',
    padding: '2%',
    backgroundColor: 'white',
    borderRadius: 3,
  },
  itemContainer: {
    flex: 1,
    padding: '2%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  font20: {
    fontSize: Dimensions.get('window').width / 20,
    color: 'black',
    fontWeight: 'bold',
  },
  font26: {
    fontSize: Dimensions.get('window').width / 26,
    color: 'black',
  },
});
