    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var User = require('./models/user');
    var JwtStratergy = require('passport-jwt').Strategy;
    var Extractjwt = require('passport-jwt').ExtractJwt;
    var jwt = require('jsonwebtoken');

    var config = require('./config');

    exports.local = passport.use(new LocalStrategy(User.authenticate()));

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    exports.getToken = function(user){
        return jwt.sign(user,config.secretKey,{
            expiresIn: 3600});
    };
    var opts = {};
    // opts.jwtFromRequest = Extractjwt.fromAuthHeaderAsBearerToken();
    opts.jwtFromRequest = Extractjwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secretKey;

    exports.jwtPasssport = passport.use(new JwtStratergy(opts, (jwt_payload,done)=>{
        console.log(" JWT Payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id},(err,user)=>{
            if(err){
                return done(err, false);
            }
            else if (user){
                return done(null,user);
            }
            else{
                done(null,false);
            }
        });
    }));

    exports.verifyUser = passport.authenticate('jwt',{session:false});
    exports.verifyAdmin = function(req,res,next){
        //Check if the user exsists in the doc
        User.findOne({_id:req.user._id})
        .then((user)=>{
            if(user.admin){
                next();
            }
            else{
                err = new Error("You are not authorised for this action");
                err.status = 403;
                return next(err);
            }
        },(err)=>next(err))
        .catch((err)=>next(err));
    };