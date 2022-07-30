import React from "react";
import { useCtrl, useSelector, useActions } from "@liya/core";
import { withHomeView, HomeController, HomeActions, HomeState } from "@liya/controller";
import { Text, TouchableOpacity, View } from "react-native";

function HomeView() {
  const ctrl = useCtrl<HomeController>();
  const { value } = useSelector<HomeState, {
    value: number;
  }>((state) => ({
    value: state.value
  }));
  const { add, sub  } = useActions<HomeActions>();
  return (
    <View>
      <TouchableOpacity onPress={ctrl.handleJumpPage}>
        <Text>jump</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={add}>
        <Text>+</Text>
      </TouchableOpacity>
      <Text>{value}</Text>
      <TouchableOpacity onPress={sub}>
        <Text>-</Text>
      </TouchableOpacity>
    </View>
  );
}

export default withHomeView(HomeView);