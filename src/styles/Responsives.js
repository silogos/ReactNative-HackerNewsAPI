import {Dimensions} from 'react-native';

export const Sizes = {
  xsmall: {min: 0, max: 599},
  small: {min: 600, max: 1023},
  medium: {min: 1024, max: 1439},
  large: {min: 1440, max: 1919},
  xlarge: {min: 1920, max: Infinity},
};

const Responsives = {
  getSize() {
    const windowWidth = Dimensions.get('window').width;
    let res = null;

    Object.keys(Sizes).every(key => {
      res = key;
      if (windowWidth >= Sizes[key].min && windowWidth <= Sizes[key].max) {
        return false;
      }
      return true;
    });
    return res;
  },
  select(data = {xsmall: 1, small: 2, medium: 3, large: 4, xlarge: 5}) {
    let size = Responsives.getSize();
    return data[size];
  },
  mediaBetween(
    media = [
      {minWidth: 0, maxWidth: 719, value: 16},
      {minWidth: 720, maxWidth: Infinity, value: 24},
    ],
  ) {
    const windowWidth = Dimensions.get('window').width;
    let res = null;

    media.every(({minWidth, maxWidth, value}) => {
      if (windowWidth >= minWidth && windowWidth <= maxWidth) {
        res = value;
        return false;
      }
      return true;
    });

    return res;
  },
  mediaMin(media = [{width: 719, value: 16}, {width: Infinity, value: 24}]) {
    const windowWidth = Dimensions.get('window').width;
    let res = null;

    media.every(({width, value}) => {
      if (windowWidth <= width) {
        res = value;
        return false;
      }
      return true;
    });

    return res;
  },
  mediaMax(media = [{width: 719, value: 16}, {width: Infinity, value: 24}]) {
    const windowWidth = Dimensions.get('window').width;
    let res = null;

    media.every(({width, value}) => {
      if (windowWidth => width) {
        res = value;
        return false;
      }
      return true;
    });

    return res;
  },
};

export default Responsives;

//                              Android Responsive
// | Breakpoint Range (dp) | Portrait       | Landscape      | Window | Columns | Margins / Gutters* |
// |-----------------------|----------------|----------------|--------|---------|--------------------|
// | 0 – 359               | small handset  |                | xsmall | 4       | 16                 |
// | 360 – 399             | medium handset |                | xsmall | 4       | 16                 |
// | 400 – 479             | large handset  |                | xsmall | 4       | 16                 |
// | 480 – 599             | large handset  | small handset  | xsmall | 4       | 16                 |
// | 600 – 719             | small tablet   | medium handset | small  | 8       | 16                 |
// | 720 – 839             | large tablet   | large handset  | small  | 8       | 24                 |
// | 840 – 959             | large tablet   | large handset  | small  | 12      | 24                 |
// | 960 – 1023            |                | small tablet   | small  | 12      | 24                 |
// | 1024 – 1279           |                | large tablet   | medium | 12      | 24                 |
// | 1280 – 1439           |                | large tablet   | medium | 12      | 24                 |
// | 1440 – 1599           |                |                | large  | 12      | 24                 |
// | 1600 – 1919           |                |                | large  | 12      | 24                 |
// | 1920 +                |                |                | xlarge | 12      | 24                 |

//                              iOS Responsive
// | Device                                     | Orientation | Vertical Size Category | Horizontal Size Category | Columns | Margins/ Gutters* |
// |--------------------------------------------|-------------|------------------------|--------------------------|---------|-------------------|
// | iPhone                                     | Portrait    | Regular                | Compact                  | 4       | 16                |
// | iPhone                                     | Landscape   | Compact                | Compact                  | 4       | 16                |
// | iPhone Plus                                | Portrait    | Regular                | Compact                  | 4       | 16                |
// | iPhone Plus                                | Landscape   | Compact                | Regular                  | 4       | 16                |
// | iPad                                       | Portrait    | Regular                | Regular                  | 8       | 16                |
// | iPad                                       | Landscape   | Regular                | Regular                  | 8       | 24                |
// | iPad - Even Split Multitasking             | Portrait    | Regular                | Compact                  | 12      | 24                |
// | iPad - Even Split Multitasking             | Landscape   | Regular                | Compact                  | 12      | 24                |
// | iPad - 2/3 Split Multitasking              | Portrait    | Regular                | Compact                  | 12      | 24                |
// | iPad - 2/3 Split Multitasking - First App  | Landscape   | Regular                | Regular                  | 12      | 24                |
// | iPad - 2/3 Split Multitasking - Second App | Landscape   | Regular                | Compact                  | 12      | 24                |
// | iPad Pro - Even Split Multitasking         | Portrait    | Regular                | Compact                  | 12      | 24                |
// | iPad Pro 13in - Even Split Multitasking    | Landscape   | Regular                | Regular                  | 12      | 24                |

// #ANDROID
// Device,Orientation,Vertical Size Category,Horizontal Size Category,Columns,Margins/ Gutters*
// iPhone,Portrait,Regular,Compact,4,16
// iPhone,Landscape,Compact,Compact,4,16
// iPhone Plus,Portrait,Regular,Compact,4,16
// iPhone Plus,Landscape,Compact,Regular,4,16
// iPad,Portrait,Regular,Regular,8,16
// iPad,Landscape,Regular,Regular,8,24
// iPad - Even Split Multitasking,Portrait,Regular,Compact,12,24
// iPad - Even Split Multitasking,Landscape,Regular,Compact,12,24
// iPad - 2/3 Split Multitasking,Portrait,Regular,Compact,12,24
// iPad - 2/3 Split Multitasking - First App,Landscape,Regular,Regular,12,24
// iPad - 2/3 Split Multitasking - Second App,Landscape,Regular,Compact,12,24
// iPad Pro - Even Split Multitasking,Portrait,Regular,Compact,12,24
// iPad Pro 13in - Even Split Multitasking,Landscape,Regular,Regular,12,24

// #iOS
// Device,Orientation,Vertical Size Category,Horizontal Size Category,Columns,Margins/ Gutters*
// iPhone,Portrait,Regular,Compact,4,16
// iPhone,Landscape,Compact,Compact,4,16
// iPhone Plus,Portrait,Regular,Compact,4,16
// iPhone Plus,Landscape,Compact,Regular,4,16
// iPad,Portrait,Regular,Regular,8,16
// iPad,Landscape,Regular,Regular,8,24
// iPad - Even Split Multitasking,Portrait,Regular,Compact,12,24
// iPad - Even Split Multitasking,Landscape,Regular,Compact,12,24
// iPad - 2/3 Split Multitasking,Portrait,Regular,Compact,12,24
// iPad - 2/3 Split Multitasking - First App,Landscape,Regular,Regular,12,24
// iPad - 2/3 Split Multitasking - Second App,Landscape,Regular,Compact,12,24
// iPad Pro - Even Split Multitasking,Portrait,Regular,Compact,12,24
// iPad Pro 13in - Even Split Multitasking,Landscape,Regular,Regular,12,24
