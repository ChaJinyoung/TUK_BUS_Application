import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  boxContainer: {
    margin: '2%',
    borderBottomWidth: 0.5,
    borderColor: '#999999',
  },
  roomContent: {
    padding: '2%',
    paddingHorizontal: '5%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    padding: 5,
    paddingLeft: 0,
  },
  headerButton: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginLeft: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },

  chevronBtn: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 100,
    width: 70,
    height: 70,
    bottom: '5%',
    right: '10%',
    zIndex: 1,
  },
  loginButton: {
    margin: '8%',
  },

  noRoomContainer: {
    flex: 1,
    marginVertical: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  font16: {
    fontSize: Dimensions.get('window').width / 16,
    color: '#000000',
    fontWeight: 'bold',
  },
  font20: {
    fontSize: Dimensions.get('window').width / 20,
    color: 'blue',
  },
  font24: {
    fontSize: Dimensions.get('window').width / 24,
    color: '#000000',
  },
});
