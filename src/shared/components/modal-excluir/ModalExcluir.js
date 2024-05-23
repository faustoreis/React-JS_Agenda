import * as React from 'react';

import {
  Icon,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import { ContatosService } from '../../services/api/contatos/ContatosService';
import { useNavigate } from 'react-router-dom';

export default function ModalExcluir({ nome, id, reload, origem }) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleExcluir = () => {
    ContatosService.deleteById(id).then((result) => {
      if (result instanceof Error) {
        alert(result.message);
      } else {
        if (origem === 'listagem') {
          reload();
        } else {
          navigate('/contatos');
        }
      }
    });
    setOpen(false);
  };

  return (
    <>
      {origem === 'listagem' ? (
        <IconButton size='small' onClick={handleClickOpen}>
          <Icon>delete</Icon>
        </IconButton>
      ) : (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={handleClickOpen}
          startIcon={<Icon>delete</Icon>}
        >
          <Typography
            variant='button'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            overflow='hidden'
          >
            Apagar
          </Typography>
        </Button>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Excluir</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir o contato:
            <br />
            {nome}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleExcluir}>Excluir</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
