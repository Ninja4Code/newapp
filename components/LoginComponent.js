import React, { Component } from 'react';
import { View, Button, StyleSheet, ScrollView, Image, Switch } from 'react-native';
import { Input } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { SecureStore,  Permissions, ImagePicker, ImageManipulator  } from 'expo';
import { createBottomTabNavigator } from 'react-navigation';
import { baseUrl } from '../shared/baseUrl';

class LoginTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }
    componentDidMount() {
        SecureStore.getItemAsync('userinfo')
            .then((userdata) => {
                let userinfo = JSON.parse(userdata);
                if (userinfo) {
                    this.setState({username: userinfo.username});
                    this.setState({password: userinfo.password});
                    this.setState({remember: true})
                }
            })
    }
    static navigationOptions = {
        title: 'Login',
        tabBarIcon: ({ tintColor }) => (
            <FontAwesome
              name='sign-in' size={24}             
              iconStyle={{ color: tintColor }}
            />
          ) 
    };
    handleLogin() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember)
            SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))
                .catch((error) => console.log('Could not save user info', error));
        else
            SecureStore.deleteItemAsync('userinfo')
                .catch((error) => console.log('Could not delete user info', error));
    }
    render() {
        return (
            <View style={styles.container}>
                <Input
                    placeholder="Username"
                    leftIcon={<FontAwesome name="user-o" size={24} />}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    inputContainerStyle={{borderRadius:'10',backgroundColor:'white',borderBottomColor:'white'}}
                    />
                <Input
                    placeholder="Password"
                    leftIcon={<FontAwesome name="key" size={24} />}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    />
                <Switch
                    value={this.state.remember}
                    onValueChange={(value) => this.setState({remember: !this.state.remember})}
                    
                    />
                <View style={styles.formButton}>                    
                    <Button
                            onPress={() => this.props.navigation.navigate('Register')}
                            title="Register"
                            clear
                            icon={
                                <FontAwesome
                                    name='user-plus'
                                    size={24}
                                    color= 'blue'
                                />
                            }
                            titleStyle={{
                                color: "blue"
                            }}
                    />
                </View>
            </View>
        );
    }
}
class RegisterTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl + 'logo.png'
        }
    }
    processImage = async (imageUri) => {
       /*  let processedImage = await ImageManipulator.manipulate(
            imageUri, 
            [
                {resize: {width: 400}}
            ],
            {format: 'png'}
        ); */
       // console.log(processedImage);
       // this.setState({imageUrl: processedImage.uri });
        this.setState({imageUrl: imageUri });
    }
    getImageFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });    
        if (!result.cancelled) {
          this.processImage(result.uri);
        }
    }
    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                this.processImage(capturedImage.uri);
            }
        }
    }
    static navigationOptions = {
        title: 'Register',
        tabBarIcon: ({ tintColor, focused }) => (
            <FontAwesome
              name='user-plus'
              size={24}
              iconStyle={{ color: tintColor }}
            />
          ) 
    };
    handleRegister() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember)
            SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))
                .catch((error) => console.log('Could not save user info', error));
    }
    render() {
        return(
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image 
                        source={{uri: this.state.imageUrl}} 
                        loadingIndicatorSource={require('./images/logo.png')}
                        style={styles.image} 
                    />
                    <Button
                        title="Camera"
                        onPress={this.getImageFromCamera}
                    />
                    <Button
                        title="Gallery"
                        onPress={this.getImageFromGallery}
                    />
                </View>                
                <Input
                    placeholder="Username"
                    leftIcon={<FontAwesome name="user-o" size={24} />}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    />                
                <Input
                    placeholder="Password"
                    leftIcon={<FontAwesome name="key" size={24} />}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    />                
                <Input
                    placeholder="First Name"
                    leftIcon={<FontAwesome name="user-o" size={24} />}
                    onChangeText={(firstname) => this.setState({firstname})}
                    value={this.state.firstname}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Last Name"
                    leftIcon={<FontAwesome name="user-o" size={24} />}
                    onChangeText={(lastname) => this.setState({lastname})}
                    value={this.state.lastname}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Email"
                    leftIcon={<FontAwesome name="envelope-o" size={24}/>}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    containerStyle={styles.formInput}
                    />
                <Switch 
                    value={this.state.remember}
                    onValueChange={(value) => this.setState({remember: !this.state.remember})}                    
                    />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleRegister()}
                        title="Register"
                        icon={
                            <FontAwesome
                                name='user-plus'
                                size={24}
                                color= 'white'
                            />
                        }
                        buttonStyle={{
                            backgroundColor: "#512DA8"
                        }}
                        />
                </View>
            </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20,
        justifyContent:'space-around'
    },
    image: {
      margin: 10,
      width: 80,
      height: 60
    },
    formInput: {
        margin: 20
    },
    formCheckbox: {
        margin: 20,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }
});
const Login = createBottomTabNavigator({
    Login: LoginTab,
    Register: RegisterTab
}, {
    tabBarOptions: {
        activeBackgroundColor: '#9575CD',
        inactiveBackgroundColor: '#D1C4E9',
        activeTintColor: '#ffffff',
        inactiveTintColor: 'gray'
    }
});
export default Login;