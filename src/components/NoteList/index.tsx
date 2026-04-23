import type { JSX, ReactNode } from 'react';

interface ListProps {
    readonly children: ReactNode;
}

export function NoteList({ children }: ListProps): JSX.Element {
    return (
        <div className="flex flex-col py-6 justify-center items-center m-auto rounded-xl min-w-[136px] max-w-11/12 border border-solid border-indigo-500 bg-white shadow-sm">
            {children}
        </div>
    )
}