import {StyleSheet} from 'react-native';
import {Fonts} from '../assets';

export const Colors = require('./Colors').default;
export const Sizes = require('./Sizes').default;
export const Responsives = require('./Responsives').default;

export const Shadow = elevation => ({
  elevation,
  shadowColor: 'black',
  shadowOffset: {width: 0, height: 0.5 * elevation},
  shadowOpacity: 0.3,
  shadowRadius: 0.8 * elevation,
  marginVertical: elevation,
});

export const Styles = StyleSheet.create({
  fontBody1: {
    fontFamily: Fonts.OpenSans.Regular,
    fontSize: Sizes.fontSizeBase,
    color: Colors.primary.black,
  },
  fontBody2: {
    fontFamily: Fonts.OpenSans.Bold,
    fontSize: Sizes.fontSizeBase,
    color: Colors.primary.black,
  },
  fontSubHeading: {
    fontFamily: Fonts.OpenSans.SemiBold,
    fontSize: Sizes.fontSizeBase,
    color: Colors.primary.black,
  },
  fontCaption: {
    fontFamily: Fonts.OpenSans.Regular,
    fontSize: Sizes.fontSizeCaption,
    color: Colors.primary.black,
  },
  fontTitle1: {
    fontFamily: Fonts.OpenSans.Bold,
    fontSize: Sizes.fontSizeBase,
    color: Colors.primary.black,
  },
  fontTitle2: {
    fontFamily: Fonts.OpenSans.Bold,
    fontSize: Sizes.fontSizeH2,
    color: Colors.primary.black,
  },
  fontTitle3: {
    fontFamily: Fonts.OpenSans.Bold,
    fontSize: Sizes.fontSizeH1,
    color: Colors.primary.black,
  },
  fontDisplay1: {
    fontFamily: Fonts.OpenSans.Bold,
    fontSize: Sizes.fontSizeD2,
    color: Colors.primary.black,
  },
  fontDisplay2: {
    fontFamily: Fonts.OpenSans.Bold,
    fontSize: Sizes.fontSizeD1,
    color: Colors.primary.black,
  },
});
