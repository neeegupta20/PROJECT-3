const express=require('express');
const cors=require('cors')
const app=express();
const User=require('./models/User.js')
const Place=require('./models/place.js')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser');
const downloader=require('image-downloader')
const multer=require('multer')
const fs=require('fs');
const Booking=require('./models/booking.js');

const bcryptSalt=bcrypt.genSaltSync(8)
const jwtSecret='1234567890'


app.use('/uploads',express.static(__dirname+'/uploads')) 
app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials:true,origin:'http://localhost:5173'}));


app.post('/register',async (req,res)=>{
    const {name,email,password}=req.body;
    const UserDoc = await User.create({
        name,
        email,
        password:bcrypt.hashSync(password,bcryptSalt)
    })
    res.json(UserDoc);
})
app.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    const userDoc=await User.findOne({email});
    if(userDoc){
        const passOk=bcrypt.compareSync(password,userDoc.password)
        if (passOk){
            jwt.sign({email:userDoc.email,id:userDoc._id},jwtSecret,{},(err,token)=>{
                if(err) throw err;
                res.cookie('token',token,).json(userDoc)
            })
        }
        else{
            res.status(422).json("INCORRECT PASSWORD.")
        }
    }
    else{
        res.json("NOT REGISTERED.")
    }
})

app.get('/profile',(req,res)=>{
    const {token}=req.cookies;
    if(token){
            jwt.verify(token,'1234567890',async (err,tokenData)=>{
                if(err) throw(err);
                const {name,email,_id}=await User.findById(tokenData.id)
                res.json({name,email,_id});

            })
    }
    else{
        res.json(null)
    }

app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true)
})
})

app.post('/uploadbylink',async(req,res)=>{
    const {link}=req.body;
    const newName='photo'+Date.now()+'.jpg'
    await downloader.image({
        url:link,
        dest:__dirname+'/uploads/'+newName
    })
    res.json(newName)
})

const photoMiddleware=multer({dest:__dirname+'/uploads'})
app.post('/upload',photoMiddleware.array('photos',100),async(req,res)=>{
    const uploadFiles=[];
    for(let i=0;i<req.files.length;i++){
        const {path,originalname}=req.files[i];
        const parts=originalname.split('.');
        const ext=parts[parts.length-1];
        const newPath=path+'.'+ext;
        const extras=__dirname+'/uploads/'
        fs.renameSync(path,newPath);
        uploadFiles.push(newPath.replace(extras,''));
    }
    res.json(uploadFiles)
})

app.post('/newaccommodation',async (req,res)=>{
    const {token}=req.cookies;
    const {title,address,presentPhotos,description,perks,
        checkin,checkout,maxguest,price}=req.body;
    jwt.verify(token,'1234567890',async (err,tokenData)=>{
        if(err) throw(err);
        const placeData=await Place.create({
        owner:tokenData.id,
        title,address,photos:presentPhotos,description,perks,
        checkin,checkout,maxguest,price
    });
    res.json(placeData);
    });
});

app.get('/places',async(req,res)=>{
    const {token}=req.cookies;
    jwt.verify(token,'1234567890',async (err,tokenData)=>{
        if(err) throw(err);
        const {id}=tokenData;
        res.json(await Place.find({owner:id}) )
    });
});

app.get('/places/:id',async(req,res)=>{
    const {id}=req.params;
    res.json(await Place.findById(id));
})

app.put('/newaccommodation',async(req,res)=>{
    const {token}=req.cookies;
    const {id,title,address,presentPhotos,description,
        perks,checkin,checkout,maxguest,price}=req.body;
        jwt.verify(token,'1234567890',async (err,tokenData)=>{
            if(err) throw(err);
            const PlaceDoc=await Place.findById(id)
            if(tokenData.id===PlaceDoc.owner.toString()){
                PlaceDoc.set({title,address,photos:presentPhotos,description,perks,
                checkin,checkout,maxguest,price})
                await PlaceDoc.save();
                res.json('ok')
            }
        });
})

app.get('/placesonhome',async(req,res)=>{
    res.json(await Place.find());
});

app.get('/loadplace/:id',async(req,res)=>{
    const {id}=req.params;
    res.json(await Place.findById(id))
})

app.get('/hostname/:id',async(req,res)=>{
    const {id}=req.params;
    const {name,email}=await User.findById(id);
    res.json({name,email});
})

app.post('/book',async(req,res)=>{
    const {token}=req.cookies;
    const {place,bookerName,bookerNumber,checkin,checkout,guest,price}=req.body;
    jwt.verify(token,'1234567890',async (err,tokenData)=>{
        if(err) throw(err);
        const BookingData=await Booking.create({
            booker:tokenData.id,
            bookerName,bookerNumber,
            checkin,checkout,guest,place,price
        });
        res.json(BookingData);
    });
});

app.get('/getbookings',async(req,res)=>{
    const {token}=req.cookies;
    jwt.verify(token,'1234567890',async (err,tokenData)=>{
        if(err) throw(err);
        const Findingid=tokenData.id;
        res.json(await Booking.find({booker:Findingid}).populate('place'))
    });
})

app.listen(3000);