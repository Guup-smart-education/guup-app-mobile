import React from 'react';
import {Alert} from 'react-native';
import {CourseTabContent} from '../_styled';
import {Text, Separator, Link} from './../../../ui';

interface IBio {
  readonly bio?: string;
  readonly onPress?: () => {};
}

const Bio: React.FC<IBio> = ({bio, onPress}) => {
  return (
    <CourseTabContent>
      {bio ? (
        <>
          <Text preset="button">Presentation</Text>
          <Separator size="tiny" />
          <Text preset="comment">{bio}</Text>
        </>
      ) : (
        <Link
          onPress={() =>
            onPress
              ? onPress()
              : Alert.alert('Add bio', 'Add some presentation data')
          }>
          Adicionar presentação
        </Link>
      )}
      <Separator size="large" />
    </CourseTabContent>
  );
};

export default Bio;
