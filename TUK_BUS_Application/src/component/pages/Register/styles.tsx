import {Dimensions, Platform, StyleSheet} from 'react-native';

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
    height: Dimensions.get('window').height / 12,
    justifyContent: 'center',
    marginHorizontal: '3%',
    marginBottom: '10%',
  },
  BottomContainer: {
    height: (Dimensions.get('window').height / 4) * 3,
    marginHorizontal: '3%',
  },
  CheckContainer: {
    flex: 1,
    borderRadius: 8,
    justifyContent: 'space-between',
    padding: 4,
  },
  InfoContainer: {
    flex: 2,
    justifyContent: 'space-between',
    margin: 6,
    padding: 4,
  },
  ButtonContainer: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    bottom: '4%',
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
  android_picker: {
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ios_picker: {
    flex: 3,
    // alignItems: 'center',
    // justifyContent: 'center',
    height: 220,
  },
  Button: {
    paddingHorizontal: '3%',
    marginHorizontal: '2%',
    backgroundColor: 'black',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
  },
  rowContainer: {
    marginTop: '7%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextInput: {
    width: '45%',
    height: Platform.OS !== 'ios' ? '75%' : '20%',
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
