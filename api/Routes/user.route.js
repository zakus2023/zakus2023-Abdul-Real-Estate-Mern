import express from 'express' //import express to create the router
import { test } from '../contollers/user.controller.js';


//creating user api route

const router = express.Router();

router.get('/test', test);


export default router