import './App.css'
import './assets/fonts/fonts.css'
import { NoteList } from './components/NoteList'
import { NoteContainer } from './components/NoteContainer'
import { useState } from 'react'
import type { JSX } from 'react'

interface Note {
  id: string;
  title: string;
  description: string;
}

function App() {
  // fixed mock notes
  const notes: Note[] = [
    { id: '1', title: 'Primeira nota', description: 'Descrição da primeira nota' },
    { id: '2', title: 'Segunda nota', description: 'Outra descrição' },
    { id: '3', title: 'Terceira nota', description: 'Levar o lixo' },
    { id: '4', title: 'Sem descrição', description: '' },

  ];

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  function handleNoteClick(note: Note) {
    setSelectedNote(note);
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center mt-8">Notas</h1>
      <NoteList>
        {notes.map((note): JSX.Element => (
          <NoteContainer
            key={note.id}
            title={note.title}
            description={note.description}
            onClick={() => handleNoteClick(note)}
          />
        ))}
      </NoteList>

      {selectedNote && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
            <button
              onClick={() => setSelectedNote(null)}
              className="absolute top-2 right-2 text-gray-500 cursor-pointer hover:text-black font-bold"
            >
              X
            </button>
            <h2 className="text-xl font-bold mb-4">{selectedNote.title}</h2>
            <p>{selectedNote.description || 'Sem descrição'}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default App
