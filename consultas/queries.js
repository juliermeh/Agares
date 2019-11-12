const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'IBGE',
  password: 'postgres',
  port: 5432
});

const getSVG = (request, response) => {
    const municipio = request.params.nome
  
    pool.query('SELECT ST_AsSVG(geom) FROM municipio WHERE nome ilike $1', [municipio], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows)
    })
}

const getViewBox = (request, response) => {
    const municipio = request.params.nome
  
    pool.query('SELECT getViewBox($1)', [municipio], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows)
    })
}

const getCidade = (request, response) => {
  const municipio = request.params.nome

  pool.query('SELECT m.nome AS cidade FROM municipio m, estado e WHERE e.nome ilike $1 AND ST_Within(m.geom, e.geom) ORDER BY m.nome ASC', [municipio] ,(error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getEstado = (request,response) => {
  pool.query('SELECT nome FROM estado ORDER BY nome ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
    getSVG,
    getViewBox,
    getCidade,
    getEstado
}