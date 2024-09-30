export class Record {
    constructor(
      userId,              // Müşteri kimliği (JWT token üzerinden gelir)
      fullname,            // Müşteri adı
      email,               // Müşteri e-posta adresi
      delivery_address,    // Teslimat adresi
      total_amount,        // Toplam ödeme tutarı
      contact,             // Müşteri iletişim bilgileri
      payment_method,      // Ödeme yöntemi (kredi kartı, nakit vb.)
      items,               // Ürünler listesi (adet ve fiyatlar dahil)
      date = new Date(),   // Sipariş tarihi
      createdAt = new Date() // Kayıt oluşturma tarihi (otomatik atanır)
    ) {
      this.userId = userId;
      this.fullname = fullname;
      this.email = email;
      this.delivery_address = delivery_address;
      this.total_amount = total_amount;
      this.contact = contact;
      this.payment_method = payment_method;
      this.items = items;
      this.date = date;
      this.createdAt = createdAt;
    }
  
    // Verileri sade bir nesneye dönüştürme işlevi
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
        createdAt: this.createdAt,
      };
    }
  
    // Kayıt verilerini doğrulama işlevi
    static validate(recordData) {
      const requiredFields = [
        'userId', 
        'fullname', 
        'email', 
        'delivery_address', 
        'total_amount', 
        'contact', 
        'payment_method', 
        'items'
      ];
  
      const missingFields = requiredFields.filter(field => !recordData[field]);
  
      if (missingFields.length) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }
  
      if (!Array.isArray(recordData.items) || !recordData.items.length) {
        throw new Error("Items must be a non-empty array");
      }
    }
  }
  