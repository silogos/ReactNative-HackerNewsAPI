import { StyleSheet } from 'react-native';
import { Colors } from '../../styles'
import { Sizes } from '../../styles';
import Responsives from '../../styles/Responsives';

export const COLUMN = Responsives.mediaBetween([
  {minWidth: 0, maxWidth: 599, value: 2},
  {minWidth: 600, maxWidth: 839, value: 3},
  {minWidth: 840, maxWidth: Infinity, value: 8},
]) 

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white,
  },
  progressBar: {
    height: 5,
    backgroundColor: Colors.progressBar
  },
  headerWrapper: {
    padding: Sizes.margin,
    borderBottomWidth: 1, 
    borderColor: '#000'
  },
  headerLabel: {
    fontSize: 17,
    color: Colors.primary.black,
    lineHeight: 20
  },
  headerTitle: {
    padding: Sizes.margin,
    fontSize: 15,
    lineHeight: 18,
    textAlign: 'center'
  },
  footerWrapper: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listItem: {
    flex: 1,
    padding: Sizes.margin,
    borderColor: '#000',
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    aspectRatio: 1
  }
});
