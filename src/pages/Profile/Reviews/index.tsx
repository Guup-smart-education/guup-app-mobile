import React from 'react';
import {View} from 'react-native';
import {CourseTabContent} from '../_styled';
import {Separator} from './../../../ui';
import {PostComment} from './../../../components';
import {GetUniqueId} from './../../../helper';
import {PostProps} from './../../../@types/post.comment';

const POSTS: Array<PostProps> = [
  {
    id: GetUniqueId(),
    owner: {
      ownerName: 'Marcos Rodriguez',
      ownerProsiffion: 'Javascript ENginner at Vivo',
    },
    ratingValue: '4.5',
    postComment:
      'Earlier this year, I decided that I was burned out in my current career as a tissue bank specialist (yes, it pays well... but the joke "I see dead people" is only clever the first 100 times you hear it).',
  },
  {
    id: GetUniqueId(),
    owner: {
      ownerName: 'Marcos Rodriguez',
      ownerProsiffion: 'Javascript ENginner at Vivo',
    },
    ratingValue: '4.5',
    postComment:
      'Earlier this year, I decided that I was burned out in my current career as a tissue bank specialist (yes, it pays well... but the joke "I see dead people" is only clever the first 100 times you hear it).',
  },
  {
    id: GetUniqueId(),
    owner: {
      ownerName: 'Marcos Rodriguez',
      ownerProsiffion: 'Javascript ENginner at Vivo',
    },
    ratingValue: '4.5',
    postComment:
      'Earlier this year, I decided that I was burned out in my current career as a tissue bank specialist (yes, it pays well... but the joke "I see dead people" is only clever the first 100 times you hear it).',
  },
  {
    id: GetUniqueId(),
    owner: {
      ownerName: 'Marcos Rodriguez',
      ownerProsiffion: 'Javascript ENginner at Vivo',
    },
    ratingValue: '4.5',
    postComment:
      'Earlier this year, I decided that I was burned out in my current career as a tissue bank specialist (yes, it pays well... but the joke "I see dead people" is only clever the first 100 times you hear it).',
  },
];

export default () => {
  return (
    <CourseTabContent>
      {POSTS.map((post) => (
        <View key={GetUniqueId()}>
          <PostComment {...post} key={post.id} />
          <Separator size="large" />
        </View>
      ))}
    </CourseTabContent>
  );
};
