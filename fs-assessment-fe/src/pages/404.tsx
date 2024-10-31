import { Container, Link, Typography } from '@mui/material';

export default function NotFound() {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h3" gutterBottom>
        Coming Soon
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{mb: 4}}>
        This feature is under development. Stay tuned for updates!
      </Typography>
      <Link href="/recipes">Navigate to Recipes page</Link>
    </Container>
  )
}