import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { style } from "./styles";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={style.container}>
    
      <View style={{ width: "100%", alignItems: "center" }}>
        <View style={style.boxTop}>
          <Text style={style.text}>Bem-vindo(a)!</Text>
        </View>

        <View style={style.boxMid}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#A9A9A9"
            style={style.input}
          />

          <View style={style.passwordContainer}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#A9A9A9"
              secureTextEntry={!passwordVisible}
              style={style.inputPassword}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <Ionicons
                name={passwordVisible ? "eye-off-outline" : "eye-outline"}
                size={22}
                color="#A9A9A9"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={{ alignSelf: "flex-end", marginTop: 8 }}>
            <Text style={style.forgotText}>Esqueceu sua senha?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={style.loginButton}>
          <Text style={style.loginText}>Login</Text>
        </TouchableOpacity>
      </View>

     
      <View style={style.boxBottom}>
        <Text style={style.footerText}>Não tem uma conta?</Text>
        <TouchableOpacity>
          <Text style={style.registerText}> Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
