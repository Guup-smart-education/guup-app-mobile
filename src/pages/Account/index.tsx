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
  const {navigate} = useNavigation<AppScreenNavigationProp>();
  const {user} = useContext(AuthContext);
  const MENU_ACCOUNT: Array<IMenuItemProps> = [
    {
      text: 'Minhas colleções',
      onPress: () => navigate('GuupCollections'),
    },
    {
      text: 'Minhas publicações',
      onPress: () => navigate('GuupPosts'),
    },
    {
      text: 'Notificações',
      onPress: () => navigate('GuupNotifications'),
    },
    {
      text: 'Configurações de privacidade',
      onPress: () => navigate('GuupSettings'),
    },
  ];
  return (
    <Container safe light>
      <AccountContainer>
        <AccountHeader>
          <GuupHeader
            leftRenderIntem={<Icon source="guup" size="small" />}
            rightRenderIntem={
              <Link
                color="primary"
                onPress={() => Alert.alert('Logout', 'sair do guup')}>
                Sair do guup
              </Link>
            }
          />
          <Separator size="medium" />
          <AccountInformation>
            <AccountUserAvatar source={{uri: `${user?.photoURL}`}} />
            <AccountUserName>
              <Text preset="chat">{user?.displayName}</Text>
              <Text preset="comment" color="primary">
                {user?.profission}
              </Text>
            </AccountUserName>
          </AccountInformation>
          <AccountUserDescription>
            <Separator size="medium" />
            <Text preset="comment">
              I am a Front End developer with industry experience building
              websites and web applications. I specialize in JavaScript and have
              professional experience working with C# and Angular.
            </Text>
          </AccountUserDescription>
        </AccountHeader>
        <AccountBody>
          <GuupMenuList menuItems={MENU_ACCOUNT} />
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
