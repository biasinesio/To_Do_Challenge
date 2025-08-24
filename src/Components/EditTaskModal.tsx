// Em src/components/EditTaskModal.tsx

import React, { useState, useEffect, useRef } from "react";
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
import { Task } from '../services/TaskService';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (task: Task, newTitle: string) => void;
  task: Task | null; 
};

export default function EditTaskModal({ visible, onClose, onSave, task }: Props) {
  const [title, setTitle] = useState("");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
    
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [task, visible]);

  const handleSave = () => {
    
    if (task && title.trim()) {
      onSave(task, title);
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
          <Text style={styles.modalText}>Editar tarefa</Text>
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonCancel]}
              onPress={onClose}
            >
              <Text style={styles.textStyleCancel}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonSave]}
              onPress={handleSave}
            >
              <Text style={styles.textStyleSave}>Salvar</Text>
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
    backgroundColor: "rgba(0,0,0,0.4)" 
  },

  modalView: { 
    backgroundColor: "white", 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    padding: 35, 
    alignItems: "center", 
    elevation: 5 
  },

  modalText: { 
    marginBottom: 30, 
    textAlign: "center", 
    fontSize: 18, 
    fontWeight: "bold" 
  },

  input: { 
    height: 50, 
    borderColor: "#ddd", 
    borderWidth: 1, 
    borderRadius: 32, 
    width: "100%", 
    marginBottom: 20, 
    paddingHorizontal: 10, 
    fontSize: 16 
  },

  buttonContainer: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    width: "100%" 
  },

  button: { 
    borderRadius: 32, 
    padding: 10,  
    flex: 1, 
    marginHorizontal: 5, 
    height: 50, 
    justifyContent: "center"
  },

  buttonCancel: { 
    backgroundColor: "#F2F2F2" 
  },

  buttonSave: { 
    backgroundColor: "#00C853" 
  },

  textStyleCancel: { 
    color: "#333",
    fontWeight: "bold", 
    textAlign: "center" 
  },

  textStyleSave: { 
    color: "white", 
    fontWeight: "bold", 
    textAlign: "center" 
  },
  
});