import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa';
import { Container, Form, SubmitButton, List, DeleteButton } from './style';

import api from '../../services/api';

export default function Main() {

  //---States
  const [newRepo, setNewRepo] = useState('');
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);

  // Buscar
  useEffect(() => {
    const repoStorage = localStorage.getItem('repos');
    if(repoStorage){
      setRepositorios(JSON.parse(repoStorage));
    }
  },[])

  // Salvar alterações
  useEffect(() => {
    //repos será a key da informação no localStorage. JSON.stringify para converter.
    localStorage.setItem('repos', JSON.stringify(repositorios));

  },[repositorios]);

  //Return
  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    //async await pra esperar a resposta
    async function submit() {
      setLoading(true);
      try {

        //Verifica se o input está vazio
        if(newRepo === ''){
          throw new Error('Você precisa indicar um repositório!');
        }

        //Usa a api pra carregar dados sobre o repositório que foi digitado
        const response = await api.get(`repos/${newRepo}`);

        //Verifica se o repositório buscado já existe
        const hasRepo = repositorios.find(repo => repo.name === newRepo);
        if(hasRepo){
          throw new Error('Esse repositorio já foi adicionado!');
        }

        //Filtra pra pegar só o nome pois do contrario retornaria todos os dados desnecessáriamente
        const data = {
          name: response.data.full_name,
        }

        //Soma a repositórios o novo repositório para ser exibido
        setRepositorios([...repositorios, data]);

        //Limpa o campo do input
        setNewRepo('');
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    //Executa a função
    submit();

  }, [newRepo, repositorios]);
  //Para executar a função sempre que houver mudanças em newRepo e repositorios


  //Atribui o valor do input ao setNewRepo
  function handleinputChange(e) {
    setNewRepo(e.target.value);
  }


  const handleDelete = useCallback((repo) => {
    const find = repositorios.filter(r => r.name !== repo)
    setRepositorios(find);
  }, [repositorios]);




  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        My Repositories
      </h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicionar Repositórios"
          value={newRepo}
          onChange={handleinputChange}
          required
          spellCheck="false"
          
        />

        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#FFF" size={14} />
          ) : (
              <FaPlus color="#fff" size={14} />
          )}
        </SubmitButton>
      </Form>
      <List>
        {repositorios.map(repo => (
          <li key={repo.name}>
              <span>
                <DeleteButton onClick={()=>{handleDelete(repo.name)}}>
                  <FaTrash size={14}/>
                </DeleteButton>
                {repo.name}
                </span>
                {/*encondeURIComponent para indicar que o user/repositorio é um parametro e não uma nova página */}
              <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
                <FaBars size={20}/>
              </Link>
          </li>
        ))}
      </List>

    </Container>
  );
}
