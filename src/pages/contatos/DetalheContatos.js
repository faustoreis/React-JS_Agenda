import { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  LinearProgress,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layout';
import { ContatosService } from '../../shared/services/api/contatos/ContatosService';

export const DetalheContatos = () => {
  const { id = 'nova' } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [ativo, setAtivo] = useState(1);

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);

      ContatosService.getById(Number(id)).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          navigate('/contatos');
        } else {
          setNome(result.data.nome);
          setEmail(result.data.email);
          setTelefone(result.data.telefone);
          setAtivo(result.data.ativo);
        }
      });
    }
  }, [id, navigate]);

  const handleSave = (close = false) => {
    const data = {
      id: id,
      nome: nome,
      email: email,
      telefone: telefone,
      ativo: ativo,
    };
    if (id === 'nova') {
      ContatosService.create(data).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          if (close) {
            navigate('/contatos');
          } else {
            setIsLoading(true);

            ContatosService.lastId().then((result) => {
              setIsLoading(false);

              if (result instanceof Error) {
                alert(result.message);
                navigate('/contatos');
              } else {
                navigate(`/contatos/detalhe/${result.data.data[0].id}`);
              }
            });
          }
        }
      });
    } else {
      ContatosService.updateById(Number(id), data).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          console.log(result);
          alert(result.message);
        } else {
          if (close) {
            navigate('/contatos');
          } else {
            navigate(`/contatos/detalhe/${id}`);
          }
        }
      });
    }
  };

  return (
    <LayoutBaseDePagina
      titulo={id === 'nova' ? 'Nova pessoa' : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo='Nova'
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}
          aoClicarEmSalvar={() => handleSave(false)}
          aoClicarEmSalvarEFechar={() => handleSave(true)}
          aoClicarEmVoltar={() => navigate('/contatos')}
          aoClicarEmNovo={() => navigate('/contatos/detalhe/nova')}
          nome={nome}
          id={id}
        />
      }
    >
      <>
        <Box
          margin={1}
          display='flex'
          flexDirection='column'
          component={Paper}
          variant='outlined'
        >
          <Grid container direction='column' padding={2} spacing={2}>
            {isLoading && (
              <Grid item>
                <LinearProgress variant='indeterminate' />
              </Grid>
            )}

            <Grid item>
              <Typography variant='h6'>Geral</Typography>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
                  fullWidth={true}
                  name='nome'
                  disabled={isLoading}
                  label='Nome completo'
                  onChange={(e) => setNome(e.target.value)}
                  value={nome}
                />
              </Grid>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
                  fullWidth={true}
                  name='email'
                  disabled={isLoading}
                  label='E-mail'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Grid>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextField
                  fullWidth={true}
                  name='telefone'
                  label='Telefone'
                  disabled={isLoading}
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <FormControl>
                  <FormLabel>Situação</FormLabel>
                  <RadioGroup
                    row
                    value={ativo}
                    onChange={(e) => setAtivo(e.target.value)}
                  >
                    <FormControlLabel
                      value='1'
                      control={<Radio />}
                      label='Ativo'
                    />
                    <FormControlLabel
                      value='0'
                      control={<Radio />}
                      label='Inativo'
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </>
    </LayoutBaseDePagina>
  );
};
