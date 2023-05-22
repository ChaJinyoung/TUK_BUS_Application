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
    height: Dimensions.get('window').height / 10,
    paddingHorizontal: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  picker: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleContainer: {
    flex: 6,
  },
  textInputContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    marginHorizontal: '5%',
    marginBottom: '5%',
    padding: '5%',
    borderWidth: 1,
    borderRadius: 5,
  },
  bottomContainer: {
    height: Dimensions.get('window').height / 9,
    alignItems: 'center',
    justifyContent: 'center',
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
