import React from 'react';
import {Comments} from './../../graphql/types.d';
import {Text, Separator} from './../../ui';
import GuupDate from './../Date';
import {
  CommentBody,
  CommentHeader,
  CommentFooter,
  CommentContainer,
} from './_styled';
import Avatar from './../Avatar';

export default ({description, ownerProfile, createdAt}: Comments) => {
  console.log('createdAt', createdAt);
  return (
    <CommentContainer>
      <CommentHeader>
        <Avatar
          size="comment"
          {...{
            image: ownerProfile?.thumbnailURL,
            firstText: ownerProfile?.displayName,
            secondText: ownerProfile?.profission,
          }}
        />
      </CommentHeader>
      <Separator size="lili" />
      <CommentBody>
        <Text preset="postComment">{description}</Text>
        {createdAt && (
          <>
            <Separator size="tiny" />
            <GuupDate date={createdAt} />
          </>
        )}
      </CommentBody>
      <CommentFooter />
    </CommentContainer>
  );
};
