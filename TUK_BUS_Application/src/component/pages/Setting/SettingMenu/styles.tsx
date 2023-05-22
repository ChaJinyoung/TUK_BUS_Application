import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: '3%',
    backgroundColor: '#E0E0E0',
  },

  SelectBox: {
    height: '10%',
    margin: '2%',
    padding: '3%',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },

  font20: {
    fontSize: Dimensions.get('window').width / 20,
    color: 'black',
    margin: 4,
  },
});
export default styles;
