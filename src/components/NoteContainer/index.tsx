import type { JSX } from "react";

type NoteProps = Readonly<{
    title: string
    description?: string
    onClick?: () => void
}>

export function NoteContainer({ title, description, onClick }: NoteProps): JSX.Element {
    return (
        <button
            onClick={onClick}
            className="flex rounded-xl min-w-[136px] m-2 w-[95%] p-8 border border-solid border-indigo-500 cursor-pointer text-left">
            • {title} - {description || 'Sem descrição'}
        </button>
    )
}