import React from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';

import Profile from './Profile';
import PersonalInfo from './PersonalInfo';
import ChangePassword from './ChangePassword';
import ChangePin from './ChangePin';
import AddPhoneNumber from './AddPhoneNumber';
import ManagePhoneNumber from './ManagePhoneNumber';

import {logout} from '../../store/user/actions';
import {ProfileStackParamList} from '../../utils/types';
import {RootState} from '../../store';

const ProfileStack = createStackNavigator<ProfileStackParamList>();

type Props = {
  navigation: StackNavigationProp<any, any>;
};

const ProfileScreen: React.FunctionComponent<Props> = (props) => {
  const {sessionIsValid} = useSelector((state: RootState) => state.system);
  const {token} = useSelector(
    (state: RootState) => state.session.user.credentials,
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (token === '' && !sessionIsValid) {
      dispatch(logout());
      props.navigation.reset({
        index: 0,
        routes: [
          {
            name: 'AuthScreen',
          },
        ],
      });
    }
  }, [token, sessionIsValid]);

  return (
    <ProfileStack.Navigator headerMode="none">
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="PersonalInfo" component={PersonalInfo} />
      <ProfileStack.Screen name="ChangePassword" component={ChangePassword} />
      <ProfileStack.Screen name="ChangePin" component={ChangePin} />
      <ProfileStack.Screen name="AddPhoneNumber" component={AddPhoneNumber} />
      <ProfileStack.Screen
        name="ManagePhoneNumber"
        component={ManagePhoneNumber}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileScreen;
