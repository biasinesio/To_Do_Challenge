import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";


type Props = {
  visible: boolean;
  onClose: () => void;
  onEdit: () => void;
  onToggleDone: () => void;
  onDelete: () => void;
  positionY: number;
};

export default function ActionMenu({
  visible,
  onClose,
  onEdit,
  onToggleDone,
  onDelete,
  positionY,
}: Props) {
  if (!visible) return null;


  return (
    <TouchableOpacity
      style={styles.backdrop}
      onPress={onClose}
      activeOpacity={1} 
    >
      
      <View
        style={[
          styles.menu,
          { top: positionY - 20 } 
        ]}
      >
        <TouchableOpacity style={styles.menuItem} onPress={onEdit}>
          <Ionicons name="pencil-outline" size={18} color="#888" />
          <Text style={styles.menuText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={onToggleDone}>
          <Ionicons name="checkmark-circle" size={18} color="#00C853" />
          <Text style={[styles.menuText, { color: "#00C853" }]}>Concluir</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={onDelete}>
          <Ionicons name="trash-outline" size={18} color="#FF5252" />
          <Text style={[styles.menuText, { color: "#FF5252" }]}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    
  },
  menu: {
    position: 'absolute', 
    right: 40,            
    width: 160,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  menuText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
  },
});