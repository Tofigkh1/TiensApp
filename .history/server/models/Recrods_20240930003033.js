export class Record {
    constructor(
      userId,
      fullname,
      email,
      delivery_address,
      total_amount,
      contact,
      payment_method,
      items,
      date,
      createdAt = new Date()
    ) {
      this.userId = userId;
      this.fullname = fullname;
      this.email = email;
      this.delivery_address = delivery_address;
      this.total_amount = total_amount;
      this.contact = contact;
      this.payment_method = payment_method;
      this.items = items;
      this.date = date || new Date();
      this.createdAt = createdAt;
    }
  
    static validate(record) {
      if (!record.fullname || !record.email || !record.delivery_address || !record.items || !record.total_amount) {
        throw new Error("Invalid record: Missing required fields");
      }
    }
  
    toPlainObject() {
      return {
        userId: this.userId,
        fullname: this.fullname,
        email: this.email,
        delivery_address: this.delivery_address,
        total_amount: this.total_amount,
        contact: this.contact,
        payment_method: this.payment_method,
        items: this.items,
        date: this.date,
        createdAt: this.createdAt
      };
    }
  }
  