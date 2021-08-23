# Plataforma de live streaming (Servicios online, Iglesia Casa del Padre)

Esta pequeña app react es el cliente de la plataforma de streaming desarrollada exclusivamente para transmitir los servicios online de la Iglesia Casa del Padre. Tocopilla, Chile.

## App en Producción:
Actualmente la plataforma está en producción en [https://iglesiacasadelpadre.cl](https://iglesiacasadelpadre.cl). Se realizan servicios todos los Jueves a las 20:00 hrs. (hora de Chile).

## Contexto

A causa del Covid, la iglesia Casa del Padre (como todas) se vio obligada a realizar sus reuniones a través de internet. Por asuntos de copyright y problemas de funcionamiento en Android, Youtube y Facebook dejaron de ser una opción y se optó por implementar un sistema propio para realizar nuestras transmisiones en vivo.

### Infraestructura y Backend:
Toda la infraestructura, servidor RTMP y backend estan mantenidos y documentados en su propio [Repositorio de Github](https://github.com/pepelias/casadelpadre-online)

## Características de la App:

Se requería una app lo más sencilla posible, de forma que la congregación, al tan solo presionar un link en whatsapp, pueda comenzar a ver el servicio. Tomando eso en cuenta, esta son las características principales:

1. **Vista offline:** Visible mientras no hay una transmisón activa
2. **Vista online:** Muestra el player de video, total de viewers y chat en vivo
3. **Detección de inicio y final:** Sin recargar la página, se detecta el comienzo y final del stream y se cambia de vista.
4. **Chat en vivo:** Es la principal forma de interacción.
   1. **No se requiere registro:** Solo se pide el nombre para interactuar con el chat (Es modificable).
   2. **Información persistente:** La app recuerda tu nombre y no vuelve a pedirlo en las siguientes transmisiones.
   3. **Mensaje de ingreso:** *"José Avello está viendo"*
5. **Chat para OBS:** Vista preparada para ser incluida como widget en el software de transmisión, Muestra solamente los mensajes del chat con un diseño personalidazo acorde al stream.
6. **Player HLS:** Se implementa `video.js` ya que tiene una alta compatibilidad. Se le añadieron plugins para manejar multiples calidades.
7. **Multiples Calidades:** Manejamos calidades `720p`, `480p` y `240p`; aunque en teoría se calcula automaticamente, se incluye un selector para cambiar la calidad manualmente.

![Demostración del proyecto](demo_readme.gif)

> La escena final muestra el chat ya integrado como widget en el software de transmisión.

## Widget para OBS
Para integrar el chat como un widget en Obs, solo necesita añadir una **fuente de navegador** con la ruta `https://iglesiacasadelpadre.cl/chat` (No se aplica ningún tipo de seguridad)