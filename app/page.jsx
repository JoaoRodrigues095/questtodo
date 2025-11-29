"use client"
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { db } from "./api/firebase";
import QuestList from "./components/QuestList";
import AddQuest from "./components/AddQuest";

export default function Home() {
  const [quests, setQuests] = useState([])

  const questsCollection = collection(db, "quests")
  
  async function saveAddQuest(titulo){
      await addDoc(questsCollection, {
        title: titulo,
        status: "open",
        priority: "Normal",
        created_at: new Date().toISOString()
      })
      getQuests()
  } 


  async function saveEditQuest(quest, title, priority){
    const questRef = doc(db, "quests", quest.id)
    await updateDoc(questRef, {
      title: title || quest.title,
      priority: priority || quest.priority || "Normal"

    })
    getQuests()
  }
  async function saveConcludedQuest(quest){
    const questRef = doc(db, "quests", quest.id)
    await updateDoc(questRef, {
      status: "concluded"  

    })
    getQuests()
  }


  async function deleteQuest(quest) {
    const questRef = doc(db, "quests", quest.id)
    await deleteDoc(questRef)
    getQuests()
  }

async function getQuests(){
  const q = query(questsCollection, orderBy("created_at", "asc"))
  const data = await getDocs(q)
  const questList = data.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
  setQuests(questList)
}

useEffect(( ) => {getQuests()}, [])


  //saveAddQuest("F I S C H")
  const concludedQuests = quests.filter((quest) => quest.status === "concluded")


  const notConcludedQuests = quests.filter((quest) => quest.status === "open")

 return (
    <div className="flex h-screen items-center justify-center bg-[url('./images/bg.png')] bg-cover bg-center shadow-lg rounded-2xl">
      <div  className="w-[80%] bg-purple-900 min-h-[60%] max-h-screen p-8 overflow-auto scrollbar-hide shadow-lg">
        <p className="text-4xl font-bold font-work text-center">Quest To do</p>
      <AddQuest saveAddQuest={saveAddQuest}></AddQuest>
      <p>Abertas:</p>
      <QuestList
            quests={notConcludedQuests}
            saveEditQuest={saveEditQuest}
            saveConcludedQuest={saveConcludedQuest}
            deleteQuest={deleteQuest}

      ></QuestList>
      <p>Concluidas:</p>
      <QuestList
      quests={concludedQuests}
                  saveEditQuest={saveEditQuest}
            saveConcludedQuest={saveConcludedQuest}
            deleteQuest={deleteQuest}
      ></QuestList>
      </div>
    </div>
  );
}
