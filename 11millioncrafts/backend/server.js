const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
require('dotenv').config();
const User = require('./models/User');
const SuperSchema = require('./models/SuperAdmin');
const DeletionRequest = require('./models/DeletionRequest');
const nodemailer = require('nodemailer');

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
  skuCode: { type: String, required: true, unique: true },
  photo: { type: String, required: true },
  vendorprice: { type: String },
});

const SKU = mongoose.model('SKU', skuSchema);
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  productId: { type: String, required: true, unique: true },
  image: { type: String },
});


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const Product = mongoose.model('Product', productSchema);
const generateSKUCode = ({ productName, productNumber, vendorName, vendorNumber, cityCode }) => {
  const getShortForm = name => {
    const words = name.split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const productShort = getShortForm(productName);
  const vendorShort = getShortForm(vendorName);

  return `MC-${productShort}${String(productNumber).padStart(2, '0')}-${vendorShort}${String(vendorNumber).padStart(2, '0')}-${String(cityCode).padStart(2, '0')}`;
};
const checksuperadmin = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; 
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded.issuperadmin) {
      next();
    } else {
      return res.status(403).json({ message: 'Forbidden: Permission Denied' });
    }
  } catch (err) {
    console.error('JWT Error:', err);
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(400).json({ message: 'Access Denied' });
  }
};


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
    const products = await SKU.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

app.post('/api/skus', upload.single('photo'), async (req, res) => {
  try {
    const { productName, productNumber, vendorName, vendorNumber, cityCode, vendorprice } = req.body;
    if (!req.file) return res.status(400).json({ message: 'Photo is required!' });

    const skuCode = generateSKUCode({ productName, productNumber, vendorName, vendorNumber, cityCode });
    const newSKU = new SKU({
      productName,
      productNumber,
      vendorName,
      vendorNumber,
      cityCode,
      skuCode,
      photo: req.file.path,
      vendorprice,
    });

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

app.get('/vendor/:vendorName/products', async (req, res) => {
  try {
    const vendordetail = await SKU.find({ vendorName: req.params.vendorName });
    res.json(vendordetail);
  } catch (err) {
    res.status(400).json('error came so sad');
  }
});

app.get('/edit/:skuCode', async (req, res) => {
  try {
    const skuCode = await SKU.findOne({ skuCode: req.params.skuCode });
    res.json(skuCode);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.put('/edit/:skuCode', async (req, res) => {
  const { skuCode } = req.params;
  const updatedData = req.body;

  try {
    const { productName, productNumber, vendorName, vendorNumber, cityCode, vendorprice } = req.body;
    updatedData.skuCode = generateSKUCode({ productName, productNumber, vendorName, vendorNumber, cityCode, vendorprice });

    const update = await SKU.findOneAndUpdate({ skuCode }, updatedData, { new: true });
    if (!update) {
      res.status(400).json('Enter valid details');
    }
    res.json(update);
  } catch (err) {
    res.status(400).json('Error');
  }
});


app.post('/adduser',checksuperadmin, async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ message: 'Email, password, and username are required!' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, username });
    await newUser.save();
    res.status(200).json({ message: 'User created successfully!', user: { email, username } });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
});

app.post('/checkuser', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required!' });
    }
    const superAdmin = await SuperSchema.findOne({ email });
    if (superAdmin) {
      const isValidSuperAdminPassword = await bcrypt.compare(password, superAdmin.password);
      if (!isValidSuperAdminPassword) {
        return res.status(400).json({ message: 'Invalid credentials for superadmin' });
      }
      const token = jwt.sign(
        { id: superAdmin._id, email: superAdmin.email, issuperadmin: true },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
      );

      return res.status(200).json({ message: 'Superadmin login successful', token });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isValidUserPassword = await bcrypt.compare(password, user.password);
    if (!isValidUserPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email, issuperadmin: false },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );
    return res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});


app.get('/superadmin', checksuperadmin,async (req, res) => {
  try {
    const response = await User.find();
    console.log('Fetched users successfully');
    res.status(200).json(response);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(400).json({ message: 'Error fetching users', error: err.message });
  }
});
app.get('/superdetails', checksuperadmin,async (req, res) => {
  try {
    const response = await SuperSchema.find();
    console.log('Fetched users successfully');
    res.status(200).json(response);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(400).json({ message: 'Error fetching users', error: err.message });
  }
});

app.delete('/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const message = await User.findByIdAndDelete({ _id });
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting user', error: err.message });
  }
});
app.delete('/admin/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const message = await SuperSchema.findByIdAndDelete({ _id });
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting user', error: err.message });
  }
});

app.post('/addsuper',checksuperadmin, async (req,res)=>{

  try {
    const { email, password,username} = req.body;
    if (!email || !password|| !username ) {
      return res.status(400).json({ message: 'Email and  password are required!' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new SuperSchema({ email, password: hashedPassword,username });
    await newUser.save();
    res.status(200).json({ message: 'User created successfully!', user: { email } });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }

});


app.post('/skudelete', async (req, res) => {
  try {
    const { _id, reason } = req.body;
    const token = req.header('Authorization')?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (decoded.issuperadmin) {
      const del = await SKU.findByIdAndDelete(_id);
      return res.status(200).json('deleted');
    }

 
    const deletionRequest = new DeletionRequest({
      skuId: _id,
      requestedBy: decoded.id,
      reason: reason
    });
    await deletionRequest.save();

    
    const superAdmins = await SuperSchema.find();
    const sku = await SKU.findById(_id);

    for (const superAdmin of superAdmins) {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: superAdmin.email,
        subject: `Product Deletion Request - ${sku.skuCode}`,
        html: `
          <h2>Product Deletion Request</h2>
          <p>A request has been made to delete the following product:</p>
          <ul>
            <li>SKU Code: ${sku.skuCode}</li>
            <li>Product Name: ${sku.productName}</li>
            <li>Reason: ${reason}</li>
          </ul>
          <p>Please review this request in the admin panel.</p>
        `
      });
    }

    res.status(200).json({ message: 'Deletion request submitted for approval' });
  } catch (err) {
    res.status(400).json(err);
  }
});



app.get('/deletion-requests', checksuperadmin, async (req, res) => {
  try {
    const requests = await DeletionRequest.find({ status: 'pending' })
      .populate('skuId')
      .populate('requestedBy');
    res.status(200).json(requests);
  } catch (err) {
    res.status(400).json(err);
  }
});


app.post('/deletion-requests/:requestId', checksuperadmin, async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;
    
    const request = await DeletionRequest.findById(requestId)
      .populate('skuId')
      .populate('requestedBy');
    
    request.status = status;
    request.respondedAt = new Date();
    await request.save();

    if (status === 'approved') {
      await SKU.findByIdAndDelete(request.skuId._id);
    }

    
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: request.requestedBy.email,
      subject: `Product Deletion Request ${status.toUpperCase()}`,
      html: `
        <h2>Product Deletion Request ${status.toUpperCase()}</h2>
        <p>Your request to delete product ${request.skuId.skuCode} has been ${status}.</p>
        ${status === 'approved' ? '<p>The product has been deleted from the system.</p>' : ''}
      `
    });

    res.status(200).json({ message: `Request ${status}` });
  } catch (err) {
    res.status(400).json(err);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
