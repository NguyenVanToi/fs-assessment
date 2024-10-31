import { AppBar, Container, Link, Toolbar, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { ITab } from '../interface';

const Navbar = () => {
  const tabs: ITab[] = [
    {
      name: 'Shop',
      href: '/shop'
    },
    {
      name: 'Recipes',
      href: '/recipes',
      children: [
        {
          name: 'Categories',
          href: '/recipes'
        },
        {
          name: 'Collections',
          href: '/comingSoon'
        },
        {
          name: 'Resources',
          href: '/comingSoon'
        },
      ]
    },
    {
      name: 'Learn',
      href: '/learn'
    },
    {
      name: 'About',
      href: '/about'
    },
    {
      name: 'Blog',
      href: '/blog'
    },
  ]

  const router = useRouter();
  const pathname = router.pathname;
  const theme = useTheme();

  let children: ITab[] = [];
  const currentTab = tabs.find(tab => pathname.includes(tab.href));
  if (currentTab) children = currentTab.children || [];

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: 'transparent',
        boxShadow: 'none'
      }}
    >
      <Toolbar>
        <Container maxWidth="lg">
          {
            tabs.map(tab => (
              <Link
                key={tab.name}
                href={tab.href}
                color='text.primary'
                sx={{
                  mr: 4,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  fontWeight: pathname.includes(tab.href) ? '600' : '500',
                  borderBottom: pathname.includes(tab.href) ? `2px solid ${theme.palette.primary.main}` : 'none',
                }}>{tab.name}</Link>
            ))
          }
        </Container>
      </Toolbar>
      {
        children.length > 0 && (
          <Toolbar sx={{
            bgcolor: '#f8f5f0',
            minHeight: {
              sm: '50px'
            }
          }}>
            <Container maxWidth="lg">
              {
                children.map(child => (
                  <Link
                    key={`child_${child.name}`}
                    href={child.href}
                    color='text.primary'
                    sx={{
                      mr: 4,
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      fontSize: '.8em',
                      fontWeight: pathname.includes(child.href) ? '600' : '500',
                      "&:hover": {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    {child.name}
                  </Link>
                ))
              }
            </Container>
          </Toolbar>
        )
      }
    </AppBar>
  )

};

export default Navbar;
