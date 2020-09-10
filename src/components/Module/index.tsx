import React from 'react';
import {
  ModuleContainer,
  ModulePicure,
  ModuleContent,
  ModuleData,
  ModuleContentProgress,
  ModuleProgressItem,
  ModuleProgressData,
} from './_styled';
import {Text, Separator, Icon} from './../../ui';
import {ICourseModule} from './../../@types/course.cover';

interface IProps extends ICourseModule {
  readonly showProgress?: boolean;
};

export default ({
  showProgress = false,
  moduleName,
  moduleDescription,
  moduleProgress,
  moduleProjects,
  moduleContents,
  moduleHours,
}: IProps) => (
  <ModuleContainer>
    <ModuleContent>
      <ModulePicure />
      <ModuleData>
        <Text bold>{moduleName || 'Title'}</Text>
        <Separator size="lili" />
        <Text preset="comment">{moduleDescription || 'Some description'}</Text>
      </ModuleData>
    </ModuleContent>
    {showProgress && (
      <>
        <Separator size="small" />
        <ModuleContentProgress>
          <ModuleProgressItem>
            <Text preset="paragraph" bold color="secondary">{`${
              moduleProgress || 0
            }%`}</Text>
          </ModuleProgressItem>
          <ModuleProgressData>
            <Text preset="tall" color="secondary">
              Progresso do módulo
            </Text>
          </ModuleProgressData>
        </ModuleContentProgress>
        <ModuleContentProgress>
          <ModuleProgressItem>
            <Icon source="project" />
          </ModuleProgressItem>
          <ModuleProgressData>
            <Text preset="tall">{`${
              moduleProjects || 0
            } projetos finalizados`}</Text>
          </ModuleProgressData>
        </ModuleContentProgress>
        <ModuleContentProgress>
          <ModuleProgressItem>
            <Icon source="module" />
          </ModuleProgressItem>
          <ModuleProgressData>
            <Text preset="tall">{`${moduleContents || 0} conteudos`}</Text>
          </ModuleProgressData>
        </ModuleContentProgress>
        <ModuleContentProgress>
          <ModuleProgressItem>
            <Icon source="clock" />
          </ModuleProgressItem>
          <ModuleProgressData>
            <Text preset="tall">{`${moduleHours || 0} horas dedicadas`}</Text>
          </ModuleProgressData>
        </ModuleContentProgress>
      </>
    )}
  </ModuleContainer>
);
