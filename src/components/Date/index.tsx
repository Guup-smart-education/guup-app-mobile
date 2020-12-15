import React from 'react';
import {Text} from './../../ui';
import {formatDistanceToNow, parseISO} from 'date-fns';
import ptBrLocal from 'date-fns/locale/pt-BR';

interface IDate {
  readonly date: string;
}

export default ({date}: IDate) => {
  try {
    const parseDate = parseISO(date);
    const dateFormated = `${formatDistanceToNow(parseDate, {
      addSuffix: true,
      locale: ptBrLocal,
    })}`;
    return (
      <Text preset="date" color="darkGrey">
        {dateFormated || ''}
      </Text>
    );
  } catch (error) {
    return (
      <Text preset="date" color="darkGrey">
        Em algum momento
      </Text>
    );
  }
};
