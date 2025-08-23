import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Alert } from "react-native";
import { style } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as AuthService from "../../services/AuthService";
import StyledText from "../../Components/StyledText";

const PasswordRequirement = ({ met, text }: { met: boolean; text: string }) => (
  <View style={style.requirementContainer}>
    <Ionicons
      name={met ? "checkmark-circle" : "close-circle-outline"}
      size={20}
      color={met ? "#20C67A" : "#FF5252"}
    />
    <StyledText
      style={[style.requirementText, { color: met ? "#20C67A" : "#FF5252" }]}
    >
      {text}
    </StyledText>
  </View>
);

export default function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const [hasMinLength, setHasMinLength] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const minLength = password.length >= 6;
    const number = /\d/.test(password);

    setHasMinLength(minLength);
    setHasNumber(number);
    setIsFormValid(
      minLength &&
        number &&
        name.trim() !== "" &&
        email.trim() !== "" &&
        age.trim() !== ""
    );
  }, [password, name, email, age]);

  const handleRegister = async () => {
    if (!isFormValid) {
      Alert.alert(
        "Erro",
        "Por favor, preencha todos os campos e cumpra os requisitos da senha."
      );
      return;
    }

    const result = await AuthService.register({ name, email, age, password });

    if ("error" in result) {
      Alert.alert("Erro de Cadastro", result.error);
    } else {
      Alert.alert(
        "Sucesso!",
        "Sua conta foi criada. Por favor, faça o login.",
        [{ text: "OK", onPress: () => navigation.navigate("Login" as never) }]
      );
    }
  };

  const handleAgeChange = (text: string) => {
    setAge(text.replace(/[^0-9]/g, ""));
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
            value={age}
            onChangeText={handleAgeChange}
            keyboardType="numeric"
            maxLength={2}
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

          <View style={style.requirements}>
            <PasswordRequirement
              met={hasMinLength}
              text="Pelo menos 6 caracteres"
            />
            <PasswordRequirement met={hasNumber} text="Pelo menos um número" />
          </View>

          <TouchableOpacity
            style={[style.registerButton, !isFormValid && style.disabledButton]}
            onPress={handleRegister}
            disabled={!isFormValid}
          >
            <StyledText style={style.registerButtonText} fontWeight="bold">
              Sign Up
            </StyledText>
          </TouchableOpacity>
        </View>

        <View style={style.boxBottom}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login" as never)}
          >
            <StyledText style={style.loginText}>Voltar para login</StyledText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
