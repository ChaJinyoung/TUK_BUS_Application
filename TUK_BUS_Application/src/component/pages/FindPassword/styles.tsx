import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: '10%',
    padding: '2%',
  },
  RowContainer: {
    flexDirection: 'row',
  },
  TopContainer: {
    height: Dimensions.get('window').height / 10,
    justifyContent: 'center',
    marginHorizontal: '3%',
    marginBottom: '10%',
  },
  BottomContainer: {
    height: (Dimensions.get('window').height / 3) * 2,
    marginHorizontal: '3%',
  },
  CheckContainer: {
    height: (Dimensions.get('window').height / 10) * 3,
    borderWidth: 1,
    borderRadius: 8,
    padding: 4,
  },
  InfoContainer: {
    flex: 3,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    margin: 6,
    paddingHorizontal: '2%',
  },
  ButtonContainer: {
    height: Dimensions.get('window').height / 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextInputView: {
    marginBottom: 6,
    alignItems: 'center',
    flexDirection: 'row',
  },
  picker: {
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Button: {
    paddingHorizontal: '3%',
    marginHorizontal: '2%',
    backgroundColor: 'black',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
  },
  TextInput: {
    width: '45%',
    height: '75%',
    borderRadius: 5,
    fontSize: Dimensions.get('window').width / 32,
    backgroundColor: 'white',
    borderBottomWidth: 1,
  },

  font18: {
    fontSize: Dimensions.get('window').width / 18,
    color: 'black',
    margin: 4,
  },
  font20: {
    fontSize: Dimensions.get('window').width / 20,
    color: 'black',
    margin: 4,
  },
  font20white: {
    fontSize: Dimensions.get('window').width / 20,
    color: 'white',
    margin: 4,
  },
  font24: {
    fontSize: Dimensions.get('window').width / 24,
    color: 'black',
    margin: 4,
  },
  font24white: {
    fontSize: Dimensions.get('window').width / 24,
    color: 'white',
    margin: 4,
  },
  font32: {
    fontSize: Dimensions.get('window').width / 32,
    color: 'black',
    margin: 4,
  },
});
export default styles;
