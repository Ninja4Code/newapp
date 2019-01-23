import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import { MainNavigator} from './MyMenu';
import { View, Platform, NetInfo, ToastAndroid } from 'react-native';

const mapStateToProps = state => {
  return {      
  }
}
const mapDispatchToProps = dispatch => ({
   fetchLeaders:() => dispatch(fetchLeaders()),
   fetchDishes:() => dispatch(fetchDishes()),
   fetchPromos:() => dispatch(fetchPromos()),
   fetchComments:() => dispatch(fetchComments())
});
class Main extends Component {
  
  componentDidMount() {
    this.props.fetchLeaders();
    this.props.fetchComments();
    this.props.fetchDishes();
    this.props.fetchPromos();

   /*  NetInfo.getConnectionInfo()
        .then((connectionInfo) => {
            ToastAndroid.show('Initial Network Connectivity Type: '
                + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType,
                ToastAndroid.LONG)
        });

    NetInfo.addEventListener('connectionChange', this.handleConnectivityChange); */
  }
  /* componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
  } */
  handleConnectivityChange = (connectionInfo) => {
    switch (connectionInfo.type) {
      case 'none':
        ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
        break;
      case 'wifi':
        ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
        break;
      case 'cellular':
        ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
        break;
      case 'unknown':
        ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
        break;
      default:
        break;
    }
  }
  render() {
    return (       
      <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : 5 }}>
            <MainNavigator />
        </View>
    );
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Main);