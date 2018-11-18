import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native';
import {
    Container,
    Content,
    Form,
    Button,
    Text,
    Switch,
    Item,
    Input,
    Icon
} from 'native-base';

import { Font } from 'expo';
// import { MonoText } from '../components/StyledText';
import MyHeader from '../components/Header';
import MySegment from '../components/Segment';
import Dropdown from '../components/Dropdown';
import TimePicker from '../components/TimePicker';
// import Confirmation from '../components/Confirmation';

class HomeScreen extends Component {
    static navigationOptions = {
        header: null
    };

    state = {
        // userName: '',
        // userId: '',
        ride: true,
        // lat: '',
        // long: '',
        home: '',
        selectedEvent: 0,
        selectedRendezvous: 0,
        selectedSeats: 0,
        from: '5:00 PM',
        to: '7:00 PM',
        // isLoading: false,
        events: [
            {
                label: 'Kings vs. Sixers 11/19',
                value: 0
            },
            {
                label: 'Kings vs. Warriors 11/19',
                value: 1
            },
            {
                label: 'Kings vs. Rockets 11/19',
                value: 2
            },
            {
                label: 'Kings vs. Lakers 11/19',
                value: 3
            },
            {
                label: 'Kings vs. Celtics 11/19',
                value: 4
            }
        ],
        rendezvous: [
            {
                label: 'Gate A',
                value: 0
            },
            {
                label: 'Gate B',
                value: 1
            },
            {
                label: 'Gate C',
                value: 2
            },
            {
                label: 'Gate D',
                value: 3
            },
            {
                label: 'Gate E',
                value: 4
            }
        ],
        seats: [
            {
                label: '1',
                value: 0
            },
            {
                label: '2',
                value: 1
            },
            {
                label: '3',
                value: 2
            },
            {
                label: '4',
                value: 3
            },
            {
                label: '5',
                value: 4
            }
        ]
    };

    // change to OpenSans font
    componentDidMount() {
        Font.loadAsync({
            'open-sans-bold': require('../assets/fonts/SpaceMono-Regular.ttf')
        });
    }

    onPress = () => {
        this.setState({ ride: !this.state.ride });
    };

    handleFromPicked = (date, fn) => {
        this.setState({ from: date.toString() });
        fn();
    };

    handleToPicked = (date, fn) => {
        this.setState({ to: date.toString() });
        // this.hideToPicker();
        fn();
    };

    // dropdown handler
    onEventChange = value => {
        this.setState({ selectedEvent: value });
    };

    onRendezvousChange = value => {
        this.setState({ selectedRendezvous: value });
    };

    onSeatChange = value => {
        this.setState({ selectedSeats: value });
    };

    onHomeChange = value => {
        this.setState({ home: value });
    };

    onSubmit = () => {
        Alert.alert('You tapped the button!');
        fetch('http://10.2.1.217:8500', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 'driver',
                user_name: 'Jason Wang',
                user_id: '67890',
                lat: '30',
                lon: '40',
                from_time: '15:00',
                to_time: '17:00',
                rendezvous: 'gate 1',
                seat_available: '3'
            })
        })
            .then(response => {
                console.log(response);
                this.props.navigation.navigate('Confirmation');
            })
            .catch(error => {
                console.log(error);
            });
    };

    // onBack = () => {
    //     this.setState({ isLoading: false });
    // };

    render() {
        const { from, to } = this.state;
        return (
            <Container style={styles.Container}>
                <MyHeader title="Welcome Jason" />
                <Content style={styles.Content}>
                    {/* <Text>{JSON.stringify(this.state)}</Text> */}
                    <Content>
                        <Text style={styles.TextContainer}>FanScoop</Text>
                        <MySegment
                            ride={this.state.ride}
                            onPress={this.onPress}
                        />
                        <Form style={styles.Form}>
                            <Item
                                style={{
                                    marginTop: -30,
                                    justifyContent: 'flex-start'
                                }}
                            >
                                <Icon
                                    name="ios-home"
                                    style={{
                                        flex: 1,
                                        color: 'white',
                                        fontWeight: 'bold'
                                    }}
                                />
                                <Input
                                    style={{ flex: 1, color: 'white' }}
                                    placeholder="1 Sports Pkwy, Sacramento, CA 95834"
                                    placeholderTextColor="white"
                                    value={this.state.home}
                                    onChange={this.onHomeChange}
                                />
                            </Item>
                            <Dropdown
                                style={styles.Event}
                                text="CHOOSE YOUR EVENT:"
                                placeholder="Kings vs Lakers"
                                datas={this.state.events}
                                onValueChange={this.onEventChange}
                                selectedValue={this.state.selectedEvent}
                            />
                            {!this.state.ride && (
                                <Dropdown
                                    style={styles.Seat}
                                    text="SEATS AVAILABLE:"
                                    placeholder="Seats Available:"
                                    datas={this.state.seats}
                                    onValueChange={this.onSeatChange}
                                    selectedValue={this.state.selectedSeats}
                                />
                            )}
                            <TimePicker
                                text="YOUR PICKUP TIME:"
                                from={from}
                                to={to}
                            />
                            {!this.state.ride && (
                                <Dropdown
                                    style={styles.Rendezvous}
                                    text="RENDEZVOUS LOCATION:"
                                    placeholder="RENDEZVOUS LOCATION:"
                                    datas={this.state.rendezvous}
                                    onValueChange={this.onRendezvousChange}
                                    selectedValue={
                                        this.state.selectedRendezvous
                                    }
                                />
                            )}
                            <Button
                                primary
                                style={styles.ButtonContainer}
                                onPress={this.onSubmit}
                            >
                                <Text> Schedule </Text>
                            </Button>
                        </Form>
                    </Content>
                </Content>
            </Container>
        );
    }

    // _maybeRenderDevelopmentModeWarning() {
    //     if (__DEV__) {
    //         const learnMoreButton = (
    //             <Text
    //                 onPress={this._handleLearnMorePress}
    //                 style={styles.helpLinkText}
    //             >
    //                 Learn more
    //             </Text>
    //         );

    //         return (
    //             <Text style={styles.developmentModeText}>
    //                 Development mode is enabled, your app will be slower but you
    //                 can use useful development tools. {learnMoreButton}
    //             </Text>
    //         );
    //     }
    //     return (
    //         <Text style={styles.developmentModeText}>
    //             You are not in development mode, your app will run at full
    //             speed.
    //         </Text>
    //     );
    // }

    // _handleLearnMorePress = () => {
    //     WebBrowser.openBrowserAsync(
    //         'https://docs.expo.io/versions/latest/guides/development-mode'
    //     );
    // };

    // _handleHelpPress = () => {
    //     WebBrowser.openBrowserAsync(
    //         'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    //     );
    // };
}

export default HomeScreen;

const styles = StyleSheet.create({
    Container: {
        backgroundColor: '#DFE3EE'
    },
    Content: {
        flex: 1,
        backgroundColor: '#54327E',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20
    },
    TextContainer: {
        flex: 1,
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white'
    },
    Switch: {
        flex: 1,
        alignSelf: 'center',
        marginTop: 1
    },
    Form: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        marginTop: 20,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    ButtonContainer: {
        marginTop: 15,
        marginLeft: 110
    },
    inputContainer: {},
    Rendezvous: {
        marginTop: 10
    }
});
