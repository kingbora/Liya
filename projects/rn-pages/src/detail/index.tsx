import React from 'react';
import { withDetailView, DetailController, DetailActions, DetailState } from '@liya/controller';
import { useCtrl, useActions, useSelector} from "@liya/core";
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

function DetailView() {
  const ctrl = useCtrl<DetailController>();
  const { count, name } = useSelector<DetailState, {
    count: number;
    name: string;
  }>((state) => ({
    count: state.count,
    name: state.name,
  }));
  const actions = useActions<DetailActions>();

  console.log("yeah!, i'am rendered!");

  return (
    <View>
      <TouchableOpacity onPress={ctrl.handleDoSomething}>
        <Text>do something</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={actions.decrement}>
        <Text>todo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={ctrl.handleDoSamething}>
        <Text>do samething</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={ctrl.pop}>
        <Text>back</Text>
      </TouchableOpacity>
      <TextInput value={name} onChangeText={text => {
        actions.changeName(text);
      }} />
      <Text>{count}</Text>
    </View>
  );
}

export default withDetailView(DetailView);
