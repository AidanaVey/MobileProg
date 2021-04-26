import React, { useState } from 'react';
import { Alert, StyleSheet, Text, Button, View, TextInput, ScrollView, TouchableOpacity, Keyboard } from 'react-native';

import CustomButton from './components/Button';

export const todoItems = []


export default function App() {
  const [getText, setText] = useState('');
  const [getList, setList] = useState(todoItems);
  const [editingItem, setEditingItem] = useState(0);

  const addItem = () => {
    console.log(getText);
    setList([
      ...getList,
      { key: Math.random().toString(), data: getText }
    ]);
    setText('');
    Keyboard.dismiss();
  }

  const removeItem = (itemKey) => {
    Alert.alert(
      `Delete "${getList.find(item => item.key == itemKey).data}" ?`,
      "",
      [
        {
          text: "No",
          onPress: () => { }
        },
        {
          text: "Yes",
          onPress: () => setList(list => getList.filter(item => item.key != itemKey))
        }
      ]
    );
  }

  const editItem = (item) => {
    setText(item.data);
    setEditingItem(item.key);
  }

  const updateItem = () => {
    setList(list => getList.map(item =>
      item.key === editingItem ?
        { key: item.key, data: getText } :
        item
    ));
    setText('');
    setEditingItem(0);
  }

  const scrollView = (
    <ScrollView style={styles.scrollview}>
      {getList.map((item, index) =>
        <TouchableOpacity
          key={item.key}
          activeOpacity={0.7}
          onPress={() => editItem(item)}
        >
          <View style={styles.scrollviewItem}>
            <Text style={styles.scrollviewText}>{index + 1}# {item.data}</Text>
            <TouchableOpacity
              onPress={() => removeItem(item.key)}
            >
              <View style={styles.crosstextcontainer}>
                <Text style={styles.crosstext}>X</Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </ScrollView>
  );

  const emptyScrollView = (
    <View style={{ paddingTop: 30 }}>
      <Text style={{ fontStyle: "italic", fontSize: 20, color: 'grey' }}>No plans for today!</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What are your plan today?</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Add a task..."
          onChangeText={text => setText(text)}
          value={getText}
        />

        <CustomButton
          text={editingItem === 0 ? "ADD" : "UPDATE"}
          textSize={16}
          textColor="white"
          onPressEvent={editingItem === 0 ? addItem : updateItem}
          disabled={getText.length <= 0}
        />


        {/* <Button
          title="Add"
          onPress={addItem}
          disabled={getText.length <= 0}
        /> */}

      </View>
      {getList.length <= 0 ? emptyScrollView : scrollView}
    </View>
  );
}

const styles = StyleSheet.create({
  crosstextcontainer: {
    backgroundColor: '#dce0cd',
    borderRadius: 50,
    padding: 5,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  crosstext: {
    fontSize: 16,
    color: '#67a030',
    fontWeight: "bold"
  },
  scrollviewText: {
    fontSize: 26,
    color: 'white'
  },
  scrollview: {
    paddingTop: 20,
    width: '100%'
  },
  scrollviewItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: '#7de8ea',
    alignSelf: "center",
    padding: 10,
    margin: 5,
    width: '90%',
    borderRadius: 10
  },
  title: {
    fontSize: 64,
    color: '#003700'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40
  },
  inputContainer: {
    flexDirection: "row",
    width: '70%',
    justifyContent: "space-between",
    alignItems: "center"
  },
  textInput: {
    borderColor: '#67a030',
    //borderWidth: 2,
    borderBottomWidth: 2,
    width: '70%',
    // borderRadius: 50,
    fontSize: 16,
    padding: 10
  }
});