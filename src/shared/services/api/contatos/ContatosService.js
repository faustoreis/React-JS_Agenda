import { Api } from '../axios-config';

const getAll = async () => {
  try {
    const urlRelativa = `/contato`;

    const { data } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
      };
    }

    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.error(error);
    return new Error(error.message || 'Erro ao listar os registros.');
  }
};

const getById = async (id) => {
  try {
    const { data } = await Api.get(`/contato/${id}`);

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    console.error(error);
    return new Error(error.message || 'Erro ao consultar o registro.');
  }
};

const create = async (dados) => {
  try {
    const { data } = await Api.post('/contato', dados, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (data) {
      return data.id;
    }

    return new Error('Erro ao criar o registro.');
  } catch (error) {
    console.error(error);
    return new Error(error.message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id, dados) => {
  try {
    await Api.put(`/contato/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error(error.message || 'Erro ao atualizar o registro.');
  }
};

const deleteById = async (id) => {
  try {
    await Api.delete(`/contato/${id}`);
  } catch (error) {
    console.error(error);
    return new Error(error.message || 'Erro ao apagar o registro.');
  }
};

const lastId = async () => {
  try {
    const urlRelativa = `/contato/last`;

    const { data } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
      };
    }

    return new Error('Erro ao contar os registros.');
  } catch (error) {
    console.error(error);
    return new Error(error.message || 'Erro ao contar os registros.');
  }
};

export const ContatosService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
  lastId,
};
