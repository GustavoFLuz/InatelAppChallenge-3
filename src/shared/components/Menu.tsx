import { Box } from '@mui/material'

interface MenuProps {
  children: React.ReactNode
}


export const Menu: React.FC<MenuProps> = ({ children }) => {
  return (
    <Box sx={{ width: "100%", py: 1, px: 3, mt: 1, display: "flex", gap: 3, borderRadius: 3, justifyContent: 'space-between', alignItems: "center", boxSizing: "border-box" }}>
      {children}
    </Box>
  )
}