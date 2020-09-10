import React from 'react';
import {ScrollView} from 'react-native';
import {Container, Separator, Text} from './../../ui';
import {LargeCard, Carousel} from './../../components';
import {ExplorerContainer, HeaderStyle, ExplorerCourseItem} from './_styled';
import {PropsApp} from './../../@types/app.navigation';

const ExplorerScreen: React.FC<PropsApp> = ({navigation: {navigate}}) => {
  return (
    <Container>
      <ExplorerContainer>
        {/* <HeaderStyle>
          <Text preset="title" color="primary">
            Escolhe um caminho
          </Text>
          <Separator size="lili" />
          <Text preset="paragraph" color="darkGrey">
            Se não sabe o destino, pouco importa o caminho
          </Text>
        </HeaderStyle>
        <Separator size="medium" /> */}
        <Carousel size={2} paging={false} showDots={false}>
          <ExplorerCourseItem>
            <LargeCard
              imageUri="https://source.unsplash.com/1200x1200/?programming"
              title="Some large course Name"
              description="Some short course duration"
              onPress={() => console.log('aasdsds')}
              onPress={() => navigate('GuupCourseDetail', {id: 'jsd-2cc-sfd'})}
            />
          </ExplorerCourseItem>
          <ExplorerCourseItem>
            <LargeCard
              imageUri="https://source.unsplash.com/1200x1200/?programming"
              title="Some large course Name"
              description="Some short course duration"
              onPress={() => console.log('aaaaa')}
            />
          </ExplorerCourseItem>
        </Carousel>
        {/* <Separator size="medium" />
        <LargeCard
          imageUri="https://source.unsplash.com/1200x1200/?programming"
          title="Some large course Name"
          description="Some short course duration"
        />
        <Separator size="medium" />
        <LargeCard
          imageUri="https://source.unsplash.com/1200x1200/?programming"
          title="Some large course Name"
          description="Some short course duration"
        />
        <Separator size="medium" />
        <LargeCard
          imageUri="https://source.unsplash.com/1200x1200/?programming"
          title="Some large course Name"
          description="Some short course duration"
        />
        <Separator size="medium" /> */}
      </ExplorerContainer>
    </Container>
  );
};

export default ExplorerScreen;
