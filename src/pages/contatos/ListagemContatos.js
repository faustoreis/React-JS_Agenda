import { useEffect, useState } from 'react';
import {
  Icon,
  IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { FerramentasDaListagem } from '../../shared/components';

import { ContatosService } from '../../shared/services/api/contatos/ContatosService';
import { LayoutBaseDePagina } from '../../shared/layout';
import { Environment } from '../../shared/environment';
import ModalExcluir from '../../shared/components/modal-excluir/ModalExcluir';

export const ListagemContatos = () => {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = () => {
    setIsLoading(true);

    ContatosService.getAll().then((result) => {
      setIsLoading(false);

      if (result instanceof Error) {
        alert(result.message);
      } else {
        setRows(result.data.data);
      }
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <LayoutBaseDePagina
      titulo='Listagem de Contatos'
      barraDeFerramentas={
        <FerramentasDaListagem
          textoBotaoNovo='Nova'
          aoClicarEmNovo={() => navigate('/contatos/detalhe/nova')}
        />
      }
    >
      <TableContainer
        component={Paper}
        variant='outlined'
        sx={{ m: 1, width: 'auto' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={100}>Ações</TableCell>
              <TableCell>Nome completo</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <ModalExcluir
                    nome={row.nome}
                    id={row.id}
                    reload={loadData}
                    origem='listagem'
                  />
                  <IconButton
                    size='small'
                    onClick={() => navigate(`/contatos/detalhe/${row.id}`)}
                  >
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.nome}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {rows.length === 0 && !isLoading && (
            <caption>{Environment.LISTAGEM_VAZIA}</caption>
          )}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant='indeterminate' />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBaseDePagina>
  );
};
