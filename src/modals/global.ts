interface Company {
    companyName: String;
    gst: String;
  };
  interface Product{
    companyName: String,
    productName: String,
    cost: Number
  };
  interface Order{
    companyName: String,
    productName: String,
    rate: Number,
    quantity: Number,
    totalPrice: Number,
    orderNo: String
  }