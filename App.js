import { StatusBar } from "expo-status-bar";
import { Alert, Button, StyleSheet, Text, TextInput, View, Keyboard } from "react-native";
import { useState } from "react";
// using db reference
import { db } from "./Core/Config";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export default function App() {
  // Staring user data
  const [userDoc, setUserDoc] = useState(null);
  const [userName, setUserName] = useState("");
  const [userBio, setUserBio] = useState("");

  // MARK: CRUD functions
  const Create = () => {
    // MARK: Creating New Doc in firestore
    // Before that enable firebase in firebase console
    const myDoc = doc(db, "MyCollection", "MyDocument");

    const DocData = {
      name: "Breno",
      bio: "Coder",
    };

    setDoc(myDoc, DocData)
      // Handling Promises
      .then(() => {
        // MARK: Success
        alert("Document Created!");
      })
      .catch((error) => {
        // MARK: failure
        alert("Error creating document: ", error.message);
      });
  };

  const Read = () => {
    // MARK: Reading Doc
    // You can read what ever document by changing the collection and document path here
    const myDoc = doc(db, "MyCollection", "MyDocument");
    getDoc(myDoc)
      // Handling Promises
      .then((snapshot) => {
        // MARK: Success
        if (snapshot.exists) {
          let data = snapshot.data();
          setUserDoc(data);
        }
      })
      .catch((error) => {
        // MARK: failure
        console.log("Error creating document: " + error.message);
        alert("Error creating document: " + error.message);
      });
  };

  // const Update = () => {
  //   // MARK: Updating Doc
  //   const myDoc = doc(db, 'MyCollection', 'MyDocument');
  //   updateDoc(myDoc, {
  //     name: {us},
  //     bio: 'Coder!'
  //   }).then(()=>{
  //     alert("Updated!");
  //     Read()
  //   });

  //   // Can do it by both ways

  //   // setDoc(
  //   //   myDoc,
  //   //   {
  //   //     ...userDoc,
  //   //     name : "New UserName",
  //   //     bio: 'New bio'
  //   //   },
  //   //   {merge: true}
  //   // )
  //   // .then(()=>{
  //   //   alert("Data updated");
  //   //   console.log("Data updated");
  //   //   Read();
  //   // })
  //   // .catch((e)=> {
  //   //   console.log("Failed to update the data ", e);
  //   //   alert("Failed to update the data ");
  //   // })

  // };

  const Update = () => {
    // MARK: Updating the document
    const myDoc = doc(db, "MyCollection", "MyDocument");
    updateDoc(myDoc, {
      name: userName, // Corrected here
      bio: userBio, // And here
    })
      .then(() => {
        alert("Updated!");
        Read();
      })
      .catch((error) => {
        // MARK: failure
        alert("Error updating document: " + error.message);
      });
      Keyboard.dismiss();
  };

  const Delete = () => {
    const myDoc = doc(db, "MyCollection", "MyDocument");
    deleteDoc(myDoc)
      .then(() => {
        alert("Deleted Document!");
        setUserName("");
        setUserBio("");
        Read();
      })
      .catch((error) => {
        // MARK: failure
        alert("Error updating document: " + error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button title="Create New Doc" onPress={Create}></Button>
      </View>
      <View style={styles.buttons}>
        <Button title="Read Doc" onPress={Read}></Button>
      </View>
      {userDoc != null && (
        <View>
          <Text>Name: {userDoc.name}.</Text>
          <Text>Bio: {userDoc.bio}.</Text>
          <TextInput
            placeholder="Set a new username"
            autoCapitalize="none"
            onChangeText={setUserName}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Set a new userBio"
            autoCapitalize="none"
            onChangeText={setUserBio}
            style={styles.textInput}
          />
          <View style={styles.buttons}>
            <Button title="Update Doc" onPress={Update} />
          </View>
          <View style={styles.buttons}>
            <Button title="Delete Doc" onPress={Delete} />
          </View>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    height: 40,
    width: "100%",
    marginVertical: 15,
    borderColor: "black",
    borderWidth: 2,
    paddingLeft: 10,
  },
  buttons: {
    margin: 10,
  },
});
