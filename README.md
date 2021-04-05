# PracticasBDII

## Práctica MONGODB

Consiste en crear un modulo/componente en cualquier lenguaje (Node.js en este caso).
que permita realizar consultas a una base de datos creada con MONGODB

### Querys Importantes:

Simular un inner join (Mostrar todos los juegos que pertenecen a un developer)
- db.developers.aggregate(
    [
        {
            $match:{
                _id: ObjectId("605f02b1e028ac82a5ae4717")
            }
        },
    {
        $lookup: {
            from:'games',
            localField:'_id',
            foreignField:'developer',
            as:'games'
        }
    }
    ]
).pretty()

_id: ObjectId - Es un id de developer.
