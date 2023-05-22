import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: '3%',
    backgroundColor: '#E0E0E0',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    margin: '5%',
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
  TopContainer: {
    height: (Dimensions.get('window').width / 3) * 5,
    paddingTop: '30%',
    alignItems: 'center',
  },
  SideContainer: {
    marginVertical: '3%',
    paddingVertical: '2%',
    alignItems: 'flex-start',
    borderRadius: 10,
  },
  RowContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 4,
    flexDirection: 'row',
  },
  TextInput: {
    margin: '2%',
    borderRadius: 5,
    borderBottomWidth: 1,
    padding: '2%',
    width: '50%',
    justifyContent: 'center',
  },

  bottomContainer: {
    position: 'absolute',
    bottom: '3%',
    alignItems: 'center',
  },
  Button: {
    height: Dimensions.get('window').width / 7,
    paddingHorizontal: '30%',
    marginBottom: '10%',
    backgroundColor: '#000000',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  CheckContainer: {
    flex: 1,
    margin: '5%',
    padding: '10%',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
  TextInputView: {
    marginBottom: 4,
    alignItems: 'center',
    flexDirection: 'row',
  },

  font18white: {
    fontSize: Dimensions.get('window').width / 18,
    color: 'white',
    margin: 4,
  },
  font20: {
    fontSize: Dimensions.get('window').width / 20,
    color: 'black',
    margin: 4,
  },
  font28: {
    fontSize: Dimensions.get('window').width / 28,
    color: 'black',
    margin: 4,
  },
});
export default styles;
