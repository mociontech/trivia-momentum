# EnRuta Empresarial · Trivia tríptico

Base funcional en **Node.js + React** para operar una trivia sincronizada en tres televisores/pantallas:

1. **Pantalla táctil** — `/touch`
2. **Pantalla de video/avatar** — `/video`
3. **Pantalla de contenido/apoyo** — `/content`

Las tres pantallas se sincronizan en tiempo real con **Socket.IO**. El servidor guarda el estado central de una única partida y registra resultados localmente en `data/results.json`.

## 1. Requisitos

- Node.js 20 o superior.
- Un PC conectado a las tres pantallas, idealmente usando **Extender escritorio** en Windows.
- Chrome o Edge en cada pantalla, en modo pantalla completa (`F11`).

## 2. Instalar

```bash
npm install
```

## 3. Desarrollo

```bash
npm run dev
```

Abrir:

- Táctil: `http://localhost:5173/touch`
- Video: `http://localhost:5173/video`
- Contenido: `http://localhost:5173/content`

> En desarrollo, Vite usa el puerto 5173 y el servidor de sincronización usa el 3001.

## 4. Producción / evento

```bash
npm run build
npm start
```

Luego abrir:

- `http://localhost:3001/touch`
- `http://localhost:3001/video`
- `http://localhost:3001/content`

Si cada TV usa un equipo diferente dentro de la misma red, reemplaza `localhost` por la IP local del PC servidor, por ejemplo `http://192.168.1.20:3001/video`.

## 5. Dónde editar las preguntas

`shared/questions.js`

Cada pregunta tiene:

```js
{
  id: 1,
  topic: 'EnRuta Empresarial',
  question: '...',
  options: ['...', '...', '...'],
  correctIndex: 1,
  explanation: '...'
}
```

## 6. Videos correctos / incorrectos

Reemplaza directamente:

- `public/videos/correct.mp4`
- `public/videos/incorrect.mp4`

No necesitas tocar el código. Cada vez que alguien responde, la pantalla `/video` reproduce el archivo correspondiente desde el inicio.

## 7. Avatares

La selección de avatar está preparada en `src/screens/TouchScreen.jsx` y la pantalla de video muestra cuál fue elegido.

Cuando tengas los videos reales de cada avatar, se puede ampliar la lógica para usar archivos como:

```text
public/videos/avatar-1-correct.mp4
public/videos/avatar-1-incorrect.mp4
public/videos/avatar-2-correct.mp4
public/videos/avatar-2-incorrect.mp4
```

## 8. QR

La URL del QR está en:

`shared/config.js`

```js
qrUrl: 'https://www.cccartagena.org.co/'
```

El flujo de QR previo a la trivia está desactivado por defecto porque todavía falta definir qué función tendrá. Para activarlo:

```js
showPreQuizQr: true
```

El QR final siempre aparece en las pantallas de resultado.

## 9. Archivos principales

```text
server/index.js                 servidor Node + Socket.IO
shared/questions.js             banco de 15 preguntas
shared/config.js                configuración general
src/screens/TouchScreen.jsx     flujo táctil
src/screens/VideoScreen.jsx     TV de video/avatar
src/screens/ContentScreen.jsx   TV de contenido/apoyo
src/styles.css                  diseño visual
public/reference/               pantallas originales de Figma exportadas
public/videos/                  videos de respuesta
```

## 10. Flujo actual

`Bienvenida → Validación → Instructivo → Selección de avatar → Carga → Preguntas → Feedback → Resultado + QR`

La fase de QR previa a preguntas existe en el código pero queda desactivada hasta definir su función final.

## 11. Reiniciar

Al final hay un botón **Nueva participación**. También puedes reiniciar recargando el servidor.

## 12. Nota para el evento

Esta base está pensada para funcionar en red local y no depende de Firebase ni de internet para la sincronización. El único contenido externo es la URL codificada dentro del QR; su imagen se genera localmente en React.
