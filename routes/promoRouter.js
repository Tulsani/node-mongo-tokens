const express = require("express");
const bodyParser = require("body-parser");
const authenticate = require('../autenticate');

const Promotions = require('../models/promotions');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/') 

.get((req,res,next)=>{
    Promotions.find({})
    .then((promotions)=>{
        res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json(promotions);
    },(err) => next(err))
    .catch((err) => next(err));
 
 })
 .post(authenticate.verifyUser,(req,res,next)=>{
    Promotions.create(req.body)
    .then((promotion)=>{
        console.log('Promotion Created',promotion);
        res.statusCode = 200;
        res.setHeader('Contwent-Type','application/json');
        res.json(promotion);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403 ;  //suggests not supported request
    res.end('put is edit message not supporeted on promotions');
})
.delete(authenticate.verifyUser,(req,res,next)=>{
    Promotions.remove({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

promoRouter.route('/:promoId')
.get((req,res,next)=>{
    Promotions.findById(req.params.promoId)
    .then((promotion)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
    },(err)=>{next(err)})
    .catch((err)=>next(err));
 })

.post(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403 ;  //suggests not supported request
    res.end('Post is addition request message not supporeted on' + req.params.promoId );
})
.put(authenticate.verifyUser,(req,res,next)=>{
    Promotions.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, { new: true })
    .then((promo)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.delete(authenticate.verifyUser,(req,res,next)=>{
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((deletedPromotion)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(deletedPromotion);
    },(err)=>next(err))
    .catch((err)=>next(err));
});
module.exports = promoRouter;