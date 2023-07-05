import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
function Counter() {
  const [count, setCount] = useState(100);
  const [newCount, setNewCount] = useState(100);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`Count: ${count}`}</Text>
      <Text style={styles.title}>{`New Count: ${newCount}`}</Text>
      <Button
        color={'blue'}
        title={'Increase the count'}
        onPress={() => setCount(count + 1)}
      />
      <Button
        color={'red'}
        title={'Decrease the count'}
        onPress={() => setCount(count - 1)}
      />

      <Button
        color={'blue'}
        title={'Increase the count'}
        onPress={() => setNewCount(newCount + 1)}
      />
      <Button
        color={'red'}
        title={'Decrease the count'}
        onPress={() => setNewCount(newCount - 1)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
  },
  title: {
    alignSelf: 'center',
    fontSize: 25,
    marginTop: 25
  }
});
export default Counter;
