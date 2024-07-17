import express, { Application, Request, Response } from "express";
import  userRoutes  from "./routes/userRoutes.js";
import { connectDB } from "./database/dbConfig.js";
import cors from 'cors'

import path from "path"
const currentWorkingDir = path.resolve();
const parentDir = path.dirname(currentWorkingDir)
const productionParendDir = path.dirname(parentDir)
console.log('currentworkingdir:',currentWorkingDir)
console.log('parendDir:',parentDir)
console.log('productiondir:',productionParendDir)


const app: Application = express();

connectDB();

app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.use('/api',userRoutes)

const environments = 'Production'

if ( environments === 'Production') { 
  app.use(express.static(path.join( productionParendDir , '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(  productionParendDir , 'frontend', 'dist', 'index.html'))
  );

} else {
  app.use(express.static(path.join( parentDir , '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve( parentDir , 'frontend', 'dist', 'index.html'))
  );
}


const port: number = 3500;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
