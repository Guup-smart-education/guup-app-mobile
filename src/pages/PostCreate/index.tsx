import React, {useState, useEffect} from 'react';
import {
  Container,
  Text,
  Action,
  Icon,
  InputArea,
  Separator,
  Link,
} from './../../ui';
import {
  KeyboardBlock,
  GuupHeader,
  GuupFooter,
  GuupUpload,
} from './../../components';
import {PropsApp} from './../../@types/app.navigation';
import {
  CreateContainer,
  CreateBody,
  CreateHeader,
  CreateActions,
  CreateDescription,
  CreateTitle,
  CreateImage,
  CreateInput,
  CreateFooter,
} from './_styled';
import {useCreatePostMutation} from './../../graphql/types.d';
import {Alert} from 'react-native';

const PostCreate: React.FC<PropsApp> = ({navigation: {goBack}}) => {
  const [createPost, {loading, data, error}] = useCreatePostMutation();
  const [post, setPost] = useState<string>('');
  const [postImage, setPostImage] = useState<string>('');
  // Effects
  useEffect(() => {
    if (data?.createPost?.__typename === 'CreatePost') {
      Alert.alert('Parabens!! 🎉', 'Publicação feita com sucesso', [
        {
          onPress: () => goBack(),
        },
      ]);
    } else if (data?.createPost?.__typename === 'ErrorResponse') {
      Alert.alert(
        'Error!! 😅',
        data.createPost.error.message ||
          'Aconteceu um problema, tente novamente',
      );
    }
    return () => {
      setPost('');
    };
  }, [data, goBack]);
  useEffect(() => {
    if (error) {
      Alert.alert(
        'Problema inesperado!! 😭',
        error.message || 'Aconteceu um problema, tente novamente',
      );
    }
  }, [error]);
  // End effects
  const sendPosts = () => {
    createPost({
      variables: {
        description: post,
      },
    });
  };
  return (
    <Container safe light>
      <KeyboardBlock hasKeyboardDismiss>
        <CreateContainer>
          <CreateHeader>
            <GuupHeader
              leftRenderIntem={
                <Action onPress={() => !loading && goBack()}>
                  <Icon source="arrow" />
                </Action>
              }
              centerRenderItem={
                <Text preset="comment" bold>
                  Post
                </Text>
              }
            />
          </CreateHeader>
          <CreateBody>
            <CreateDescription>
              <CreateTitle>
                <Text preset="subtitle">
                  Compartilhe alguma coisa interesante
                </Text>
              </CreateTitle>
              <CreateImage>
                <GuupUpload onResponse={(val: string) => setPostImage(val)} />
              </CreateImage>
            </CreateDescription>
            <Separator size="medium" />
            <CreateInput>
              <InputArea
                onChangeText={(val: string) => setPost(val)}
                placeholder="Digita aqui a sua publicação"
              />
            </CreateInput>
          </CreateBody>
          <Separator size="stroke" />
          <CreateFooter>
            <GuupFooter color="ligth">
              <CreateActions>
                <Link disable={loading} color="dark" onPress={() => goBack()}>
                  Fechar
                </Link>
                <Link
                  preset="solid"
                  disable={!post}
                  loading={loading}
                  onPress={() => {
                    sendPosts();
                  }}>
                  Próximo
                </Link>
              </CreateActions>
            </GuupFooter>
          </CreateFooter>
        </CreateContainer>
      </KeyboardBlock>
    </Container>
  );
};

export default PostCreate;