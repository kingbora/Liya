import React from "react";
import { useCtrl, useSelector, useActions } from "@liya/core";
import { withHomeView, HomeController, HomeActions, HomeState } from "@liya/controller";
import { Text, TouchableOpacity, SafeAreaView } from "react-native";

function HomeView() {
  const ctrl = useCtrl<HomeController>();
  const { value } = useSelector<HomeState, {
    value: number;
  }>((state) => ({
    value: state.value
  }));
  const { add, sub  } = useActions<HomeActions>();
  return (
    <SafeAreaView>
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
    </SafeAreaView>
  );
}

export default withHomeView(HomeView);