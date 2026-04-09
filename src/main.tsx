import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router";
import CreateNote from './pages/create-note/CreateNote.tsx';
const router = createBrowserRouter([
  {
    path: "/",
    Component: App
  },
  {
    path: "/note-create",
    Component: CreateNote
  }
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>

)
