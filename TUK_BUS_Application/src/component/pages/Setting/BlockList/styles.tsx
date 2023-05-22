import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '3%',
    backgroundColor: '#E0E0E0',
  },

  mainContainer: {
    flex: 1,
    marginVertical: '5%',
    marginHorizontal: '5%',
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },

  topContainer: {
    flex: 7,
    padding: '10%',
    flexDirection: 'row',
  },
  info: {
    flex: 1,
    padding: '3%',
    marginVertical: '1%',
    borderRadius: 5,
    color: '#000000',
    fontSize: Dimensions.get('window').width / 20,
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  Button: {
    flex: 1,
    marginVertical: '6%',
    paddingHorizontal: '15%',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
  },

  font20: {
    fontSize: Dimensions.get('window').width / 20,
    color: 'white',
    margin: 4,
  },
  font24: {
    fontSize: Dimensions.get('window').width / 24,
    color: 'black',
    margin: 4,
  },
});
export default styles;
