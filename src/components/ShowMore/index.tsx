import React, {useState, useEffect} from 'react';
import Text, {IProps} from './../../ui/Text';
import {Link} from './../../ui';

interface IShowmore extends IProps {
  readonly maxLength?: number;
  readonly text: string;
}

const ShowMore: React.FC<IShowmore> = ({maxLength = 260, text, ...args}) => {
  const [shortText, setShortText] = useState<string>(
    text.substring(0, maxLength),
  );
  const [showMore, setShowMore] = useState<boolean>(false);
  useEffect(() => {
    setShortText(!showMore ? text.substring(0, maxLength) : text);
  }, [showMore, setShortText, text, maxLength]);
  return (
    <Text {...args}>
      {shortText}{' '}
      {text.length > maxLength ? (
        <Link color="primary" onPress={() => setShowMore(!showMore)}>
          {!showMore ? 'Ver mais' : 'Ver menos'}
        </Link>
      ) : undefined}{' '}
    </Text>
  );
};

export default ShowMore;
