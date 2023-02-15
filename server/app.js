require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const axios = require('axios');
const cors = require('cors');
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/invoice/:invoiceId', async (req, res) => { //? check invoice
  try {
    const { invoiceId } = req.params
    if (!invoiceId) throw { name: "Invoice Id Not Found" }
    const { data } = await axios({
      method: "get",
      url: `https://api.xendit.co/v2/invoices/${invoiceId}`,
      auth: {
        username: process.env.API_KEY
      }
    })
    res.status(200).json({ data })
  } catch (error) {
    if (error.name === "Invoice Id Not Found") {
      res.status(404).json({
        msg: error.name
      })
    } else if (error.response.status === 404) {
      res.status(404).json({
        msg: error.response.data.error_code
      })
    } else {
      res.status(500).json({
        msg: "Internal Server Error"
      })
    }
  }
})
app.post('/invoice', async (req, res) => { //? create invoice
  try {
    const { total, email } = req.body
    if (!total) throw { name: "Amount Required" }
    if (!email) throw { name: "Email Required" }
    const { data } = await axios({
      method: "post",
      url: "https://api.xendit.co/v2/invoices",
      data: {
        "external_id": `invoice-${Date.now()}`,
        "amount": total,
        "payer_email": email,
        "description": "Invoice Demo #123"
      },
      auth: {
        username: process.env.API_KEY
      }
    })
    res.status(201).json({ data })
  } catch (error) {
    if (error.name === "Amount Required" || error.name === "Email Required") {
      res.status(400).json({
        msg: error.name
      })
    } else {
      res.status(500).json({
        msg: "Internal Server Error"
      })
    }
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})