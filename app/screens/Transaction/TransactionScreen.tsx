import React from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';

import TransactionHistory from './TransactionHistory';
import SearchReceiver from './SearchReceiver';
import Transfer from './Transfer';
import PinConfirmation from './PinConfirmation';
import TransactionInfo from './TransactionInfo';

import {logout} from '../../store/user/actions';
import {TransactionStackParamList} from '../../utils/types';
import {RootState} from '../../store';

const TransactionStack = createStackNavigator<TransactionStackParamList>();

type Props = {
  navigation: StackNavigationProp<any, any>;
};

const TransactionScreen: React.FunctionComponent<Props> = (props) => {
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
    <TransactionStack.Navigator headerMode="none">
      <TransactionStack.Screen
        name="TransactionHistory"
        component={TransactionHistory}
      />
      <TransactionStack.Screen
        name="SearchReceiver"
        component={SearchReceiver}
      />
      <TransactionStack.Screen name="Transfer" component={Transfer} />
      <TransactionStack.Screen
        name="PinConfirmation"
        component={PinConfirmation}
      />
      <TransactionStack.Screen
        name="TransactionInfo"
        component={TransactionInfo}
      />
    </TransactionStack.Navigator>
  );
};

export default TransactionScreen;
