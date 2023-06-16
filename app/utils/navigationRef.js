import { CommonActions } from '@react-navigation/native';

let navigator;

export const setNavigator = nav => {
  navigator = nav;
};

export const goBack = () => {
  navigator.dispatch(CommonActions.goBack());
};

export const navigate = (routeName, params) => {
  navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params: params,
    }),
  );
};

export const navReset = (routeName, params) => {
  navigator.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: routeName }],
    }),
  );
};