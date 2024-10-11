export class Record {
    constructor(
      customer_id,
      fullname,
      email,
      delivery_address,
      amount,
      contact,
      payment_method,
      products,
      date = new Date(),

    ) {
      this.customer_id = userId;
      this.fullname = fullname;
      this.email = email;
      this.delivery_address = delivery_address;
      this.amount = amount;
      this.contact = contact;
      this.payment_method = payment_method;
      this.products = products
      this.date = date;
    }
  
   
  
    toPlainObject() {
      return {
        userId: this.userId,
        fullname: this.fullname,
        email: this.email,
        delivery_address: this.delivery_address,
        amount: this.amount,
        contact: this.contact,
        payment_method: this.payment_method,
        products: this.products,
        date: this.date,
      };
    }
  }
  