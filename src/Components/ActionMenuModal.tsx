// components/ActionMenu.tsx

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  visible: boolean;
  onClose: () => void;
  onEdit: () => void;
  onToggleDone: () => void;
  onDelete: () => void;
};

export default function ActionMenu({
  visible,
  onClose,
  onEdit,
  onToggleDone,
  onDelete,
}: Props) {
  if (!visible) return null;

  return (
    <View style={styles.menuOverlay}>
      <View style={styles.menu}>
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

      <TouchableOpacity style={styles.backdrop} onPress={onClose} />
    </View>
  );
}

const styles = StyleSheet.create({
  menuOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  menu: {
    width: 160,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    zIndex: 11,
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
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
  },
});
