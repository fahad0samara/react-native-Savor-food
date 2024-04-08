import { StyleSheet } from 'react-native';


export  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      backgroundColor: '#8A2BE2',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#fff', 
    },
    input: {
      width: '100%',
      height: 50,
      marginBottom: 20,
      paddingHorizontal: 15,
      borderWidth: 1,
      borderColor: '#fff', 
      borderRadius: 5,
      backgroundColor: '#fff', 
    },
    errorText: {
      color: 'red',
      marginBottom: 10,
    },
    loginText: {
      marginTop: 10,
      color: '#fff', 
      textDecorationLine: 'underline',
    },
  });