import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E0E0',
  },
  arrival_container: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 15,
    borderWidth: 8,
    backgroundColor: '#ffffff',
    borderColor: '#E0E0E0',
    paddingRight: 10,
    paddingLeft: 10,
  },
  time_container: {
    flex: 1,
    justifyContent: 'center',
  },
  infoText_container: {
    flex: 2,
    flexDirection: 'row',
  },
  calctime_container: {
    flex: 1,
  },
  button_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    // borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: 'black',
  },
  time_text: {
    fontSize: 30,
    textAlign: 'left',
    color: 'black',
  },
  left_time_text: {
    textAlign: 'right',
    fontSize: 18,
    padding: 5,
    color: '#FF3333',
  },
  arrival_time_text: {
    textAlign: 'right',
    fontSize: 18,
    paddingRight: 5,
    marginBottom: 5,
    color: 'black',
  },
  remain_text: {
    textAlign: 'right',
    fontSize: 15,
    marginBottom: 6,
    color: 'grey',
  },
  arrival_text: {
    textAlign: 'right',
    fontSize: 15,
    marginTop: 5,
    color: 'grey',
  },
  sub_direction_text: {
    padding: 11,
    fontSize: 15,
    color: 'black',
    textAlign: 'left',
  },
  sub_location_text: {
    padding: 11,
    fontSize: 15,
    color: 'black',
    textAlign: 'right',
  },
  sub_title_text: {
    padding: 10,
    fontSize: 20,
    color: 'black',
    textAlign: 'left',
  },
  sub_container: {
    flexDirection: 'row',
    flex: 1,
  },
  sub_container_border: {
    flexDirection: 'row',
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#d3d3d3',
  },
  line_4: {
    padding: 11,
    fontSize: 15,
    color: '#00A5DE',
    textAlign: 'left',
  },
  suin_bundang: {
    padding: 11,
    fontSize: 15,
    color: '#F5A200',
    textAlign: 'left',
  },
  info_container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    marginHorizontal: 10,
    padding: 5,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  timetable_container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingRight: 20,
    paddingLeft: 20,
  },
  touchable: {
    flex: 1,
    borderWidth: 3,
    borderColor: '#E0E0E0',
    padding: 10,
    backgroundColor: 'white',
  },
  touchable_text: {
    textAlign: 'center',
    fontSize: 15,
  },
  webview_container: {
    flex: 1,
  },
  location_container: {
    flex: 1,
    flexDirection: 'column',
  },
  location_title_container: {
    backgroundColor: 'white',
    padding: 10,
    paddingTop: 2,
    paddingBottom: 0,
  },
  location_title_text: {
    textAlign: 'center',
    fontSize: 20,
  },
  map_conatiner: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  last_map_info_container: {
    backgroundColor: 'white',
  },
  map_info_container: {
    padding: '3%',
    backgroundColor: 'white',
    flex: 3,
  },
  map_info_text: {
    flex: 1,
    marginLeft: 10,
    color: 'black',
    fontSize: 17,
  },
  checkbox_container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 10,
  },
  checkbox_text: {
    fontSize: 15,
    marginRight: 10,
  },
  endofSerivce_container: {
    flexDirection: 'column',
    borderRadius: 15,
    borderWidth: 8,
    backgroundColor: '#ffffff',
    borderColor: '#E0E0E0',
    paddingRight: 10,
    paddingLeft: 10,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  endofService_font: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
  },
  image: {
    width: 400,
    height: 450,
  },
  fonts4: {
    fontSize: Dimensions.get('window').width / 24 + 4,
    color: 'black',
    fontWeight: 'bold',
  },
  fonts_2: {
    fontSize: Dimensions.get('window').width / 24 - 2,
    color: 'black',
  },
});
