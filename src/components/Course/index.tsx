import React from 'react';
import {Text, Separator} from './../../ui';
import {
  CourseContainer,
  CourseContent,
  CourseData,
  CoursePrice,
} from './_styled';

type CourseProps = {
  readonly largeName: string;
  readonly contentHours: string;
  readonly priceValue: string;
};

export default ({largeName, contentHours, priceValue}: CourseProps) => {
  return (
    <CourseContainer>
      <CourseContent>
        <CoursePrice>
          <Text>{priceValue}</Text>
        </CoursePrice>
        <CourseData>
          <Text preset="paragraph" bold>
            {largeName}
          </Text>
          <Separator size="lili" />
          <Text preset="label">{contentHours}</Text>
        </CourseData>
      </CourseContent>
    </CourseContainer>
  );
};
