import { Add, KeyboardArrowRight, Print } from '@mui/icons-material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { Box, Breadcrumbs, Button, Container, Divider, Grid2, Link, Tooltip, Typography, useTheme } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import Image from 'next/image';

import { IProduct, IResponse } from "@/lib/interface";
import { convertBakeryTimer } from '@/lib/services/common.service';


type RecipesEntityPageProps = {
  product: IProduct;
}

export default function RecipesEntityPage({ product }: RecipesEntityPageProps) {
  const theme = useTheme();

  const handlePrint = () => window.print();

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 2 }}
        separator={<KeyboardArrowRight color="primary" />}
      >
        <Link href="/recipes" sx={{ color: theme.palette.text.primary, textDecoration: "none", "&:hover": { textDecoration: 'underline' } }}>
          Recipes
        </Link>
        <Link href={`/recipes?categories=${product.categoryId}`} sx={{ color: theme.palette.text.primary, textDecoration: "none", "&:hover": { textDecoration: 'underline' } }}>
          {product.categoryName}
        </Link>
      </Breadcrumbs>
      <Grid2 container alignItems="flex-start">
        <Grid2 sx={{ width: { xs: "100%", md: "50%" }, order: { xs: 2, md: 1 }, padding: "0 1rem 0 0" }}>
          <Typography variant="h3" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ mt: 8 }}>
            {product.description}
          </Typography>
          <Grid2 container spacing={2} sx={{ my: 3 }}>
            <Grid2 sx={{ xs: "33.33%" }}>
              <Box display="flex" alignItems="start">
                <AccessTimeIcon fontSize="large" />
                <Box ml={1}>
                  <Typography variant="caption">PREP</Typography>
                  <Typography variant="body1" fontWeight={600}>{convertBakeryTimer(product.recipe.timing.prep)}</Typography>
                </Box>
              </Box>
            </Grid2>
            <Grid2 sx={{ xs: "33.33%" }}>
              <Box display="flex" flexDirection="column" alignItems="flex-start">
                <Typography variant="caption">BAKE</Typography>
                <Typography variant="body1" fontWeight={600}>{convertBakeryTimer(product.recipe.timing.bake)}</Typography>
              </Box>
            </Grid2>
            <Grid2 sx={{ xs: "33.33%" }}>
              <Box display="flex" flexDirection="column" alignItems="flex-start">
                <Typography variant="caption">TOTAL</Typography>
                <Typography variant="body1" fontWeight={600}>{convertBakeryTimer(product.recipe.timing.total)}</Typography>
              </Box>
            </Grid2>
          </Grid2>
          <Divider sx={{ my: 2 }} />
          <Box display="flex" justifyContent="space-between" alignItems="start">
            <Box display="flex" alignItems="start" mb={2} sx={{ maxWidth: {xs: "45%", lg: "50%"} }}>
              <RestaurantIcon fontSize="large" />
              <Box ml={1}>
                <Typography variant="caption">YIELD</Typography>
                <Typography variant="body1" fontWeight={600}>1 loaf, 12 generous servings</Typography>
              </Box>
            </Box>
            <Box display="flex" gap={1}>
              <Tooltip title="This feature is not available now">
                <span>
                  <Button variant="outlined" disabled sx={{ borderWidth: "2px", padding: ".25rem", height: "100%" }}>
                    <Add sx={{ mr: "4px" }} />
                    <span>SAVE RECIPE</span>
                  </Button>
                </span>
              </Tooltip>
              <Button variant="outlined" sx={{ borderWidth: "2px", color: theme.palette.text.primary }}
                onClick={handlePrint}>
                <Print sx={{ mr: "4px" }} />
                <span>PRINT</span>
              </Button>
            </Box>
          </Box>
        </Grid2>
        <Grid2 sx={{ width: { xs: "100%", md: "50%" }, order: { xs: 2, md: 1 }, padding: "0 0 0 1rem" }}>
          <Box display="flex" justifyContent="center" mt={4} sx={{ position: 'relative', width: "100%", borderRadius: 8 }}>
            <Image src={`/assets/images/${product.image || 'default.jpg'}`} alt="Whole-Grain Banana Bread" width={483} height={322} />
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  )
}

export async function getServerSideProps({ params }: GetServerSidePropsContext) {
  const { slug } = params as { slug: string };
  const response = await fetch(`${process.env.API_URL}/api/products/${slug}`)
  const result: IResponse<IProduct> = await response.json();

  return {
    props: {
      product: result.data,
    }
  }
}