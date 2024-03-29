/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    Dimensions,
    Platform,
    Linking,
    View
} from 'react-native';
import * as theme from '../../themes';
import {connect} from 'react-redux';
import {getBusiness} from '../../actions/businessActions';
import {getCategories} from '../../actions/categoryActions';
import {Card, ListItem, Button, Icon} from 'react-native-elements'
import {FloatingAction} from "react-native-floating-action";
import {removeCart, updateCart} from '../../actions/cartActions';
import {THEME_COLOR} from '../../properties';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import moment from 'moment';
import styles from './AboutUsStyles'

const {width, height} = Dimensions.get('window');

class AboutUs extends React.Component {

    callBusiness = () => {

        let phoneNumber = '';

        if (Platform.OS === 'android') {
            phoneNumber = 'tel:${' + this.props.business.business.contact.phone + '}';
        } else {
            phoneNumber = 'telprompt:${' + this.props.business.business.contact.phone + '}';
        }

        Linking.openURL(phoneNumber);
    };

    renderOpenHours = () => {
        let openHours = [];
        this
            .props
            .business
            .business
            .pickUpHours
            .map((u, i) => {
                var startDate = (moment(u.from, 'HH:mm').toDate())
                var startFormat = moment(startDate).format('hh:mm A')

                var endDate = (moment(u.to, 'HH:mm').toDate())
                var endFormat = moment(endDate).format('hh:mm A')
                openHours.push(
                    <View style={{
                        marginTop: 10
                    }}>
                        <Text>{u.dayOfWeek}</Text>
                        <Text>{startFormat}
                            - {endFormat}</Text>
                    </View>

                );
            })

        return openHours;
    };

    renderDeliveryHours = () => {
        let openHours = [];

        this
            .props
            .business
            .business
            .deliveryHours
            .map((u, i) => {
                var startDate = (moment(u.from, 'HH:mm').toDate())
                var startFormat = moment(startDate).format('hh:mm A')

                var endDate = (moment(u.to, 'HH:mm').toDate())
                var endFormat = moment(endDate).format('hh:mm A')
                openHours.push(
                    <View style={{
                        marginTop: 10
                    }}>
                        <Text>{u.dayOfWeek}</Text>
                        <Text>{startFormat}
                            - {endFormat}</Text>
                    </View>

                );
            })

        return openHours;
    };

    render() {
        const {navigate} = this.props.navigation;
        const {business} = this.props.business;
        return (
            <SafeAreaView style={{backgroundColor:'#d0d2d2'}}>
                <ScrollView>
                    <View>
                        <View style={[styles.container]}>
                            <View style={[styles.card]}>
                                <View style={[styles.padding10]}>
                                    <Text>{business.name}</Text>
                                </View>
                            </View>

                            <View style={[styles.card]}>
                                <View style={[styles.padding10]}>
                                    <Text style={[styles.headerFont]}>Address</Text>
                                    <Text>{business.address.line1} {business.address.line2}
                                        {business.address.street}
                                        {business.address.city}
                                    </Text>
                                </View>
                            </View>

                            <View style={[styles.card]}>
                                <View style={[styles.padding10]}>
                                    <Text style={[styles.headerFont]}>Phone</Text>
                                    <Text>+{business.contact.phone}</Text>
                                </View>

                                <TouchableOpacity style={[styles.cardButton]} onPress={this.callBusiness()}>
                                    <Text style={[styles.cardFont]}>Call Now</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={[styles.card]}>
                                <View style={[styles.padding10]}>
                                    <Text style={[styles.headerFont]}>Email</Text>
                                    <Text>{business.email}</Text>
                                </View>

                                <TouchableOpacity
                                    style={[styles.cardButton]}
                                    onPress={() => Linking.openURL('mailto:' + business.email)}>
                                    <Text style={[styles.cardFont]}>Call Now</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={[styles.card]}>
                                <View style={[styles.padding10]}>
                                    <Text style={[styles.headerFont]}>Shop Open Hours</Text>
                                    {this.renderOpenHours()}

                                    <View style={[styles.container]}>
                                        <View style={[styles.noteContainer]}>
                                        {this.props.business.business.pickUpHours.length === 0 ?
                                            <Text>This business accepts orders 24/7</Text>
                                            :
                                            <Text>We accept orders only during these hours</Text>
                    }
                                        </View>
                                    </View>

                                </View>
                            </View>

                            <View style={[styles.card]}>
                                <View style={[styles.padding10]}>
                                    <Text style={[styles.headerFont]}>Delivery Hours</Text>
                                    {this.renderDeliveryHours()}

                                    <View style={[styles.container]}>
                                        <View style={[styles.noteContainer]}>

                                        {this.props.business.business.deliveryHours.length === 0 ?
                                            <Text>This business accepts orders 24/7</Text>
                                            :
                                            <Text>We accept orders only during these hours</Text>
                    }
                                        </View>
                                    </View>

                                </View>
                            </View>

                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => ({business: state.business})

export default connect(mapStateToProps, null)(AboutUs);