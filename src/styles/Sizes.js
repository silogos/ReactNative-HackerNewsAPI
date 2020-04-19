import {Dimensions, PixelRatio} from 'react-native';
import Responsives from './Responsives';

const Sizes = {
  // Layout
  header: 60,
  get layout() {
    return Dimensions.get('screen');
  },
  column: Responsives.mediaBetween([
    {minWidth: 0, maxWidth: 599, value: 4},
    {minWidth: 600, maxWidth: 839, value: 8},
    {minWidth: 840, maxWidth: Infinity, value: 24},
  ]),
  margin: Responsives.mediaBetween([
    {minWidth: 0, maxWidth: 719, value: 16},
    {minWidth: 720, maxWidth: Infinity, value: 24},
  ]),
  get gutter() {
    return this.margin;
  },

  // Font
  get fontSizeBase() {
    return PixelRatio.roundToNearestPixel(14);
  },
  get fontSizeD1() {
    return PixelRatio.roundToNearestPixel(30);
  },
  get fontSizeSaldo() {
    return PixelRatio.roundToNearestPixel(28);
  },
  get fontSizeD2() {
    return PixelRatio.roundToNearestPixel(20);
  },
  get fontSizeH1() {
    return PixelRatio.roundToNearestPixel(18);
  },
  get fontSizeH2() {
    return PixelRatio.roundToNearestPixel(16);
  },
  get fontSizeH3() {
    return PixelRatio.roundToNearestPixel(14);
  },
  get fontSizeCaption() {
    return PixelRatio.roundToNearestPixel(12);
  },
};

export default Sizes;
