import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { style } from "./styles"; 
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import StyledText from "../../Components/StyledText";

export default function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleRegister = () => {
    
    console.log("Cadastrando:", { name, email, password });
    
    navigation.navigate("Login" as never);
  };

  return (
    <View style={style.container}>
      <View style={style.formContainer}>
        <View style={style.boxTop}>
          <StyledText style={style.text}>Cadastre sua conta.</StyledText>
        </View>

        <View style={style.boxMid}>
         
          <TextInput
            placeholder="Nome"
            placeholderTextColor="#A9A9A9"
            style={style.input}
            value={name}
            onChangeText={setName}
          />
         
          <TextInput
            placeholder="Email"
            placeholderTextColor="#A9A9A9"
            style={style.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

             
          <TextInput
            placeholder="Idade"
            placeholderTextColor="#A9A9A9"
            style={style.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="numeric"
          />

          
          <View style={style.passwordContainer}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#A9A9A9"
              secureTextEntry={!passwordVisible}
              style={style.inputPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <Ionicons
                name={passwordVisible ? "eye-off-outline" : "eye-outline"}
                size={22}
                color="#A9A9A9"
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={style.registerButton} onPress={handleRegister}>
          <StyledText style={style.registerButtonText}>Sign Up</StyledText>
        </TouchableOpacity>
      </View>

      <View style={style.boxBottom}>
        <TouchableOpacity onPress={() => navigation.navigate("Login" as never)}>
          <StyledText style={style.loginText}>Voltar para login</StyledText>
        </TouchableOpacity>
      </View>
    </View>
  );
}