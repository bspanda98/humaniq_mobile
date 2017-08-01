import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Animated, Text, ScrollView, TextInput } from 'react-native';
import VMasker from 'vanilla-masker';

import { HumaniqContactsApiLib } from 'react-native-android-library-humaniq-api';

import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation'

import { colors } from '../../utils/constants';
import { newTransaction } from '../../actions';

import PhoneKeyboard from '../Shared/Components/PhoneKeyboard';

const backWhite = require('./../../assets/icons/back_white.png');
const paymentBig = require('./../../assets/icons/payment_big.png');
const arrowDownWhite = require('../../assets/icons/arrow_down_white.png');
const searchWhite = require('./../../assets/icons/search_white.png');
const closeWhite = require('./../../assets/icons/close_white.png');
const doneWhite = require('./../../assets/icons/done_white.png');
const qr = require('./../../assets/icons/qr.png');
const phoneNumber = require('./../../assets/icons/phone_number.png');
const send = require('./../../assets/icons/send.png');

const getName = (cnt) => cnt.name || cnt.phone || ' ';
const nameSort = (a, b) => (a > b) ? 1 : (a < b) ? -1 : 0;
const sort = (a, b) => nameSort(getName(a), getName(b))

const pattern = { pattern: '(999) 999-9999', placeholder: '0' }

class Input extends React.Component {
  constructor(props) {
    super(props);
    const { newTransaction: { adress = '' } } = props;
    this.state = {
      adress: adress,
      contactID: '',
      maxPhoneLength: 19,
      phone: '',
      maskedPhone: VMasker.toPattern(0, pattern),
      code: '+1',
      flag: 'united_states',
      phoneError: new Animated.Value(0),
    };
  }

  handleNumberPress = (number) => {
    if (this.state.phone.length < this.state.maxPhoneLength) {
      let inputVal = this.state.phone;
      inputVal += number;
      const m = VMasker.toPattern(inputVal, pattern);
      this.setState({ phone: inputVal, maskedPhone: m });
    }
  };

  handleBackspacePress = () => {
    const inputVal = this.state.phone.slice(0, -1);
    const m = VMasker.toPattern(inputVal, pattern);
    this.setState({ phone: inputVal, maskedPhone: m });
  };

  setPhoneNumber = () => {
    const { code, maskedPhone } = this.state;
    const { setTrPhone, navigation: { navigate } } = this.props;
    const filtered = maskedPhone.split('').filter(s => '0123456789'.indexOf(s) >= 0).join('');
    setTrPhone(code + filtered);
    navigate('SelectAmount');
  }

  setAdress = () => {
    const { adress } = this.state;
    const { setTrAdress, navigation: { navigate } } = this.props;
    setTrAdress(adress);
    navigate('SelectAmount');
  }

  renderContent() {
    const { contacts } = this.props;
    const { navigation: { navigate, state: { params = {} } } } = this.props;
    return (
      params.mode === 'phone' ?
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={styles.telInput}>
          <TouchableOpacity
            style={styles.countryCodeContainer}
            onPress={() => {
              this.props.navigation.navigate('CountryCode',
                { refresh: (t, flag) => { t != null ? this.setState({ code: t, flag: flag }) : null } })
            } }>
            <Image style={styles.flag} source={{ uri: this.state.flag }}/>
            <Text style={[styles.code, this.state.error ? styles.error : null]}>{this.state.code}</Text>
            <Image style={[styles.arrow, this.state.error ? { tintColor: 'red' } : null]} source={arrowDownWhite}/>
          </TouchableOpacity>
          <Text style={[styles.number, this.state.error ? styles.error : null]}>{this.state.maskedPhone}</Text>
        </View>
        <PhoneKeyboard
          onNumberPress={this.handleNumberPress}
          onBackspacePress={this.handleBackspacePress}
          onHelpPress={this.setPhoneNumber}
        />
      </View> : params.mode === 'adress' ?
      <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
          <TextInput
            style={styles.inputText}
            placeholder="Enter HMQ Wallet Adress"
            placeholderTextColor="black"
            onChangeText={adress => this.setState({ adress })}
            value={this.state.adress}
          />
      </View> : null
    );
  }

  renderHeader() {
    const { selectedID, code, phone } = this.state;
    const { contacts, setTrPhone, navigation } = this.props;
    const { dispatch, navigate, state } = navigation;
    const { params = {} } = state;
    const { key } = state

    return (
      <View style={styles.header}>
        <View style={styles.headerInner}>
          <TouchableOpacity onPress={() => dispatch(NavigationActions.back())}>
            <Image source={backWhite} style={styles.headerImage} />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image source={paymentBig} style={styles.paymentImage} />
          </View>
          <TouchableOpacity onPress={params.mode === 'phone' ? this.setPhoneNumber : this.setAdress}>
            <Image source={doneWhite} style={styles.headerImage} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderContent()}
      </View>
    );
  }
}

const styles = ({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    //position: 'absolute',
    height: 66,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: colors.orangeish,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  headerInner: {
    marginLeft: 12,
    marginRight: 12,
    height: 66,
    backgroundColor: colors.orangeish,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerImage: {
    height: 24,
    width: 24,
    margin: 7,
  },
  paymentImage: {
    width: 38,
    height: 38,
  },
  // >>
  telInput: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryCodeContainer: {
    flexDirection: 'row',
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flag: {
    width: 32,
    height: 28,
  },
  arrow: {
    marginTop: 28.5,
    marginBottom: 24.5,
    width: 19,
    height: 19,
  },
  code: {
    fontSize: 25,
    color: colors.white_two,
    marginLeft: 4.5,
    lineHeight: 29,
  },
  number: {
    textAlign: 'center',
    fontSize: 25,
    marginLeft: 10,
    color: colors.white_two,
  },
  error: {
    color: '#f01434',
  },
  inputText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'left',
    color: 'black',
    height: 40,
    marginLeft: 26,
    marginRight: 26,
  },
});

const mapStateToProps = state => ({
  newTransaction: state.newtransaction,
  contacts: state.contacts,
});

export default connect(mapStateToProps, {
  setTrAdress: newTransaction.setTrAdress,
  setTrPhone: newTransaction.setTrPhone,
  setTrContact: newTransaction.setTrContact,
})(Input);