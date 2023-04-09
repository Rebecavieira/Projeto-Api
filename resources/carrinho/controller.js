const db = require("../../connection/database");
const table = "tb_carrinho"; 

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
  let cupom_id = corpo.cupom_id ? corpo.cupom_id : 'NULL';
  let sql = await db.execute(`
      INSERT INTO ${table} (created_at, updated_at, cliente_id, cupom_id, frete) 
      VALUES (NOW(), NULL, ${corpo.cliente_id}, ${cupom_id}, ${corpo.frete});
  `);
  let carrinho = await db.execute(`
      SELECT * FROM ${table} WHERE id = ${sql.insertId};
  `)

  return JSON.stringify(carrinho[0]);
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