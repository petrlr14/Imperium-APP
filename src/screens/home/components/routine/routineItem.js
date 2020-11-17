import React from 'react';
import styled from 'styled-components/native';
import colors from '../../../../utils/colors';
import { Icon } from 'react-native-elements';
import TimeAgo from 'react-native-timeago';
import moment from 'moment';

const Card = styled.View`
  position: relative;
  width: 90%;
  height: 100px;
  background-color: ${colors.royal_blue_light};
  border-radius: 6px;
  margin: 10px 0px;
  align-self: center;
`;

const Text = styled.Text`
  color: ${colors.white};
  font-weight: 100;
  font-size: 36px;
  padding-left: 10px;
`;

const IconWrap = styled.View`
  width: 32px;
  height: 32px;
  position: absolute;
  top: -10px;
  right: 0px;
  z-index: 10;
`;

const TimeTextWrapper = styled.View`
  position: absolute;
  flex-direction: row;
  align-items: center;
  bottom: 4px;
  right: 8px;
`;

const Time = styled(TimeAgo)`
  color: ${colors.white}90;
`;

const TimeText = styled.Text`
  color: ${colors.white}90;
`;

export function RoutineItem({ item, onBookmarkPress, id: userID, history }) {
  const { createdAt, name, saved, id, creator } = item;
  return (
    <Card>
      {onBookmarkPress && (
        <IconWrap>
          <Icon
            name={saved ? 'bookmark' : 'bookmark-outline'}
            type="material-community"
            color={colors.yellow_patito}
            size={32}
            onPress={() => {
              onBookmarkPress(id);
            }}
          />
        </IconWrap>
      )}

      <Text numberOfLines={1}>{name}</Text>
      <TimeTextWrapper>
        <TimeText>
          {history
            ? 'Hecha '
            : `Creado por ${
                creator.id === userID
                  ? 'ti '
                  : `${creator.firstName} ${creator.lastName} `
              }`}
        </TimeText>
        <Time
          time={moment(
            moment(history ? history.createdAt : createdAt)
              .utc(true)
              .toISOString(),
          )
            .utc(false)
            .toISOString()}
        />
      </TimeTextWrapper>
    </Card>
  );
}
