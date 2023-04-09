const db = require("../../connection/database");
const table = "tb_endereco"; 

async function listAll(){
    let lista = await db.execute(`
        SELECT * FROM ${table};
    `);
    return JSON.stringify(lista);
}

async function listOne(id){
  let lista = await db.execute(`
      SELECT * FROM ${table} WHERE id= ${id};
  `);
  return JSON.stringify(lista[0]);
}

async function create (corpo){

  let sql = await db.execute(`
      INSERT INTO ${table} (cep, logradouro, numero, complemento, bairro, cidade, estado) VALUES ('${corpo.cep}', 
      '${corpo.logradouro}', '${corpo.numero}', '${corpo.complemento}', '${corpo.bairro}', '${corpo.cidade}', 
      '${corpo.estado}' );
  `);
  let endereco = await db.execute(`
      SELECT * FROM ${table} WHERE id = ${sql.insertId};
  `)

  return JSON.stringify(endereco[0]);
}

async function deletar (id){
  await db.execute(`
      DELETE FROM ${table} WHERE id = ${id};
  `);
}

module.exports ={
  listAll,
  listOne,
  create,
  deletar
}