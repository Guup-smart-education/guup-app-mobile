import R from 'ramda';
import React, {useContext} from 'react';
import {Alert} from 'react-native';
import {Container, Text, Button, Icon, Link, Separator} from './../../ui';
import {GuupHeader, GuupMenuList} from './../../components';
import {
  AccountContainer,
  AccountHeader,
  AccountBody,
  AccountFooter,
  AccountInformation,
  AccountUserAvatar,
  AccountUserName,
  AccountUserDescription,
} from './_styled';
import AuthContext from './../../contexts/auth';
import {useNavigation} from '@react-navigation/native';
import {IMenuItemProps} from './../../@types/menu.item';
import {AppScreenNavigationProp} from './../../@types/app.navigation';

const GuupAccount: React.FC<AppScreenNavigationProp> = () => {
  const {navigate, goBack} = useNavigation<AppScreenNavigationProp>();
  const {user} = useContext(AuthContext);
  const MENU_ACCOUNT: Array<IMenuItemProps> = [
    // {
    //   text: 'Minhas coleções',
    //   onPress: () => navigate('GuupCollections'),
    // },
    {
      icon: 'video',
      text: 'Meus conteudos',
      onPress: () => navigate('GuupCourses'),
    },
    {
      icon: 'news',
      text: 'Minhas publicações',
      onPress: () => navigate('GuupPosts'),
    },
    // {
    //   icon: 'save',
    //   text: 'Conteudos salvos',
    //   onPress: () => navigate('GuupNotifications'),
    // },
    // {
    //   icon: 'claps',
    //   text: 'A minha atividade',
    //   onPress: () => navigate('GuupNotifications'),
    // },
    // {
    //   icon: 'heart',
    //   text: 'Logros',
    //   onPress: () => Alert.alert('Achievements', 'Show achievements'),
    // },
    // {
    //   icon: 'bell',
    //   text: 'Notificações',
    //   onPress: () => navigate('GuupNotifications'),
    // },
    {
      icon: 'alert',
      text: 'Ajustes de privacidade',
      onPress: () => navigate('GuupSettings'),
    },
    {
      icon: 'box',
      text: 'Sair do guup',
      onPress: () =>
        Alert.alert('Logout', 'Sair do guup', [
          {
            text: 'Sim',
            style: 'destructive',
            onPress: () => console.log('Logout'),
          },
          {
            text: 'Não',
          },
        ]),
    },
  ];
  if (R.isEmpty(user)) {
    return (
      <Container safe center>
        <Text>Aconteceu um problema</Text>
        <Link onPress={() => goBack()}>Voltar</Link>
      </Container>
    );
  }
  return (
    <Container safe light>
      <AccountContainer>
        <AccountHeader>
          <GuupHeader
            leftRenderIntem={<Icon source="guup" size="small" />}
            rightRenderIntem={
              <Link
                onPress={() => navigate('GuupUserProfile', {type: 'OWNER'})}>
                Editar perfil
              </Link>
            }
          />
          <Separator size="medium" />
          <AccountInformation>
            <AccountUserAvatar source={{uri: `${user?.photoURL}`}} />
            <AccountUserName>
              <Text preset="comment" bold>
                {user?.displayName || 'Adicione seu role'}
              </Text>
              <Text color="primary">{user?.profission}</Text>
            </AccountUserName>
          </AccountInformation>
          <Separator size="medium" />
          {/* <AccountUserDescription>
            <Separator size="medium" />
            <Text preset="comment">
              I am a Front End developer with industry experience building
              websites and web applications. I specialize in JavaScript and have
              professional experience working with C# and Angular.
            </Text>
          </AccountUserDescription> */}
        </AccountHeader>
        <AccountBody>
          <GuupMenuList menuItems={MENU_ACCOUNT} padding />
        </AccountBody>
        {/* <AccountFooter>
          <Button
            preset="solid"
            text="Sair do guup"
            onPress={() => Alert.alert('Logout', 'sair do guup')}
          />
        </AccountFooter> */}
      </AccountContainer>
    </Container>
  );
};

export default GuupAccount;
