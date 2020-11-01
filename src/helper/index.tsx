import {StyleSheet} from 'react-native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

export const GetUniqueId = () => {
  return uuidv4();
};

export const shadowStyle = StyleSheet.create({
  newPost: {
    shadowColor: '#17171E',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4.84,
    elevation: 5,
  },
});
