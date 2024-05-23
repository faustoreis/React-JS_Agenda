import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

import { LayoutBaseDePagina } from '../../shared/layout';
import { FerramentasDaListagem } from '../../shared/components';
import { ContatosService } from '../../shared/services/api/contatos/ContatosService';

export const Dashboard = () => {
  const [totalCountContatos, setTotalCountContatos] = useState(0);
  const [isLoadingContatos, setIsLoadingContatos] = useState(false);

  useEffect(() => {
    setIsLoadingContatos(true);

    ContatosService.getAll(0, 'busca').then((result) => {
      setIsLoadingContatos(false);

      if (result instanceof Error) {
        alert(result.message);
      } else {
        setTotalCountContatos(result.data.data.length);
      }
    });
  }, []);

  return (
    <LayoutBaseDePagina
      titulo='Painel Principal'
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputBusca={false}
          mostrarBotaoNovo={false}
        />
      }
    >
      <Box width='100%' display='flex'>
        <Grid container margin={2}>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total de contatos
                  </Typography>

                  <Box
                    padding={6}
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                  >
                    {!isLoadingContatos && (
                      <Typography variant='h1'>{totalCountContatos}</Typography>
                    )}
                    {isLoadingContatos && (
                      <Typography variant='h6'>Carregando...</Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LayoutBaseDePagina>
  );
};
