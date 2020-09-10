import React from 'react';
import {View} from 'react-native';
import {Separator} from './../../../ui';
import {Gain} from './../../../components';
import {CourseTabContent} from './../_styled';
import {GainProps} from './../../../@types/gain.content';
import {GetUniqueId} from './../../../helper';

const GAINS: Array<GainProps> = [
  {
    gainIcon: 'wifi',
    gainTitle: 'Online/Offiline',
    gainDescription:
      'Curso 100% online com posibilidade de estudar em modo offline',
  },
  {
    gainIcon: 'project',
    gainTitle: 'Projetos',
    gainDescription:
      'Projetos reais para competir com os outros e ganhar recompensas',
  },
  {
    gainIcon: 'group',
    gainTitle: 'Comunidades',
    gainDescription: 'Comunidade ativa para solucionar duvidas e problemas',
  },
];

export default () => {
  return (
    <CourseTabContent>
      {GAINS.map((gain) => (
        <View key={GetUniqueId()}>
          <Gain {...gain} />
          <Separator size="large" />
        </View>
      ))}
    </CourseTabContent>
  );
};
