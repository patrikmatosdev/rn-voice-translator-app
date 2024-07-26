import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
interface Country {
  name: string;
  flag: string;
}

interface Flags {
  png: string,
  svg: string
};

const App = () => {
  const [countrys, setCountrys] = useState<Array<Country>>([]);
  const fetchCountry = async () => {
    try {
      const { data } = await axios.get("https://restcountries.com/v3.1/all");

      if (data) {
        const mapped = data.map((country: { name: { common: string }, flag: string, flags: Flags }) => {
          return {
            name: country.name.common,
            flag: country.flags.png
          }
        })
        setCountrys(mapped)
      }

    } catch (error) {

    }
  }

  const filter = async (text: string) => {
    try {
      const { data } = await axios.get(`https://restcountries.com/v3.1/name/${text}?fullText=true`);

      if (data) {
        const mapped = data.map((country: { name: { common: string }, flag: string, flags: Flags }) => {
          return {
            name: country.name.common,
            flag: country.flags.png
          }
        })
        setCountrys(mapped)

      }

    } catch (error) {

    }
  }

  useEffect(() => {
    fetchCountry()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <TextInput placeholder="Pesquisar" style={{ borderWidth: 1, borderColor: "#000", marginBottom: 30 }} onChangeText={filter} />
        <FlatList contentContainerStyle={{ flex: 1, gap: 20 }} data={countrys} keyExtractor={(_, index) => index.toString()} renderItem={({ item }) => {
          return (
            <TouchableOpacity style={{ width: "100%", height: 350, position: "relative", borderRadius: 5, overflow: 'hidden' }}>
              <View style={{ position: "absolute", zIndex: 2, top: 0, bottom: 0, right: 0, left: 0, backgroundColor: '#000', opacity: 0.7 }} />
              <View style={{ position: "absolute", zIndex: 3, width: "100%", height: `100%`, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: '#FFFF', fontWeight: "bold" }}>{item.name}</Text>
              </View>
              <Image source={{ uri: item.flag }} style={{ width: "100%", height: "100%" }} />
            </TouchableOpacity>
          )
        }}>
        </FlatList>
      </ScrollView>
    </SafeAreaView>
  )
}

export default App;