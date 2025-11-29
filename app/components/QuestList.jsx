import React from 'react'
import QuestItem from './QuestItem'

export default function QuestList({quests, saveEditQuest, saveConcludedQuest, deleteQuest}) {
  console.log(quests)
  return (
    <div className='flex flex-col gap-3 w-full'>
      {
        quests.map((quest) => <QuestItem
          quest={quest}
          saveEditQuest={saveEditQuest}
          saveConcludedQuest={saveConcludedQuest}
          deleteQuest={deleteQuest}
        ></QuestItem>)
      }
    </div>
  )
}