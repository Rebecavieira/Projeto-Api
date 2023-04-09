const db = require("../../../connection/database");
const table = "tb_carrinho_produto"; 

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
      INSERT INTO ${table} ( carrinho_id, produto_id, quantidade) 
      VALUES (${corpo.carrinho_id}, ${corpo.produto_id}, ${corpo.quantidade});
  `);
  let combo = await db.execute(`
      SELECT * FROM ${table} WHERE id = ${sql.insertId};
  `)

  return JSON.stringify(combo[0]);
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