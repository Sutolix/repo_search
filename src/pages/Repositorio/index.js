import React, { useState, useEffect } from 'react';
import { Container, Owner, Loading, BackButton, Language, Top, IssuesList, PageActions, FilterList } from './styled';
import { FaArrowLeft, FaLaptopCode, FaUser } from 'react-icons/fa';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import Spinner from 'react-spinner-material';
import api from '../../services/api';

export default function Repositorio({ match }) {

  const [repositorio, setRepositorio] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters] = useState([
    { state: 'all', label: 'All', active: true },
    { state: 'open', label: 'Open', active: false },
    { state: 'closed', label: 'Closed', active: false }
  ]);
  const [filterIndex, setFilterIndex] = useState(0); //Começa na posição 0 do array, ou seja, state all(todas).

  //Busca todas as informações da api
  useEffect(() => {
    async function load() {
      const nomeRepo = decodeURIComponent(match.params.repositorio);

      const [repositorioData, issuesData] = await Promise.all([
        api.get(`/repos/${nomeRepo}`),
        api.get(`/repos/${nomeRepo}/issues`, {
          params: {
            state: filters.find(f => f.active).state, //pega o valor all da state filter
            per_page: 5 //5 issues por página
          }
        })
      ])

      console.log(repositorioData.data)
      setRepositorio(repositorioData.data);
      setIssues(issuesData.data);
      setLoading(false);

    }

    load();

  }, [filters, match.params.repositorio]);

  /*Carrega as páginas de issues*/
  useEffect(() => {

    async function loadIssue() {
      const nomeRepo = decodeURIComponent(match.params.repositorio);

      const response = await api.get(`/repos/${nomeRepo}/issues`, {
        params: {
          state: filters[filterIndex].state, //pegando o estado do filters de posição zero
          page, //página de issues por qual inicia
          per_page: 5
        },
      });

      setIssues(response.data);
    }

    loadIssue()

  }, [match.params.repositorio, page, filters, filterIndex]);

  /*Gerencia a páginação*/
  function handlePage(action) {
    setPage(action === 'back' ? page - 1 : page + 1)
  }

  //Indica a posição do index quando o usuário clica nos botões
  function handleFilter(index) {
    setFilterIndex(index);
  }

  if (loading) {
    return (
      <Loading>
        <Spinner size="50px" spinnerColor="#fff" />
      </Loading>
    )
  }

  return (
    <Container>

      <Top>
        <BackButton to="/">
          <FaArrowLeft color="#000" size="30" />
        </BackButton>
        <Language>
          <FaLaptopCode color="#000" size="30" />
          <span title="Language">{repositorio.language}</span>
        </Language>
      </Top>

      <Owner>
        <a href={repositorio.html_url}>
          <img src={repositorio.owner.avatar_url}
            alt={repositorio.owner.login}
          /></a>
        <h1>{repositorio.name}</h1>
        <p>{repositorio.description}</p>
      </Owner>

      <FilterList active={filterIndex}>
        <IoIosInformationCircleOutline size="30px" color="#0d2636" title="Issues"/>
        {/*index é a posição do state que ele pega */}
        <div className="buttons">
          {filters.map((filter, index) => (
            <button
              type="button"
              key={filter.label}
              onClick={() => handleFilter(index)}
            >{filter.label}
            </button>
          ))}
        </div>

      </FilterList>

      <IssuesList>
        {issues.map(issue => (
          //converte issue.id que vem como numero para id
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />

            <div>

              <strong>
                <a target="_blank" rel="noopener noreferrer" href={issue.html_url}>{issue.title}</a>
                <div>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </div>
              </strong>
              <p><FaUser color="#0D2636" size="10" />{issue.user.login}</p>

            </div>
          </li>
        ))}
      </IssuesList>

      <PageActions>
        <button
          type="button"
          onClick={() => handlePage('back')}
          disabled={page < 2}
        >
          Back
          </button>

        <button type="button" onClick={() => handlePage('next')}>
          Next
          </button>



      </PageActions>

    </Container>
  );
}
