import express, { Router } from 'express';
let router = express.Router()





router.get('/post/:userId/postId', (req, res, next) => {
    console.log('this is signup!', new Date());
    res.send('post created');
})


router.get('/posts/:userId', (req, res, next) => {
    console.log('this is signup!', new Date());
    res.send('post created');
})


router.post('/post/:userId/postId', (req, res, next) => {
    console.log('this is signup!', new Date());
    res.send('post created');
})


router.put('/post/:userId/postId', (req, res, next) => {
    console.log('this is signup!', new Date());
    res.send('post created');
})


router.delete('/post/:userId/postId', (req, res, next) => {
    console.log('this is signup!', new Date());
    res.send('post created');
})


export default router