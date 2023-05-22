import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  message: {
    flex: 13,
    borderColor: 'grey',
    borderWidth: 1,
  },
  sendButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: 'grey',
    borderWidth: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    top: 0,
    left: '0%',
  },
  exitIcon: {
    top: 0,
    right: '0%',
  },
  header: {
    width: '100%',
    height: Dimensions.get('window').height / 16,
    padding: '2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  listContainer: {
    flex: 13,
    marginVertical: '1%',
  },
  sendContainer: {
    height: Dimensions.get('window').height / 16,
    flexDirection: 'row',
  },
  sideMenu: {
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderRadius: 5,
    width: 100,
    height: 70,
    right: '4%',
    zIndex: 1,
  },
  title: {
    fontSize: Dimensions.get('window').width / 24,
    color: 'black',
    fontWeight: '500',
  },
  myChatWrapper: {
    padding: 10,
    backgroundColor: 'grey',
    borderRadius: 10,
    marginVertical: 10,
    margin: 10,
  },
  otherChatWrapper: {
    padding: 10,
    backgroundColor: 'grey',
    borderRadius: 10,
    marginVertical: 5,
  },
  infoWrapper: {
    padding: 5,
    backgroundColor: 'grey',
    borderRadius: 10,
    marginVertical: 5,
    alignSelf: 'center',
  },
  chattingText: {
    color: 'white',
    fontSize: Dimensions.get('window').width / 30,
  },
});
