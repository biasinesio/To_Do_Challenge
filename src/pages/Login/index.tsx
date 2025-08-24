import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Alert } from "react-native";
import { style } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as AuthService from "../../services/AuthService";
import StyledText from "../../Components/StyledText";

import type { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

export default function Login() {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Erro", "Por favor, preencha o e-mail e a senha.");
      return;
    }

    const user = await AuthService.login(email, password);

    if (user) {
      navigation.navigate("Home", { user: user });
    } else {
      Alert.alert(
        "Erro de Login",
        "E-mail ou senha inválidos. Por favor, tente novamente."
      );
    }
  }

  return (
    <View style={style.container}>
      <View
        style={{
          alignItems: "center",
          height: "90%",
          justifyContent: "center",
        }}
      >
        <View style={style.boxTop}>
          <StyledText style={style.text} fontWeight="bold">Bem-vindo(a)!</StyledText>
        </View>

        <View style={style.boxMid}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#A9A9A9"
            style={style.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
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
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <Ionicons
                name={passwordVisible ? "eye-outline" : "eye-off-outline"}
                size={22}
                color="#A9A9A9"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={{ alignSelf: "flex-end", marginTop: 8 }}>
            <StyledText style={style.forgotText}>Esqueceu sua senha?</StyledText>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={style.loginButton} onPress={handleLogin}>
          <StyledText style={style.loginText} fontWeight="bold">Login</StyledText>
        </TouchableOpacity>
      </View>

      <View style={style.boxBottom}>
        <StyledText style={style.footerText}>Não tem uma conta?</StyledText>
        {/* CORREÇÃO: Removido o "as never" desnecessário */}
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <StyledText style={style.registerText} fontWeight="bold"> Cadastre-se</StyledText>
        </TouchableOpacity>
      </View>
    </View>
  );
}