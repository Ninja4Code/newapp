import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Modal, Button, Alert, PanResponder } from 'react-native';
import { Card, Input, Rating } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
}
const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})

function RenderDish(props) {
    const dish = props.dish;
    const handleViewRef = ref => this.view = ref;

    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if ( dx < -200 )
            return true;
        else
            return false;
    }
    const recognizeComment = ({ moveX, moveY, dx, dy }) => {
        if ( dx > 200 )
            return true;
        else
            return false;
    }
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {
            this.view.rubberBand(1000)
            .then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));
        },
        onPanResponderEnd: (e, gestureState) => {
           if (recognizeDrag(gestureState)){
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                    ],
                    { cancelable: false }
                );//end alert
                return true;
            }//end if recognizeDrag
            else if (recognizeComment(gestureState)){
                props.toggleModal();
            }
        }//end onResponderEnd
    })//end PanResponder.create
    
        if (dish != null) {
            return(
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000} ref={this.handleViewRef} {...panResponder.panHandlers}>
                    <Card
                    featuredTitle={dish.name}
                    image={{uri: baseUrl + dish.image}}>
                        <Text style={{margin: 10}}>
                            {dish.description}
                        </Text>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <FontAwesome
                                raised
                                reverse
                                size={24}
                                name={ props.favorite ? 'heart' : 'heart-o'}
                                color='#f50'
                                style={{flex: 1}}
                                onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                                />
                            <FontAwesome
                                raised
                                reverse
                                size={24}
                                name='pencil'                                
                                color='#512da7'
                                style={{flex: 1}}
                                onPress={ () => props.toggleModal() }                        
                                />
                            </View>
                    </Card>
                </Animatable.View>
            );
        }
        else {
            return(<View></View>);
        }
}
function RenderComments(props) {

    const comments = props.comments;            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
          );
        };    
        return (
            <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title='Comments' >
                <FlatList 
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                    />
            </Card>
        </Animatable.View>
    );
}
class DishDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favorites: [],
            showModal: false,
            rating: 3,
            author: '',
            comment: ''
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleRating = this.handleRating.bind(this);
        this.handleComment = this.handleComment.bind(this);
    }
    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }
    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }
    handleRating(rating) {
        this.setState({ rating: rating }) 
    }
    handleComment(dishId, rating, author, comment) {
        this.props.postComment(dishId, rating, author, comment);
        this.toggleModal();
    }
    static navigationOptions = {
        title: 'Dish Details'
    };
    render() {
        const dishId = this.props.navigation.getParam('dishId','');
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)} 
                    toggleModal={ () => this.toggleModal()}
                    />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />

                <Modal 
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={ () => this.toggleModal() }
                    >
                    <View style={{ justifyContent: 'center',margin: 10}}>
                        <Rating
                            showRating
                            type="star"
                            fractions={0}
                            startingValue={this.state.rating}
                            imageSize={40}
                            style={{ paddingVertical: 10 }}
                            onFinishRating={ this.handleRating }
                        />
                        <Input
                            placeholder="Author"
                            leftIcon={<FontAwesome name="user-o" size={24} />}
                            onChangeText={ author => this.setState({ author: author })}
                        />
                        <Input
                            placeholder="Comment"
                            leftIcon={<FontAwesome name="comment-o" size={24} />}
                            onChangeText={ comment => this.setState({ comment: comment })}
                        />
                        <View style={{ marginBottom: 20, marginTop: 20}}>
                            <Button
                                onPress={ () => this.handleComment( dishId, this.state.rating, this.state.author, this.state.comment ) }
                                title="Submit"
                                color="#512DA8"
                                accessibilityLabel="Post your comment"
                            />
                        </View>
                        <View>
                            <Button
                                onPress={this.toggleModal}
                                title="Dismiss"
                                color="#808080"
                                accessibilityLabel="Dismiss modal"
                            />
                        </View>
                        
                    </View>
                </Modal>

            </ScrollView>   
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);