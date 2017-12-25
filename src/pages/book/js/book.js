class Book {

  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  getInfo() {
    return `这本《${this.name}》价值${this.price}元！`;
  }

}

export default Book;