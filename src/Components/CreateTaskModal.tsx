import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onCreate: (title: string) => void;
};

export default function CreateTaskModal({ visible, onClose, onCreate }: Props) {
  const [title, setTitle] = useState("");

  const handleCreate = () => {
    if (title.trim()) { 
      onCreate(title);
      setTitle(""); 
    }
  };

 return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Criar nova tarefa</Text>
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={title}
            onChangeText={setTitle}
            autoFocus={true}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonCancel]}
              onPress={onClose}
            >
              <Text style={styles.textStyleCancel}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonCreate]}
              onPress={handleCreate}
            >
              <Text style={styles.textStyleCreate}>Criar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
} 

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalView: {
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 32,
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    borderRadius: 32,
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
    height: 50,
    justifyContent: "center",
  },
  buttonCancel: {
    backgroundColor: "#F2F2F2",
  },
  buttonCreate: {
    backgroundColor: "#00C853",
  },
  textStyleCancel: {
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
  },
  textStyleCreate: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});