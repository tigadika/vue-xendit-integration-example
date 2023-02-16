require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/invoice/:invoiceId', async (req, res) => {
  try {
    const { invoiceId } = req.params;
    if (!invoiceId) throw { name: 'Invoice Id Not Found' };
    const { data } = await axios({
      method: 'get',
      url: `https://api.xendit.co/v2/invoices/${invoiceId}`,
      auth: {
        username: process.env.API_KEY
      }
    });
    res.status(200).json({ data });
  } catch (error) {
    const status = error.response ? error.response.status : 500;
    let message = 'Internal Server Error';
    if (error.name === 'Invoice Id Not Found') {
      message = error.name;
    } else if (error.response && error.response.data.error_code) {
      message = error.response.data.error_code;
    }
    res.status(status).json({ msg: message });
  }
});

app.post('/invoice', async (req, res) => {
  try {
    const { total, email } = req.body;
    if (!total) throw { name: 'Amount Required' };
    if (!email) throw { name: 'Email Required' };
    const { data } = await axios({
      method: 'post',
      url: 'https://api.xendit.co/v2/invoices',
      data: {
        external_id: `invoice-${Date.now()}`,
        amount: total,
        payer_email: email,
        description: 'Invoice Demo #123'
      },
      auth: {
        username: process.env.API_KEY
      }
    });
    res.status(201).json({ data });
  } catch (error) {
    const status = error.name ? 400 : 500;
    const message = error.name || 'Internal Server Error';
    res.status(status).json({ msg: message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
