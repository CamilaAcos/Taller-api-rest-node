import Express from 'express'
 
const createServer = () => {

  const app = Express()

  const PORT = process.env.PORT || 3000

  app.get('/',(req, res)=>{

    res.send('Hola mundo')

  })

  app.listen(PORT, ()=>{

    console.log(`Server - API REST: http://localhost:${PORT}`);

  })

}
 
createServer()
 