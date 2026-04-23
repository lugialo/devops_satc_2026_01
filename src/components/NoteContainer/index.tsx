import type { JSX } from "react";

type NoteProps = Readonly<{
    title: string
    description?: string
    onClick?: () => void
    onEdit?: () => void
    onDelete?: () => void
}>

export function NoteContainer({ title, description, onClick, onEdit, onDelete }: NoteProps): JSX.Element {
    return (
        <div className="flex rounded-xl min-w-[136px] m-2 w-[95%] p-4 border border-solid border-indigo-500 items-center justify-between bg-white hover:shadow-md transition-shadow">
            <button
                onClick={onClick}
                className="flex-1 text-left cursor-pointer">
                <span className="font-medium">{title}</span>
                <span className="text-gray-500 ml-2">- {description || 'Sem descrição'}</span>
            </button>
            <div className="flex gap-2 ml-2">
                <button
                    onClick={(e) => { e.stopPropagation(); onEdit?.(); }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                    title="Editar"
                >
                    ✏️
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); onDelete?.(); }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Excluir"
                >
                    🗑️
                </button>
            </div>
        </div>
    )
}