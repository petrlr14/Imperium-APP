import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { tabNavigationItems } from '../../navigators/tabItems';
import colors from '../../utils/colors';
import { StyleSheet } from 'react-native';
import constants from '../../utils/constants';
import { NewRoutineScreen } from './routine/newRoutine';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { RoutineSelection } from './routine/routineSelection';
import { WorkoutManager } from './workout/workoutManager';

const Tab = createMaterialBottomTabNavigator();

function HomeTabScreen() {
  return (
    <Tab.Navigator
      initialRouteName={tabNavigationItems[0].name}
      inactiveColor={colors.yellow_patito}
      activeColor={colors.yellow}
      barStyle={style.bar}
      style={{ backgroundColor: colors.royal_blue }}
      shifting={true}>
      {tabNavigationItems.map((item) => {
        return <Tab.Screen key={item.name} {...item} />;
      })}
    </Tab.Navigator>
  );
}

const RootStack = createSharedElementStackNavigator();

const opacityTransition = {
  useNativeDriver: true,
  gestureDirection: 'horizontal', // we will swipe right if we want to close the screen;
  transitionSpec: {
    open: {
      animation: 'timing',
    },
    close: {
      animation: 'timing',
      config: {
        duration: 300,
      },
    },
  },
  cardStyleInterpolator: ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    }, // updates the opacity depending on the transition progress value of the current screen
  }),
};

const routes = [
  {
    name: constants.SCREENS.HOME.HOME_TAB,
    component: HomeTabScreen,
    sharedElements: () => {
      return [{ id: 'fab', animation: 'fade' }];
    },
  },
  {
    name: constants.SCREENS.ROUTINE.NEWROUTINE,
    component: NewRoutineScreen,
    sharedElements: () => {
      return ['fab'];
    },
  },
  {
    name: constants.SCREENS.WORKOUT_FLOW.ROUTINE_SELECTION,
    component: RoutineSelection,
  },
  {
    name: constants.SCREENS.WORKOUT_FLOW.ROUTINE_MANAGER,
    component: WorkoutManager,
  },
];

export function HomeScreen() {
  return (
    <RootStack.Navigator
      headerMode="none"
      screenOptions={({ route: { name } }) => {
        if (name === constants.SCREENS.ROUTINE.NEWROUTINE) {
          return { ...opacityTransition };
        }
      }}
      initialRouteName={constants.SCREENS.HOME.HOME_TAB}>
      {routes.map((item) => (
        <RootStack.Screen key={item.name} {...item} />
      ))}
    </RootStack.Navigator>
  );
}

const style = StyleSheet.create({
  bar: {
    backgroundColor: colors.royal_blue_light,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 10,
  },
});
