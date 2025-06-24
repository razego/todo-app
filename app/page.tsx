import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Todo App
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>  

        <Button variant="primary" size="large">Click me</Button>
        <Button variant="secondary" size="large" >Click me</Button>
        <Button variant="outline" size="large">Click me</Button>
        <Button variant="ghost" size="large">Click me</Button>
        <Button variant="danger" size="large">Click me</Button>

        </Box>
        <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 4 }}>

        <Input 
          label="Email"
          type="email"
          required
          fullWidth
          placeholder="your@email.com"
        />
        </Box>

      </Box>
    </Container>
  );
}