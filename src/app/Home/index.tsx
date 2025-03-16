import { useEffect, useState } from "react"
import { View, Text, FlatList, Alert } from "react-native"

import { styles } from "./styles"
import { Item } from "@/components/Item"
import { Input } from "@/components/Input"
import { Button } from "@/components/Button"

import { createStore } from 'tinybase'

const TABLE_NAME = "produts"

const store = createStore()


export function Home() {
  const [description, setDescription] = useState("")
  const [products, setProducts] = useState([])
 
  const id = Math.random().toString(30).substring(2, 20)
  console.log(id)
  store.setRow(TABLE_NAME, id, { description, done: false })


  function get() {
    const data = store.getTable(TABLE_NAME)
    console.log(data)
  }
  function add(){
    if(description.trim() === ''){
      return Alert.alert('Atention', 'informe your product')
    }
  }
  
  useEffect(() => {
    get()
  },[])



  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Input
          placeholder="O que você precisa comprar?"
          onChangeText={setDescription}
          value={description}
        />

        <Button title="Adicionar" onPress={add}/>
      </View>

      <FlatList
        data={products}
        renderItem={({ item }) => (
          <Item data={item} onStatus={() => {}} onRemove={() => {}} />
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <Text style={styles.empty}>Nenhum item aqui.</Text>
        )}
        style={styles.list}
      />
    </View>
  )
}
