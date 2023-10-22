import express , {Express , Request , Response} from 'express'
const app : Express  = express()
const port = 8000

type myFunction = (arg:string)=>JSON



import MongoStore from 'connect-mongo'
import { MongoClient } from 'mongodb'

import session from 'express-session'
import cookieParser = require('cookie-parser')

interface User {
  name: string;
  walletAddress: string;
}

declare module 'express-session' {
  interface Session {
      user: User;
  }
}


const uri = 'mongodb://localhost:27017/defund';
const client = new MongoClient(uri);
const connectMongo =async () => {
    try {
    await client.connect();
  } catch (e) {
    console.error(e);
  }
}

connectMongo()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:true,
    store: MongoStore.create({ 
      mongoUrl: 'mongodb://localhost:27017/defund',
      collectionName: 'sessions'
    }),
    cookie:{
      httpOnly:true,
      sameSite:'none',
      maxAge:1000 * 60 * 60 * 24 * 30
    }
}))


import cors from 'cors'


import { PrismaClient , Prisma  } from '@prisma/client'


app.use(cors({credentials:true,origin:'http://localhost:3000'}))

const prisma = new PrismaClient()

interface User {
    name:string,
    walletAddress : string
}


app.post('/auth' ,async (req:Request , res : Response)=>{
    const {name , walletAddress} : User   = req.body
    try{
      const userCreate = await prisma.baseUser.create({
        data: {
          name: name,
          walletAddress: walletAddress
        }
      })
      return res.json(userCreate)
    } catch(e){
      return res.status(400)
    }
    
})

interface walletCheckResponse  {
  walletAddress: string
}

app.post('/check-wallet',async (req: Request, res: Response) => {
  const {walletAddress}:walletCheckResponse = req.body
  try {
    const user = await prisma.baseUser.findFirstOrThrow({
    where:{walletAddress:walletAddress}})
    console.log(user)
    return res.status(200).send(user)
  } catch (e) {
    return res.status(403).send('Log in First')
  }
});


app.post('/seeker/create' , async (req:Request , res:Response)=>{
  const { userId } : {userId:number} = req.body
  const user =  await prisma.baseUser.update({
    where:{
      id:userId
    },
    data:{
      isSeeker:true
    }
  })
  let seeker : Prisma.SeekerCreateInput = {
    user:{
      connect:{id:userId}
    }
  }
  const seekerCreate = await prisma.seeker.create({
    data:seeker})
    res.send(seekerCreate)
})

app.post('/investor/create' ,async (req:Request , res:Response) => {
  const {userId} : {userId:number} = req.body
  const user =  await prisma.baseUser.update({
    where:{
      id:userId
    },
    data:{
      isInvestor:true
    }
  })
  const ifSeeker = await prisma.seeker.findFirst({
    where:{userId:userId}
  })
  if(ifSeeker){
    return res.status(401).json({message:'already a user'})
  }
  const inverstorCreate = await prisma.investor.create({
    data:{
      user:{
        connect:{id:userId}
      }
    }
  })
  res.status(200).send(inverstorCreate)
})


interface ProjectCreateRequest {
  name:string,
  description:string,
  gitHubLink:string,
  amountSeeking:number,
  youtubeVideoLink : string,
  userId:number
}

app.post('/project/create' , async (req:Request , res:Response)=>{
  console.log(req.body)
  const {name , description , gitHubLink , youtubeVideoLink , userId , amountSeeking }:ProjectCreateRequest = req.body
  const seeker= await prisma.seeker.findFirst({
    where:{
      userId:userId
    }
  })
  if(!seeker){
    return res.status(403).json({'message':'You must be a seeker first'})
  }
  const project : Prisma.ProjectCreateInput = {
    name:name,
    desciption:description,
    gitHubLink:gitHubLink,
    youtubeVideLink:youtubeVideoLink,
    amountSeeking:amountSeeking,
    seeker:{
      connect:{userId:userId}
    },
    isFunded:false
  }
  const projectCreated = await prisma.project.create({data:project})
  res.status(200).send(projectCreated)
})

app.get('/seeker/:id/projects' ,async (req:Request , res:Response)=>{
  const userId :string = req.params.id
  const seeker = await prisma.seeker.findFirst({
    where:{
      userId:parseInt(userId)
    }
  })
  if(!seeker){
    return res.status(403).json({'message':'You must be a seeker first'})
  }
  const projects = await prisma.project.findMany({
    where:{
      seekerId:seeker.id
    }
  })
  res.status(200).send(projects)
})

app.post('/pollCreate', async (req: Request, res: Response)=> {
  try {
    console.log(req.body)
    const { prompt, projectName, yes, no } = req.body;
    const newPoll = await prisma.poll.create({
      data: {
        prompt,
        projectName,
        yes,
        no,
      },
    });
    res.json(newPoll);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

app.listen(port , ()=>{
  console.log('⚡️[server]: Server is running at http://localhost:8000')
})