import { RouterProvider } from "react-router"
import { router } from "./app.routes"
import './features/shared/styles/globel.scss'
import { AuthProvider } from './features/auth/auth.context'
import { SongContextProvider } from "./features/home/song.context"
import { ThemeProvider } from './features/shared/context/theme.context'

function App() {

  return (
    <ThemeProvider>
      <AuthProvider>
        <SongContextProvider>
          <RouterProvider router={router} />
        </SongContextProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
