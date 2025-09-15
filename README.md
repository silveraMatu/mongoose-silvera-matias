# mongoose-silvera-matias

## Validaciones Implementadas

### A fin de cumplir con el bonus de la consigna se realizaron algunas validaciones básicas de existencia de datos, validaciones para evitar duplicado en campos unicos (error code 11000) y validaciones de input con express-validator.


## Modelos utilizados

#### User (cuanta con una propiedad embebida de profile)
#### Channel
#### Video
#### Comment
#### Like

## Relaciones

### User y Profile: documento embebido 
--> Se hizo de esa manera para mejorar el rendimiento de las consult al traer los datos del user y el profile, como por lo general siempre vienen juntos ayuda a mantener la coherencia de datos y simplifica las querys a la hora requerir data del profile.

### User y Channel: relación referenciada (1:1)
--> Se optó por referencia para mantener la flexibilidad de consulta, y para evitar duplicación de datos de usuario en cada canal. Esto permite escalabilidad y consultas independientes.

### Channel y Video: relación referenciada (1:M)
--> Se eligió referencia para evitar documentos de video demasiado grandes al embeberse, y para permitir consultas eficientes de videos por canal. Facilita el manejo de grandes volúmenes de contenido.

### Video y Comments: relación referenciada (1:M)
--> Se usó referencia debido al alto volumen potencial de comentarios, lo que permite mejor performance en consultas y evita límites de tamaño de documento. Además, facilita la gestión independiente de comentarios.

### User y Comments: relación referenciada (1:M)
--> Se implementó con referencia para mantener la integridad de los datos de usuario sin duplicar información en cada comentario, y para permitir moderación y gestión centralizada de comentarios por usuario a futuro.

### Video y Likes: relación referenciada (M:M) con tabla intermedia
--> Se implementó una colección intermedia de likes con referencias a User y Video, indexada con un unique para evitar duplicados. Esto garantiza que un usuario solo pueda dar like una vez por video, mantiene la integridad de los datos y permite consultas más eficientes.



## Puntos a justificar

### Como se utiliza el populate desde las colecciones que no tienen referencias.
--> Se utilizan campos virtuales para crear relaciones sin almacenar referencias físicas en la base de datos. Esto permite:

- Mantener schemas limpios sin campos de referencia redundantes

- Realizar populaciones en tiempo de ejecución para traer datos relacionados

- Flexibilidad para consultas complejas sin afectar la estructura de datos

##### Ejemplo técnico:
```javascript

//opciones del Schema
toJson: {virtual: true} //Permite incluir los virtuals en documentos JSON y enviarlos en la respuesta del server.  


// En el modelo Video
videoSchema.virtual("comment", {
    ref: "Comment",
    localField: "_id",
    foreignField: "video"
});

// En el controlador
const comments = await VideoModel.findById(videoId).populate("comment");
```

### Como se realizan las eliminaciones lógicas y en cascada.

Las eliminaciones lógicas y en cascada no propiamente nativas de mongoose por lo que, para poder implementarlas, es necesario usar otros métodos:

##### Eliminación lógica
--> Su implementación es simple. Al momentos de querer eliminar un documento de forma lógica se realiza una actualización al documento, seteando el campo "deleted_at" con la fecha actual. Posteriormente en los finders, se puede realizar un middleware para que estos filtren por el campo "deleted_at" y no traigan los documentos que tengan ese campo con una fecha.

##### ejemplo técnico:
```javascript
//Query Middleware para que los finders siempre filtren el campo deleted_at

userSchema.pre(/^find/, function(next){
  if(this.getFilter().deleted_at === undefined){ //únicamente se configura el find si dentro del filter no aparece el campo deleted_at
    this.where({deleted_at: null})
  }
  next()
})

//En el controlador de delete para setear el deleted_at
const softDeletedUser = await UserModel.findOneAndUpdate(
            {
                _id, 
                deleted_at: null
            }, 
            {
                deleted_at: new Date()
            })
```
##### Eliminación en cascada
--> Se utilizan query middlewares para mantener la integridad referencial eliminando documentos hijos automáticamente.

```javascript
//En el controlador

await ChannelModel.deleteOne({_id: channelId})

//en el middleware

//Es importante que la opción query esté en true para que el middleware se accione con model.deleteOne().
//Si el delete fuera desde una instancia del modelo, es decir, document.deleteOne(), entonces sería document: true

channelSchema.pre("deleteOne", { query: true }, async function (next) {

  const channelId = this.getFilter()._id

  const videos = await VideoModel.find({ channel: channelId});

  for (const video of videos) {
    await video.deleteOne(); //delete de instancia. Acciona un middleware en videoSchema para eliminar comentarios
  }

  next();
});

// En el middleware de Video (para eliminar comentarios)

videoSchema.pre("deleteOne", { document: true }, async function (next) {
  // "this" es el documento de video
  await CommentModel.deleteMany({ video: this._id });
  next();
});
```

### Cómo crear un endpoint que permita agregar un nuevo vínculo en una relación muchos a muchos.
--> Se crea un endpoint POST que recibe los IDs de ambas entidades y crea un documento en la colección intermedia, con validación de duplicados.

```javascript

//routes/like.routes.js
router.post('/likes', addLike);

//controllers/like.controller.js
export const addLike = async (req, res) => {
  const { userId, videoId } = req.body;

  try {
    //Validar existencia de entidades
    const user = await UserModel.findById(userId);
    const video = await VideoModel.findById(videoId);
    
    if (!user || !video) {
      return res.status(404).json({ 
        ok: false, 
        msg: "Usuario o video no encontrado" 
      });
    }

    //Crear vínculo (con unique index para evitar duplicados)
    const newLike = new LikeModel({
      user: userId,
      video: videoId,
      createdAt: new Date()
    });

    const savedLike = await newLike.save();
    
    res.status(201).json({
      ok: true,
      msg: "Like agregado exitosamente",
      data: savedLike
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        ok: false,
        msg: "El usuario ya dio like a este video"
      });
    }
    
    res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
      error: error.message
    });
  }
};
```

