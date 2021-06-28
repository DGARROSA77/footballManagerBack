const getAll = (limit = 8, page = 1) => {
    return new Promise((resolve, reject) => {
        db.query(
            'select * from jugadores limit ?, ?',
            [limit * (page - 1), limit],
            (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
    });;
};

const getById = (pJugadorId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from jugadores where id = ?', [pJugadorId], (err, rows) => {
            if (err) reject(err);
            // Rows puede tener cero valores si el id no existe
            // rows tendrá un valor si el ID existe
            if (rows.length !== 1) resolve(null);
            resolve(rows[0]);
        })
    });
}

const getByEdad = (pEdad) => {
    return new Promise((resolve, reject) => {
        db.query('select * from jugadores where edad > ?', [pEdad], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
}



const update = (pJugadorId, { nombre, club, posicion, precio, edad, nacionalidad }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE jugadores SET nombre = ?, club = ?, posicion = ?, precio = ?, edad = ?, nacionalidad = ?, WHERE id = ?',
            [nombre, club, posicion, precio, edad, nacionalidad, pJugadorId],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
    });
}

const create = ({ nombre, club, posicion, precio, edad, nacionalidad, fk_club }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into jugadores (nombre, club, posicion, precio, edad, nacionalidad, fk_club) values (?, ?, ?, ?, ?, ?, ?)', [nombre, club, posicion, precio, edad, nacionalidad, fk_club], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}


const getIdByClub = (pIdClub) => {
    return new Promise((resolve, reject) => {
        db.query('select * from comunio.jugadores where fk_club = ?', [pIdClub], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
}



module.exports = {
    getAll, getById, getByEdad, update, create, getIdByClub
}