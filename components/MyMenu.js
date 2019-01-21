import React from 'react';
import  Menu  from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';
import { FontAwesome } from '@expo/vector-icons';
import { View, Image, ScrollView, Text, StyleSheet } from 'react-native';
import { createStackNavigator,createDrawerNavigator, DrawerItems, SafeAreaView  } from 'react-navigation';

const FavoritesNavigator = createStackNavigator({
    Favorites: { screen: Favorites }
 }, 
 {
   navigationOptions: ({ navigation }) => ({
     headerStyle: {
       backgroundColor: "#512DA8"
     },
     headerTitleStyle: {
       color: "#fff"            
     },
     headerTintColor: "#fff",
     headerLeft: <FontAwesome name="menu" size={24}
       iconStyle={{ color: 'white' }} 
       onPress={ () => navigation.toggleDrawer() } />    
  })
})
const ReservationNavigator = createStackNavigator({
   Reservation: { screen: Reservation }
 }, 
 {
   navigationOptions: ({ navigation }) => ({
     headerStyle: {
       backgroundColor: "#512DA8"
     },
     headerTitleStyle: {
       color: "#fff"            
     },
     headerTintColor: "#fff",
     headerLeft: <FontAwesome name="menu" size={24}
       iconStyle={{ color: 'white' }} 
       onPress={ () => navigation.toggleDrawer() } />    
 })
})
const AboutNavigator = createStackNavigator({
   About:{ screen:About }
 },
 {
   navigationOptions: ({ navigation }) => ({
     headerStyle: {
       backgroundColor: "#512DA8"
     },
     headerTitleStyle: {
       color: "#fff"            
     },
     headerTintColor: "#fff",
     headerLeft: <FontAwesome name='menu' size={24} color='white'
       onPress={()=> navigation.toggleDrawer()}
      />
   })  
})
const LoginNavigator = createStackNavigator({
  Login: Login
}, {
navigationOptions: ({ navigation }) => ({
  headerStyle: {
      backgroundColor: "#512DA8"
  },
  headerTitleStyle: {
      color: "#fff"            
  },
  title: 'Login',
  headerTintColor: "#fff",
  headerLeft: <FontAwesome name="menu" size={24}
    iconStyle={{ color: 'white' }} 
    onPress={ () => navigation.toggleDrawer() } />    
})
});
const ContactNavigator = createStackNavigator({
   Contact:{screen :Contact }
 },
 {
   navigationOptions: ({ navigation }) => ({
     headerStyle: {
       backgroundColor: "#512DA8"
     },
     headerTitleStyle: {
       color: "#fff"            
     },
     headerTintColor: "#fff",
     headerLeft: <FontAwesome name='menu' size={24} color='white'
       onPress={()=> navigation.toggleDrawer()}
      />
   })  
})
const MenuNavigator = createStackNavigator({
   Menu: { screen: Menu,
     navigationOptions:({navigation }) => ({
       headerLeft: <FontAwesome name='menu' size={24} color='white'
       onPress={()=> navigation.toggleDrawer()}
      />
     })
 },
   Dishdetail: { screen: Dishdetail }
 },
 {
   initialRouteName: 'Menu',
   navigationOptions: {
     headerStyle: {
         backgroundColor: "#512DA8"
     },
     headerTintColor: '#fff',
     headerTitleStyle: {
         color: "#fff"            
     }
 }
});

const HomeNavigator = createStackNavigator({
   Home: { screen: Home }
 }, 
 {
   navigationOptions: ({ navigation }) => ({
     headerStyle: {
       backgroundColor: "#512DA8"
     },
     headerTitleStyle: {
       color: "#fff"            
     },
     headerTintColor: "#fff" ,
     headerLeft: <FontAwesome name='menu' size={24} color='white'
       onPress={()=> navigation.toggleDrawer()}
      />
   })  
});
const CustomDrawerContentComponent = (props) => (
 <ScrollView>
   <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
     <View style={styles.drawerHeader}>
       <View style={{flex:1}}>
       <Image source={require('./images/logo.png')} style={styles.drawerImage} />
       </View>
       <View style={{flex: 2}}>
         <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
       </View>
     </View>
     <DrawerItems {...props} />
   </SafeAreaView>
 </ScrollView>
);
export const MainNavigator = createDrawerNavigator({
   Home: 
   { screen: HomeNavigator,
     navigationOptions: {
       title: 'Home',
       drawerLabel: 'Home',
       drawerIcon:({tintColor}) => (
         <FontAwesome
            name='home'            
            size={24}
            color={tintColor}
         />
       )
     }
 },
 About:
 { screen: AboutNavigator,
     navigationOptions: {
       title: 'About Us',
       drawerLabel: 'About Us',
       drawerIcon:({tintColor}) => (
       <FontAwesome
        name='info-circle'
        size={24}
        color={tintColor}
       />
     )
   }
 },
 Menu: 
 { screen: MenuNavigator,
     navigationOptions: {
       title: 'Menu',
       drawerLabel: 'Menu',
       drawerIcon:({tintColor}) => (
         <FontAwesome
            name='list'            
            size={24}
            color={tintColor}
         />
       )
   }
 },
 Favorites:
 { screen: FavoritesNavigator,
   navigationOptions: {
     title: 'My Favorites',
     drawerLabel: 'My Favorites',
     drawerIcon: ({ tintColor, focused }) => (
       <FontAwesome
         name='heart'                     
         size={24}
         iconStyle={{ color: tintColor }}
       />
     ),
   }
 },
 Reservation:
 { screen: ReservationNavigator,
   navigationOptions: {
     title: 'Reserve Table',
     drawerLabel: 'Reserve Table',
     drawerIcon: ({ tintColor, focused }) => (
       <FontAwesome
         name='cutlery'                     
         size={24}
         iconStyle={{ color: tintColor }}
       />
     ),
   }
 },
 Login: 
  { screen: LoginNavigator,
    navigationOptions: {
      title: 'Login',
      drawerLabel: 'Login',
      drawerIcon: ({ tintColor, focused }) => (
        <FontAwesome
          name='sign-in'                    
          size={24}
          iconStyle={{ color: tintColor }}
        />
      ),
    }
 },
 Contact:
   { screen: ContactNavigator,
     navigationOptions: {
       title: 'Contact Us',
       drawerLabel: 'Contact Us',
       drawerIcon:({tintColor}) => (
         <FontAwesome
           name='address-card'           
           size={22}
           color={tintColor}
         />
       )
     }
   }
 }, 
 {
   initialRouteName: 'Home',
   drawerBackgroundColor: '#D1C4E9',
   contentComponent: CustomDrawerContentComponent
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});