import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themas.colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 25,
    },

    boxTop: {
        marginBottom: 65,
    },

    text: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#2E3A59',
    },

    boxMid: {
        width: '100%',
        marginBottom: 30,
    },

    input: {
        width: '100%',
        height: 56,
        fontSize: 15,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 25,
        paddingHorizontal: 25,
        marginTop: 15,
        backgroundColor: '#fff',
    },

    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: '100%',
        height: 56,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 32,
        paddingHorizontal: 5,
        marginTop: 15,
        backgroundColor: '#fff',
        justifyContent: "space-between"
    },

    inputPassword: {
        flex: 1,
        fontSize: 15,
    },

    forgotText: {
        color: '#2E3A59',
        fontSize: 15,
        marginRight: 5,
    },

    loginButton: {
        width: '100%',
        height: 56,
        backgroundColor: '#20C67A',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },

    loginText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },

    boxBottom: {
        flexDirection: 'row',
        marginTop: 70,
        
    },

    footerText: {
        color: '#2E3A59',
        fontSize: 15,
    },

    registerText: {
        color: '#20C67A',
        fontSize: 15,
        fontWeight: 'bold',
    },
});