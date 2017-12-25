import './styles/book.scss';
import '../../common/styles/common.scss'
import Book from './js/book'

const book = new Book('你不知道的JS', '20');
const info = book.getInfo();

console.log('info ->', info);