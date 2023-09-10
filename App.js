import React,{useRef,useState} from 'react';
import {StyleSheet, TextInput,Text, Button,Alert, View, Image,TouchableOpacity, Pressable} from 'react-native';
import {ValidateLuhnAlgorithm} from 'valid-credit-card-lib'
const App = () => {
  const [firstInput, setFirstInput] = useState('');
  const [secondInput, setSecondInput] = useState('');
  const [thirdInput, setThirdInput] = useState('');
  const [fourthInput, setFourthInput] = useState('');
  const [ccNumber, setccNumber] = useState('');
  const [resultText, setResultText] = useState('');
  const [showResult, setshowResult] = useState(false);
  const input1 = useRef(null);
  const input2 = useRef(null);
  const input3 = useRef(null);
  const input4 = useRef(null);



  const controlCardNumber = (Text) => {
  if(Text.length < 16){
    setResultText('Invalid Credit/Debit Card Number. Card Number Must have 16 number')
  }
  else if(ValidateLuhnAlgorithm(Text)){
    setResultText('Valid Credit/Debit Card')
  }else{
    setResultText('Invalid Credit/Debit Card')
  }  
  setshowResult(true)
  };

  const setImage =(Text) => {
    if(Text == 'Valid'){
      return( 
        <Image source={require('../CreditCardValidator/img/valid.png')} style ={{width:32,height:32}} ></Image>
        );
    }else {
      return( 
        <Image source={require('../CreditCardValidator/img/invalid.png')} style ={{width:32,height:32}} ></Image>
        );
    }
  }
    const setBigImage =(Text) => {
      if(Text == 'Valid'){
        return( 
          <Image source={require('../CreditCardValidator/img/validbig.png')} style ={{width:50,height:50}} ></Image>
          );
      }else {
        return( 
          <Image source={require('../CreditCardValidator/img/invalidbig.png')} style ={{width:50,height:50}} ></Image>
          );
      }
    
  }
  const setFirst = (Text) => {
    setFirstInput(Text);
    setccNumber(Text+' '+secondInput+' '+thirdInput+' '+fourthInput);
    if(String(Text).length == 4){
    input2.current.focus();
    }
  };
  const setSecond = (Text) => {
    setSecondInput(Text);
    setccNumber(firstInput+' '+Text+' '+thirdInput+' '+fourthInput);
    if(String(Text).length == 4){
      input3.current.focus();
    }else  if(String(Text).length == 0){
      input1.current.focus();
    }
  };
  const setThird = (Text) => {
    setThirdInput(Text);
    setccNumber(firstInput+' '+secondInput+' '+Text+' '+fourthInput);
    if(String(Text).length == 4){
      input4.current.focus();
    }
    else  if(String(Text).length == 0){
      input2.current.focus();
    }
  };
  const setFourth = (Text) => {
    setFourthInput(Text);
    setccNumber(firstInput+' '+secondInput+' '+thirdInput+' '+Text);
    if(String(Text).length == 0){
      input3.current.focus();
    }
  };

  return (
<View style = {styles.View}>
   
    <Text style = {styles.HeaderView}>
      Credit/Debit Card Validator</Text>

    <View style = {styles.CardImageView}>
      <View style={{flex:1}}>      
        <Image source={require("../CreditCardValidator/img/card.png")} resizeMode='cover' style={{width:'100%',height:'250%'}}  ></Image>
      </View>
      <View style={{flex:0.6, flexDirection:'row'}}>
        <View style={{flex:1}}>        
        </View>
        <View style={{flex:1}}>
        </View>    
        <View style={{flex:1.1}}>
          {showResult &&
          <View style={{position:"absolute"}}>
          {setBigImage(resultText.includes('Invalid')?'Invalid':'Valid')}
          </View>}
        </View> 
      </View>    
      <View style={{flex:0.9,  flexDirection:'row'}}>
        <View style={{flex:1}}>        
        </View>
        <View style={{flex:2.2}}>
        <Text style={{position:"absolute", fontWeight:'bold'}}>{ccNumber}</Text>
        </View>    
        <View style={{flex:1}}>
        </View>       
      </View>
    </View>  

    <View style = {styles.CcView}>
      <TextInput
        style={styles.TextInput}
        maxLength = {4}
        keyboardType="numeric"
        ref={input1}
        autoFocus = {true}
        onChangeText={ (text) =>{
        setFirst(text)
        }}      />
      <TextInput
        style={styles.TextInput}
        maxLength = {4}
        keyboardType="numeric"
        ref={input2}
        onChangeText={ (text) =>{
        setSecond(text)
        }}      />
      <TextInput
        style={styles.TextInput}
        maxLength = {4}
        keyboardType="numeric"
        ref={input3}
        onChangeText={ (text) =>{
          setThird(text)
        }}      />
      <TextInput
        style={styles.TextInput}
        maxLength = {4}
        keyboardType="numeric"
        ref={input4}
        onChangeText={ (text) =>{
        setFourth(text)
        }}      />
    </View> 
    
    <View style={styles.ButtonView}>
      <Pressable style={styles.Button}
              onPress={() => controlCardNumber(firstInput+secondInput+thirdInput+fourthInput)}>
        <Text style={styles.Text}>Card Number Is Valid ?</Text>
      </Pressable>   
    </View>

    <View style={styles.ResultMessageView}>
    {showResult &&
    <View style={styles.ResultMessageView}>
      {setImage(resultText.includes('Invalid')?'Invalid':'Valid')}
      <Text style={{fontWeight:'bold', fontSize : 18, marginLeft:15, textAlign:'center',}}>{resultText}</Text>
    </View>
    }
      </View>

</View>
 

  );
                    };
const styles = StyleSheet.create({
  View:{
    backgroundColor:'lightblue',
    flex:1,
    flexDirection:"column",
  },
  TextInput: {
    fontSize: 15,
    width :'20%',
    height : '40%',
    borderColor:"black",
    borderWidth:1,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius:10
  },
  HeaderView:{
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
    paddingTop: 10,
    textAlign:'center',
    flex:0.5,
  },
  CardImageView:{
    flex:4, 
    justifyContent:'center',
  },
  CcView:{
    alignItems:'flex-end',
    justifyContent : 'space-evenly',
    flexDirection:'row',
    flex:2,
  }, 
  ButtonView:{
    flex:1.5,
    justifyContent:'center',
  },
  ResultMessageView:{
    flexDirection:'row', 
    justifyContent:'center',
    flex:7,
  },
  Button: {
    width:'75%',
    height:'65%',
    fontSize: 100,
    justifyContent:'center',
    backgroundColor: 'rgb(56, 151, 241)',
    borderRadius: 5,
    borderColor:'black',
    borderWidth:1.2,
    alignSelf:'center',
  },
  Text:{
    fontWeight:'bold',
    letterSpacing: 0.25,
    color:'white',
    textAlign:'center'
  },
});

export default App;