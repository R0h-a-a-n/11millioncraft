const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage });

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/11millioncrafts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const skuSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productNumber: { type: Number, required: true },
  vendorName: { type: String, required: true },
  vendorNumber: { type: Number, required: true },
  cityCode: { type: Number, required: true },
  skuCode: { type: String, required:true, unique:true },
  photo: { type: String, required: true },
  vendorprice:{type:Number},
});

const SKU = mongoose.model('SKU', skuSchema);

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  productId: { type: String, required: true, unique: true },
  image: { type: String },
});

const Product = mongoose.model('Product', productSchema);

const generateSKUCode = ({ productName, productNumber, vendorName, vendorNumber, cityCode }) => {
  const getShortForm = name => name.split(' ').map(word => word[0].toUpperCase()).join('').slice(0, 2);
  const productShort = getShortForm(productName);
  const vendorShort = getShortForm(vendorName);
  return `MC-${productShort}${String(productNumber).padStart(2, '0')}-${vendorShort}${String(vendorNumber).padStart(2, '0')}-${String(cityCode).padStart(2, '0')}`;
};

app.post('/register', async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) return res.status(400).json({ message: 'All fields are required!' });
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(error.code === 11000 ? 400 : 500).json({ message: error.code === 11000 ? 'Email already exists!' : 'Server error!' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) return res.status(400).json({ message: 'All fields are required!' });
  try {
    const user = await User.findOne({ email, role });
    if (!user) return res.status(404).json({ message: 'Invalid email or role!' });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials!' });
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful!', token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Server error!' });
  }
});

app.post('/api/products', upload.single('image'), async (req, res) => {
  const { name, productId } = req.body;
  if (!name || !productId) return res.status(400).json({ message: 'Product name and ID are required!' });
  try {
    const newProduct = new Product({ name, productId, image: req.file ? req.file.path : null });
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error!' });
  }
});

app.get('/inventory', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

app.post('/api/skus', upload.single('photo'), async (req, res) => {
  try {
    const { productName, productNumber, vendorName, vendorNumber, cityCode,vendorprice } = req.body;
    if (!req.file) return res.status(400).json({ message: 'Photo is required!' });
    const skuCode = generateSKUCode({ productName, productNumber, vendorName, vendorNumber, cityCode });
    const newSKU = new SKU({ productName, productNumber, vendorName, vendorNumber, cityCode, skuCode, photo: req.file.path,vendorprice });
    await newSKU.save();
    res.status(201).json(newSKU);
  } catch (err) {
    res.status(500).json({ message: 'Error creating SKU', error: err.message });
  }
});

app.get('/api/skus/:skuCode', async (req, res) => {
  try {
    const sku = await SKU.findOne({ skuCode: req.params.skuCode });
    if (!sku) return res.status(404).json({ message: 'SKU not found' });
    res.status(200).json(sku);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving SKU', error: err.message });
  }
});

app.get('/getsku', async (req, res) => {
  try {
    const sku = await SKU.find();
    res.json(sku);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.get('/sku/:skuCode', async (req, res) => {
  try {
    const skudetail = await SKU.findOne({ skuCode: req.params.skuCode });
    res.json(skudetail);
  } catch (err) {
    res.status(404).json(err);
  }
});


app.get('/vendor/:vendorName/products', async (req,res) =>{
 try{
      const vendordetail = await SKU.find({vendorName:req.params.vendorName});
       res.json(vendordetail);

 }catch(err)
 {
  res.status(400).json('error came so sad');
 }
});

app.get('/edit/:skuCode', async (req,res) =>{

  try{
    const skuCode=await SKU.findOne({skuCode:req.params.skuCode});
    res.json(skuCode);
  }catch(err){
    res.status(400).json(err);
  }

});

app.put('/edit/:skuCode', async (req,res)=>{

  const {skuCode} = req.params;
  const updatedData = req.body;
try{
      const { productName, productNumber, vendorName, vendorNumber, cityCode,vendorprice } = req.body;
      updatedData.skuCode = generateSKUCode({ productName, productNumber, vendorName, vendorNumber, cityCode });
      const update = await SKU.findOneAndUpdate({skuCode},updatedData,{new:true});
      if(!update)
      {
        res.status(400).json("enter valid details");
      }
      res.json(update);
     


}catch(err)
{
  res.status(400).json('error');
}
 

});





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
