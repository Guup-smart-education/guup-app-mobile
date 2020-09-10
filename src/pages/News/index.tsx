import React from 'react';
import {View} from 'react-native';
import {Separator} from './../../ui';
import {CreatePost, PostComment} from './../../components';
import {NewsContainer, NewsHeader, NewsBody, NewsContent} from './_styled';
import {PostProps} from './../../@types/post.comment';
import {PropsApp} from './../../@types/app.navigation';
import {GetUniqueId} from './../../helper';

const POSTS: Array<PostProps> = [
  {
    id: GetUniqueId(),
    owner: {
      ownerName: 'Marcos Rodriguez',
      ownerProsiffion: 'Javascript ENginner at Vivo',
    },
    menu: true,
    media: true,
    showComments: true,
    comments: 15,
    postComment:
      'Earlier this year, I decided that I was burned out in my current career as a tissue bank specialist (yes, it pays well... but the joke "I see dead people" is only clever the first 100 times you hear it).',
  },
  {
    id: GetUniqueId(),
    owner: {
      ownerName: 'Marcos Rodriguez',
      ownerProsiffion: 'Javascript ENginner at Vivo',
    },
    menu: true,
    showComments: true,
    comments: 15,
    postComment:
      'Earlier this year, I decided that I was burned out in my current career as a tissue bank specialist (yes, it pays well... but the joke "I see dead people" is only clever the first 100 times you hear it).',
  },
  {
    id: GetUniqueId(),
    owner: {
      ownerName: 'Marcos Rodriguez',
      ownerProsiffion: 'Javascript ENginner at Vivo',
    },
    menu: true,
    media: true,
    showComments: true,
    comments: 15,
    postComment:
      'Earlier this year, I decided that I was burned out in my current career as a tissue bank specialist (yes, it pays well... but the joke "I see dead people" is only clever the first 100 times you hear it).',
  },
  {
    id: GetUniqueId(),
    owner: {
      ownerName: 'Marcos Rodriguez',
      ownerProsiffion: 'Javascript ENginner at Vivo',
    },
    menu: true,
    showComments: true,
    comments: 15,
    postComment:
      'Earlier this year, I decided that I was burned out in my current career as a tissue bank specialist (yes, it pays well... but the joke "I see dead people" is only clever the first 100 times you hear it).',
  },
  {
    id: GetUniqueId(),
    owner: {
      ownerName: 'Marcos Rodriguez',
      ownerProsiffion: 'Javascript ENginner at Vivo',
    },
    menu: true,
    showComments: true,
    comments: 15,
    postComment:
      'Earlier this year, I decided that I was burned out in my current career as a tissue bank specialist (yes, it pays well... but the joke "I see dead people" is only clever the first 100 times you hear it).',
  },
  {
    id: GetUniqueId(),
    owner: {
      ownerName: 'Marcos Rodriguez',
      ownerProsiffion: 'Javascript ENginner at Vivo',
    },
    menu: true,
    media: true,
    showComments: true,
    comments: 15,
    postComment:
      'Earlier this year, I decided that I was burned out in my current career as a tissue bank specialist (yes, it pays well... but the joke "I see dead people" is only clever the first 100 times you hear it).',
  },
  {
    id: GetUniqueId(),
    owner: {
      ownerName: 'Marcos Rodriguez',
      ownerProsiffion: 'Javascript ENginner at Vivo',
    },
    menu: true,
    showComments: true,
    comments: 15,
    postComment:
      'Earlier this year, I decided that I was burned out in my current career as a tissue bank specialist (yes, it pays well... but the joke "I see dead people" is only clever the first 100 times you hear it).',
  },
  {
    id: GetUniqueId(),
    owner: {
      ownerName: 'Marcos Rodriguez',
      ownerProsiffion: 'Javascript ENginner at Vivo',
    },
    menu: true,
    showComments: true,
    comments: 15,
    media: true,
    postComment:
      'Earlier this year, I decided that I was burned out in my current career as a tissue bank specialist (yes, it pays well... but the joke "I see dead people" is only clever the first 100 times you hear it).',
  },
];

const NewsScreen: React.FC<PropsApp> = () => {
  return (
    <NewsContainer showsVerticalScrollIndicator={false}>
      <NewsHeader>
        <CreatePost />
      </NewsHeader>
      <Separator size="large" />
      <NewsBody>
        <NewsContent>
          {POSTS.map((post) => {
            return (
              <View key={GetUniqueId()}>
                <PostComment key={post.id} {...post} />
                <Separator size="large" />
              </View>
            );
          })}
        </NewsContent>
      </NewsBody>
    </NewsContainer>
  );
};

export default NewsScreen;
