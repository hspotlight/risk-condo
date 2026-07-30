import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#b3261e' },
    secondary: { main: '#1f6feb' },
    background: { default: '#f4f5f7', paper: '#ffffff' },
  },
  typography: {
    fontFamily: [
      '"IBM Plex Sans Thai"',
      '"Noto Sans Thai"',
      'system-ui',
      '-apple-system',
      '"Segoe UI"',
      'Roboto',
      'sans-serif',
    ].join(','),
    h1: { fontSize: '1.35rem', fontWeight: 700 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiTableCell: {
      styleOverrides: {
        // Tight horizontal padding buys width for the project-name column, so
        // the row's action buttons never get pushed outside the visible area.
        root: { paddingTop: 8, paddingBottom: 8, paddingLeft: 10, paddingRight: 10 },
      },
    },
  },
})
