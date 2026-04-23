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
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', title: 'Primeira nota', description: 'Descrição da primeira nota' },
    { id: '2', title: 'Segunda nota', description: 'Outra descrição' },
    { id: '3', title: 'Terceira nota', description: 'Levar o lixo' },
    { id: '4', title: 'Sem descrição', description: '' },
  ]);

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '' });
  function handleAdd() {
    setFormData({ title: '', description: '' });
    setIsAdding(true);
  }

  function handleEdit(note: Note) {
    setFormData({ title: note.title, description: note.description });
    setSelectedNote(note);
    setIsEditing(true);
  }

  function handleDelete(id: string) {
    setNotes(notes.filter(n => n.id !== id));
    if (selectedNote?.id === id) {
      setSelectedNote(null);
    }
  }

  function handleSave() {
    if (isAdding) {
      const newNote: Note = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description
      };
      setNotes([...notes, newNote]);
      setIsAdding(false);
    } else if (isEditing && selectedNote) {
      setNotes(notes.map(n =>
        n.id === selectedNote.id
          ? { ...n, title: formData.title, description: formData.description }
          : n
      ));
      setIsEditing(false);
      setSelectedNote(null);
    }
  }

  function closeModal() {
    setSelectedNote(null);
    setIsEditing(false);
    setIsAdding(false);
    setFormData({ title: '', description: '' });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Notas</h1>
          <button
            onClick={handleAdd}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <span>+</span> Nova Nota
          </button>
        </div>

        <NoteList>
          {notes.map((note): JSX.Element => (
            <NoteContainer
              key={note.id}
              title={note.title}
              description={note.description}
              onClick={() => setSelectedNote(note)}
              onEdit={() => handleEdit(note)}
              onDelete={() => handleDelete(note.id)}
            />
          ))}
          {notes.length === 0 && (
            <p className="text-gray-500 text-center py-8">Nenhuma nota cadastrada</p>
          )}
        </NoteList>
      </div>

      {/* Modal de Visualização */}
      {selectedNote && !isEditing && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 cursor-pointer hover:text-black font-bold px-2"
            >
              X
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-800">{selectedNote.title}</h2>
            <p className="text-gray-600">{selectedNote.description || 'Sem descrição'}</p>
          </div>
        </div>
      )}

      {/* Modal de Adicionar/Editar */}
      {(isAdding || isEditing) && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-6 text-gray-800">
              {isAdding ? 'Nova Nota' : 'Editar Nota'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Digite o título"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32 resize-none"
                  placeholder="Digite a descrição"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={!formData.title.trim()}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Nome no canto inferior esquerdo */}
      <div className="fixed bottom-4 left-4 text-sm text-gray-500">
        Gabriel Antonin Pascoali
      </div>
    </div>
  )
}

export default App
