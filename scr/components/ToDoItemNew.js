import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default'
  },
  () => {},
  (error) => {
    console.log('Error Database', error);
  }
);
function ToDoItemNew() {
  const [nameItem, setNameItem] = useState('');
  const [nameItemArray, setNameItemArray] = useState([]);
  const [showBox, setShowBox] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  //refresh data
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setNameItem('');
      setNameItemArray('');
      getData();
    }, 2000);
  }, []);

  useEffect(() => {
    createTable();
    getData();
  }, []);
  const showConfirmDialog = () => {
    return Alert.alert('Are your sure?', 'Are you sure with your action?', [
      // The "Yes" button
      {
        text: 'Yes',
        onPress: () => {
          setShowBox(false);
          setNameItem('');
          getData();
          setNameItemArray('');
        }
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: 'No'
      }
    ]);
  };
  const showConfirmDialogDelete = () => {
    return Alert.alert('Are your sure?', 'Are you sure with your action?', [
      // The "Yes" button
      {
        text: 'Yes',
        onPress: () => {
          setShowBox(false);
          setNameItem('');
          setNameItemArray('');
        }
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: 'No'
      }
    ]);
  };
  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'ToDoItems' +
          '(ID INTEGER PRIMARY KEY AUTOINCREMENT, NameItem TEXT);'
      );
    });
  };
  const getData = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql('SELECT NameItem FROM ToDoItems', [], (tx, results) => {
          // var len = results.rows.length;
          console.log('Size ', results);
          var length = results.rows.length;
          for (var i = 0; i < length; i++) {
            console.log('dddddddd', results.rows.item(i));
            setNameItemArray((current) => [...current, results.rows.item(i)]);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  const setData = async () => {
    console.log('SetData length ', nameItem.length);
    if (nameItem.length == 0) {
      Alert.alert('Warning!', 'Please write your data.');
    } else {
      try {
        showConfirmDialog();
        await db.transaction(async (tx) => {
          await tx.executeSql('INSERT INTO ToDoItems (NameItem) VALUES (?)', [
            nameItem
          ]);
        });
      } catch (error) {
        console.log('error', error);
      }
    }
  };
  const removeData = async () => {
    try {
      // await AsyncStorage.clear();
      db.transaction((tx) => {
        showConfirmDialogDelete();
        tx.executeSql(
          'DELETE FROM ToDoItems',
          [],
          () => {},
          (error) => {
            console.log(error);
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  };
  // console.log('Daaaa ', nameItem);
  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  return (
    <View style={{padding: 5}}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {showBox && <View style={styles.box}></View>}
        <TextInput
          style={{height: 40, margin: 12, borderWidth: 1, padding: 10}}
          placeholder="Enter item name"
          onChangeText={(value) => setNameItem(value)}
          value={nameItem}
        />
        <View style={{flexDirection: 'row'}}>
          <View style={{padding: 5}}>
            <Button title="Add" color="blue" onPress={setData} />
          </View>
          <View style={{padding: 5}}>
            <Button title="Clear" color="red" onPress={removeData} />
          </View>
        </View>
        <FlatList
          data={nameItemArray}
          renderItem={({item}) => <Item title={item.NameItem} />}
          keyExtractor={(item, index) => index}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32
  }
});
export default ToDoItemNew;
